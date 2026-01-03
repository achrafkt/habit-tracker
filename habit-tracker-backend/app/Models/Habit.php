<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Habit extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'frequency',
        'color',
        'target_count',
        'is_active',
        'category',
        'icon',
        'difficulty',
        'target_days',
        'notification_enabled',
        'notification_time',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'target_count' => 'integer',
        'icon' => 'array',
        'target_days' => 'integer',
        'notification_enabled' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function completions()
    {
        return $this->hasMany(Completion::class);
    }
}
