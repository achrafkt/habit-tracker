# Habit Tracker Backend - Frontend Integration Guide

## Backend Setup

### 1. Install Dependencies
```bash
composer install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and set up your database:
```bash
cp .env.example .env
```

Update these values in `.env`:
```env
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

SESSION_DRIVER=cookie
SANCTUM_STATEFUL_DOMAINS=localhost:3000,localhost:5173,127.0.0.1:3000,127.0.0.1:5173
```

### 3. Generate Application Key
```bash
php artisan key:generate
```

### 4. Run Migrations
```bash
php artisan migrate
```

### 5. Start the Server
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

---

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login
- `POST /api/logout` - Logout (requires auth)
- `GET /api/user` - Get current user (requires auth)

### Habits
- `GET /api/habits` - Get all habits (requires auth)
- `POST /api/habits` - Create habit (requires auth)
- `GET /api/habits/{id}` - Get single habit (requires auth)
- `PUT /api/habits/{id}` - Update habit (requires auth)
- `DELETE /api/habits/{id}` - Delete habit (requires auth)
- `POST /api/habits/{id}/toggle` - Toggle completion (requires auth)

### Statistics
- `GET /api/stats/dashboard` - Get dashboard stats (requires auth)

---

## Frontend Integration

### Using Axios (React/Vue/Next.js)

#### 1. Install Axios
```bash
npm install axios
```

#### 2. Create API Client

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

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

#### 3. Authentication Examples

```javascript
// Register
const register = async (name, email, password, password_confirmation) => {
  const response = await api.post('/register', {
    name,
    email,
    password,
    password_confirmation
  });
  localStorage.setItem('auth_token', response.data.token);
  return response.data;
};

// Login
const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  localStorage.setItem('auth_token', response.data.token);
  return response.data;
};

// Logout
const logout = async () => {
  await api.post('/logout');
  localStorage.removeItem('auth_token');
};

// Get current user
const getUser = async () => {
  const response = await api.get('/user');
  return response.data;
};
```

#### 4. Habits API Examples

```javascript
// Get all habits
const getHabits = async () => {
  const response = await api.get('/habits');
  return response.data;
};

// Create habit
const createHabit = async (habitData) => {
  const response = await api.post('/habits', habitData);
  return response.data;
};

// Update habit
const updateHabit = async (id, habitData) => {
  const response = await api.put(`/habits/${id}`, habitData);
  return response.data;
};

// Delete habit
const deleteHabit = async (id) => {
  await api.delete(`/habits/${id}`);
};

// Toggle completion
const toggleCompletion = async (habitId, date) => {
  const response = await api.post(`/habits/${habitId}/toggle`, { date });
  return response.data;
};
```

#### 5. Stats API Example

```javascript
// Get dashboard stats
const getDashboardStats = async () => {
  const response = await api.get('/stats/dashboard');
  return response.data;
};
```

---

## Example Request Payloads

### Register/Login
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

### Create Habit
```json
{
  "name": "Morning Exercise",
  "description": "30 minutes of cardio",
  "frequency": "daily",
  "color": "#3B82F6",
  "target_count": 1
}
```

### Toggle Completion
```json
{
  "date": "2025-12-03",
  "count": 1,
  "notes": "Completed 30 min run"
}
```

---

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000` (React default)
- `http://localhost:5173` (Vite default)
- `http://127.0.0.1:3000`
- `http://127.0.0.1:5173`

If your frontend runs on a different port, update `config/cors.php`.

---

## Troubleshooting

### CORS Errors
1. Make sure `withCredentials: true` is set in your axios config
2. Verify frontend URL is in `config/cors.php` allowed_origins
3. Check `SANCTUM_STATEFUL_DOMAINS` in `.env`

### Authentication Issues
1. Ensure the token is being stored and sent with requests
2. Check the Authorization header format: `Bearer {token}`
3. Verify the token hasn't expired

### Database Errors
1. Run `php artisan migrate:fresh` to reset the database
2. Check database connection in `.env`
