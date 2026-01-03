<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Habit;
use App\Models\Completion;
use Illuminate\Http\Request;
use Carbon\Carbon;

class StatsController extends Controller
{
    public function dashboard(Request $request)
    {
        $user = $request->user();
        $today = Carbon::today();
        
        $totalHabits = $user->habits()->where('is_active', true)->count();
        
        $completedToday = Completion::whereHas('habit', function ($query) use ($user) {
            $query->where('user_id', $user->id)
                  ->where('is_active', true);
        })->whereDate('completed_at', $today)->count();
        
        $currentStreak = $this->calculateCurrentStreak($user);
        $longestStreak = $this->calculateLongestStreak($user);
        
        $weeklyProgress = $this->getWeeklyProgress($user);
        $monthlyProgress = $this->getMonthlyProgress($user);
        
        return response()->json([
            'total_habits' => $totalHabits,
            'completed_today' => $completedToday,
            'current_streak' => $currentStreak,
            'longest_streak' => $longestStreak,
            'weekly_progress' => $weeklyProgress,
            'monthly_progress' => $monthlyProgress,
        ]);
    }

    private function calculateCurrentStreak($user)
    {
        $streak = 0;
        $date = Carbon::today();
        
        while (true) {
            $completions = Completion::whereHas('habit', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })->whereDate('completed_at', $date)->count();
            
            if ($completions > 0) {
                $streak++;
                $date->subDay();
            } else {
                break;
            }
        }
        
        return $streak;
    }

    private function calculateLongestStreak($user)
    {
        // Simplified version - gets completions from last 365 days
        $completions = Completion::whereHas('habit', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
        ->where('completed_at', '>=', Carbon::now()->subYear())
        ->orderBy('completed_at')
        ->pluck('completed_at')
        ->unique()
        ->values();
        
        $maxStreak = 0;
        $currentStreak = 0;
        $previousDate = null;
        
        foreach ($completions as $date) {
            $currentDate = Carbon::parse($date);
            
            if ($previousDate && $currentDate->diffInDays($previousDate) == 1) {
                $currentStreak++;
            } else {
                $currentStreak = 1;
            }
            
            $maxStreak = max($maxStreak, $currentStreak);
            $previousDate = $currentDate;
        }
        
        return $maxStreak;
    }

    private function getWeeklyProgress($user)
    {
        $progress = [];
        
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $count = Completion::whereHas('habit', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })->whereDate('completed_at', $date)->count();
            
            $progress[] = [
                'date' => $date->format('Y-m-d'),
                'count' => $count,
            ];
        }
        
        return $progress;
    }

    private function getMonthlyProgress($user)
    {
        $progress = [];
        
        for ($i = 29; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $count = Completion::whereHas('habit', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })->whereDate('completed_at', $date)->count();
            
            $progress[] = [
                'date' => $date->format('Y-m-d'),
                'count' => $count,
            ];
        }
        
        return $progress;
    }
}
