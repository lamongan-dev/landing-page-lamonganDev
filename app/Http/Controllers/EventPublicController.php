<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class EventPublicController extends Controller
{
    public function index(): JsonResponse
    {
        $events = Event::query()
            ->orderBy('event_date', 'asc')
            ->get()
            ->map(function (Event $event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'type' => $event->type,
                    'pricing_type' => $event->pricing_type,
                    'event_date' => optional($event->event_date)->toISOString(),
                    'location' => $event->location,
                    'description' => Str::limit(strip_tags($event->description ?? ''), 180),
                    'cover_image_url' => $event->cover_image_url,
                    'slug' => $event->slug,
                ];
            })
            ->values();

        return response()->json([
            'data' => $events,
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $event = Event::query()
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'data' => [
                'id' => $event->id,
                'title' => $event->title,
                'type' => $event->type,
                'pricing_type' => $event->pricing_type,
                'event_date' => optional($event->event_date)->toISOString(),
                'location' => $event->location,
                'description' => $event->description,
                'cover_image_url' => $event->cover_image_url,
                'slug' => $event->slug,
            ],
        ]);
    }
}
