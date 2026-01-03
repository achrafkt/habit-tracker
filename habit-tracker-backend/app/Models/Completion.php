<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Completion extends Model
{
    use HasFactory;

    protected $fillable = [
        'habit_id',
        'completed_at',
        'count',
        'notes',
    ];

    protected $casts = [
        'completed_at' => 'date',
        'count' => 'integer',
    ];

    public function habit()
    {
        return $this->belongsTo(Habit::class);
    }
}
