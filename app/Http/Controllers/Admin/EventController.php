<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();
        $type = $request->string('type')->toString();
        $pricingType = $request->string('pricing_type')->toString();
        $sort = $request->string('sort')->toString() ?: 'desc';
        $sort = in_array($sort, ['asc', 'desc'], true) ? $sort : 'desc';

        $events = Event::query()
            ->when($search, fn ($query) => $query->where('title', 'like', "%{$search}%"))
            ->when($type, fn ($query) => $query->where('type', $type))
            ->when($pricingType, fn ($query) => $query->where('pricing_type', $pricingType))
            ->orderBy('event_date', $sort)
            ->paginate(10)
            ->withQueryString()
            ->through(fn (Event $event) => [
                'id' => $event->id,
                'title' => $event->title,
                'type' => $event->type,
                'pricing_type' => $event->pricing_type,
                'event_date' => optional($event->event_date)->format('Y-m-d H:i'),
                'cover_image_url' => $event->cover_image_url,
                'location' => $event->location,
            ]);

        return Inertia::render('Admin/Events/Index', [
            'events' => $events,
            'filters' => [
                'search' => $search,
                'type' => $type,
                'pricing_type' => $pricingType,
                'sort' => $sort,
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Events/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'type' => ['required', 'in:offline,online'],
            'title' => ['required', 'string', 'max:255'],
            'pricing_type' => ['required', 'in:free,paid'],
            'event_date' => ['required', 'date'],
            'cover_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'location' => ['nullable', 'string', 'max:255', 'required_if:type,offline'],
            'description' => ['nullable', 'string'],
        ]);

        $description = $request->input('description');
        if ($description !== null) {
            $description = preg_replace('#<script(.*?)>(.*?)</script>#is', '', $description);
        }

        $coverPath = null;

        DB::beginTransaction();
        try {
            if ($request->hasFile('cover_image')) {
                $coverPath = $request->file('cover_image')->store('events', 'public');
            }

            Event::create([
                'type' => $validated['type'],
                'title' => $validated['title'],
                'pricing_type' => $validated['pricing_type'],
                'event_date' => $validated['event_date'],
                'cover_image_path' => $coverPath,
                'location' => $validated['location'] ?? null,
                'description' => $description,
            ]);

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            if ($coverPath) {
                Storage::disk('public')->delete($coverPath);
            }

            return back()
                ->withErrors(['general' => 'Gagal menyimpan event. Silakan coba lagi.'])
                ->withInput();
        }

        return redirect()
            ->route('admin.events.index')
            ->with('success', 'Event berhasil dibuat.');
    }

    public function show(Event $event): Response
    {
        return Inertia::render('Admin/Events/Show', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'type' => $event->type,
                'pricing_type' => $event->pricing_type,
                'event_date' => optional($event->event_date)->toDateTimeString(),
                'cover_image_url' => $event->cover_image_url,
                'location' => $event->location,
                'description' => $event->description,
                'slug' => $event->slug,
            ],
        ]);
    }

    public function edit(Event $event): Response
    {
        return Inertia::render('Admin/Events/Edit', [
            'event' => [
                'id' => $event->id,
                'type' => $event->type,
                'title' => $event->title,
                'pricing_type' => $event->pricing_type,
                'event_date' => optional($event->event_date)->format('Y-m-d\TH:i'),
                'cover_image_url' => $event->cover_image_url,
                'location' => $event->location,
                'description' => $event->description,
            ],
        ]);
    }

    public function update(Request $request, Event $event): RedirectResponse
    {
        $validated = $request->validate([
            'type' => ['sometimes', 'in:offline,online'],
            'title' => ['sometimes', 'string', 'max:255'],
            'pricing_type' => ['sometimes', 'in:free,paid'],
            'event_date' => ['sometimes', 'date'],
            'cover_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'location' => ['sometimes', 'nullable', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
        ]);

        if (array_key_exists('description', $validated)) {
            $validated['description'] = preg_replace(
                '#<script(.*?)>(.*?)</script>#is',
                '',
                (string) $validated['description']
            );
        }

        $newCoverPath = null;
        $oldCoverPath = $event->cover_image_path;

        DB::beginTransaction();
        try {
            if ($request->hasFile('cover_image')) {
                $newCoverPath = $request->file('cover_image')->store('events', 'public');
                $validated['cover_image_path'] = $newCoverPath;
            }

            $event->update($validated);

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            if ($newCoverPath) {
                Storage::disk('public')->delete($newCoverPath);
            }

            return back()
                ->withErrors(['general' => 'Gagal memperbarui event. Silakan coba lagi.'])
                ->withInput();
        }

        if ($newCoverPath && $oldCoverPath) {
            Storage::disk('public')->delete($oldCoverPath);
        }

        return redirect()
            ->route('admin.events.index')
            ->with('success', 'Event berhasil diperbarui.');
    }

    public function destroy(Event $event): RedirectResponse
    {
        $coverPath = $event->cover_image_path;
        $event->delete();

        if ($coverPath) {
            Storage::disk('public')->delete($coverPath);
        }

        return redirect()
            ->route('admin.events.index')
            ->with('success', 'Event berhasil dihapus.');
    }
}
