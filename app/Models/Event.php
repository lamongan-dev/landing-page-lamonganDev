<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Event extends Model
{
    protected $fillable = [
        'type',
        'title',
        'pricing_type',
        'event_date',
        'cover_image_path',
        'location',
        'description',
        'slug',
    ];

    protected $casts = [
        'event_date' => 'datetime',
    ];

    protected $appends = [
        'cover_image_url',
    ];

    public function getCoverImageUrlAttribute(): ?string
    {
        if (! $this->cover_image_path) {
            return null;
        }

        $relativeUrl = Storage::disk('public')->url($this->cover_image_path);

        if (str_starts_with($relativeUrl, 'http://') || str_starts_with($relativeUrl, 'https://')) {
            return $relativeUrl;
        }

        if (app()->runningInConsole()) {
            return rtrim(config('app.url'), '/').$relativeUrl;
        }

        return rtrim(request()->getSchemeAndHttpHost(), '/').$relativeUrl;
    }

    protected static function booted(): void
    {
        static::creating(function (self $event): void {
            $event->slug = static::generateUniqueSlug($event->title);
        });

        static::updating(function (self $event): void {
            if ($event->isDirty('title')) {
                $event->slug = static::generateUniqueSlug($event->title, $event->id);
            }
        });
    }

    protected static function generateUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($title);
        $slug = $baseSlug;
        $counter = 2;

        while (static::query()
            ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
            ->where('slug', $slug)
            ->exists()) {
            $slug = $baseSlug.'-'.$counter;
            $counter++;
        }

        return $slug;
    }
}
