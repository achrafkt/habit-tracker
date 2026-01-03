<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Habit;
use App\Models\Completion;
use Illuminate\Http\Request;
use Carbon\Carbon;

class HabitController extends Controller
{
    public function index(Request $request)
    {
        $habits = $request->user()
            ->habits()
            ->with(['completions' => function ($query) {
                $query->where('completed_at', '>=', Carbon::now()->subDays(30));
            }])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($habits);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'frequency' => 'required|in:daily,weekly,monthly',
            'color' => 'nullable|string|max:7',
            'target_count' => 'nullable|integer|min:1',
            'category' => 'nullable|string|max:50',
            'icon' => 'nullable|array',
            'icon.name' => 'nullable|string',
            'icon.family' => 'nullable|string',
            'difficulty' => 'nullable|string|in:easy,medium,hard',
            'target_days' => 'nullable|integer|min:1',
            'notification_enabled' => 'nullable|boolean',
            'notification_time' => 'nullable|date_format:H:i',
        ]);

        $habit = $request->user()->habits()->create($validated);

        return response()->json($habit, 201);
    }

    public function show(Request $request, Habit $habit)
    {
        if ($habit->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $habit->load(['completions' => function ($query) {
            $query->orderBy('completed_at', 'desc');
        }]);

        return response()->json($habit);
    }

    public function update(Request $request, Habit $habit)
    {
        if ($habit->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'frequency' => 'sometimes|in:daily,weekly,monthly',
            'color' => 'nullable|string|max:7',
            'target_count' => 'nullable|integer|min:1',
            'is_active' => 'sometimes|boolean',
            'category' => 'nullable|string|max:50',
            'icon' => 'nullable|array',
            'icon.name' => 'nullable|string',
            'icon.family' => 'nullable|string',
            'difficulty' => 'nullable|string|in:easy,medium,hard',
            'target_days' => 'nullable|integer|min:1',
            'notification_enabled' => 'nullable|boolean',
            'notification_time' => 'nullable|date_format:H:i',
        ]);

        $habit->update($validated);

        return response()->json($habit);
    }

    public function destroy(Request $request, Habit $habit)
    {
        if ($habit->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $habit->delete();

        return response()->json(['message' => 'Habit deleted successfully']);
    }

    public function toggleCompletion(Request $request, Habit $habit)
    {
        if ($habit->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'date' => 'nullable|date',
            'count' => 'nullable|integer|min:1',
            'notes' => 'nullable|string',
        ]);

        $date = $validated['date'] ?? Carbon::today()->format('Y-m-d');

        $completion = Completion::where('habit_id', $habit->id)
            ->where('completed_at', $date)
            ->first();

        if ($completion) {
            $completionData = $completion->toArray();
            $completion->delete();
            return response()->json([
                'data' => [
                    'message' => 'Completion removed',
                    'completed' => false,
                    'completion' => $completionData,
                    'date' => $date
                ]
            ]);
        } else {
            $completion = Completion::create([
                'habit_id' => $habit->id,
                'completed_at' => $date,
                'count' => $validated['count'] ?? 1,
                'notes' => $validated['notes'] ?? null,
            ]);
            return response()->json([
                'data' => [
                    'message' => 'Completion added',
                    'completed' => true,
                    'completion' => $completion,
                    'date' => $date
                ]
            ]);
        }
    }
}
