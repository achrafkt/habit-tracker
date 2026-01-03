# 🎯 Habit Tracker Backend - Quick Start

## ✅ Backend is Ready!

Your Laravel backend is now set up and running at: **http://localhost:8000**

---

## 📋 What's Been Configured

### ✅ Database & Models
- **Users** - Authentication with Sanctum tokens
- **Habits** - User habits with name, description, frequency, color, target count
- **Completions** - Track daily habit completions with dates and notes

### ✅ API Endpoints
All endpoints are documented in `FRONTEND_INTEGRATION.md`

**Authentication:**
- POST `/api/register` - Register new user
- POST `/api/login` - Login user
- POST `/api/logout` - Logout user
- GET `/api/user` - Get current user

**Habits:**
- GET `/api/habits` - List all habits
- POST `/api/habits` - Create new habit
- GET `/api/habits/{id}` - Get single habit
- PUT `/api/habits/{id}` - Update habit
- DELETE `/api/habits/{id}` - Delete habit
- POST `/api/habits/{id}/toggle` - Toggle completion for a date

**Statistics:**
- GET `/api/stats/dashboard` - Get dashboard statistics

### ✅ Security & CORS
- Sanctum authentication with Bearer tokens
- CORS configured for localhost:3000 and localhost:5173
- Stateful domains configured for frontend integration

---

## 🚀 Frontend Integration

### Step 1: Install Axios in your frontend
```bash
npm install axios
```

### Step 2: Create API client

```javascript
// src/api/client.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Step 3: Use in your components

```javascript
import api from './api/client';

// Register
const register = async (name, email, password, password_confirmation) => {
  const { data } = await api.post('/register', {
    name, email, password, password_confirmation
  });
  localStorage.setItem('auth_token', data.token);
  return data;
};

// Login
const login = async (email, password) => {
  const { data } = await api.post('/login', { email, password });
  localStorage.setItem('auth_token', data.token);
  return data;
};

// Get habits
const getHabits = async () => {
  const { data } = await api.get('/habits');
  return data;
};

// Create habit
const createHabit = async (habitData) => {
  const { data } = await api.post('/habits', habitData);
  return data;
};

// Toggle completion
const toggleCompletion = async (habitId, date) => {
  const { data } = await api.post(`/habits/${habitId}/toggle`, { date });
  return data;
};

// Get dashboard stats
const getDashboardStats = async () => {
  const { data } = await api.get('/stats/dashboard');
  return data;
};
```

---

## 🧪 Testing the API

### Option 1: Using Postman
1. Import `Habit_Tracker_API.postman_collection.json`
2. Set the `token` variable after login/register
3. Test all endpoints

### Option 2: Using cURL

**Register:**
```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","password_confirmation":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Get Habits:**
```bash
curl -X GET http://localhost:8000/api/habits \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Accept: application/json"
```

---

## 📁 Important Files

- `FRONTEND_INTEGRATION.md` - Complete integration guide
- `Habit_Tracker_API.postman_collection.json` - Postman collection
- `routes/api.php` - API routes
- `app/Http/Controllers/Api/` - API controllers
- `app/Models/` - Database models
- `config/cors.php` - CORS configuration
- `config/sanctum.php` - Sanctum authentication config

---

## 🔧 Common Commands

```bash
# Start server
php artisan serve

# Reset database
php artisan migrate:fresh

# Create database backup
php artisan migrate:fresh --seed

# View routes
php artisan route:list

# Clear cache
php artisan cache:clear
php artisan config:clear
```

---

## 🎨 Example Habit Data Structure

**Habit Object:**
```json
{
  "id": 1,
  "user_id": 1,
  "name": "Morning Exercise",
  "description": "30 minutes of cardio",
  "frequency": "daily",
  "color": "#3B82F6",
  "target_count": 1,
  "is_active": true,
  "created_at": "2025-12-03T10:00:00.000000Z",
  "updated_at": "2025-12-03T10:00:00.000000Z",
  "completions": [
    {
      "id": 1,
      "habit_id": 1,
      "completed_at": "2025-12-03",
      "count": 1,
      "notes": "Felt great!",
      "created_at": "2025-12-03T10:30:00.000000Z",
      "updated_at": "2025-12-03T10:30:00.000000Z"
    }
  ]
}
```

**Dashboard Stats:**
```json
{
  "total_habits": 5,
  "completed_today": 3,
  "current_streak": 7,
  "longest_streak": 21,
  "weekly_progress": [
    { "date": "2025-11-27", "count": 4 },
    { "date": "2025-11-28", "count": 5 },
    // ... 7 days
  ],
  "monthly_progress": [
    // ... 30 days
  ]
}
```

---

## 🚨 Troubleshooting

**CORS errors?**
- Check `config/cors.php` has your frontend URL
- Ensure `withCredentials: true` in axios config

**401 Unauthorized?**
- Check token is saved in localStorage
- Verify Authorization header format: `Bearer {token}`

**Database errors?**
- Run `php artisan migrate:fresh`
- Check `database/database.sqlite` exists

---

## 📚 Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)
- [API Testing with Postman](https://www.postman.com/)

---

**Backend is ready! Start your frontend and connect to the API.** 🚀
