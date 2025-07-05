# Users API Documentation

This document describes the Users API endpoints for the Home-Finder application. The API provides full CRUD operations for user management with Supabase integration.

## Table Structure

The `users` table in Supabase has the following structure:

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API Endpoints

### 1. Get All Users

**GET** `/api/users`

Retrieves a paginated list of users with optional filtering and sorting.

#### Query Parameters

- `limit` (optional): Number of users to return (default: 20, max: 100)
- `offset` (optional): Number of users to skip (default: 0)
- `email` (optional): Filter by email (partial match)
- `first_name` (optional): Filter by first name (partial match)
- `last_name` (optional): Filter by last name (partial match)
- `sortBy` (optional): Sort field (`created_at`, `first_name`, `last_name`, `email`)
- `sortOrder` (optional): Sort order (`asc` or `desc`, default: `desc`)

#### Example Request

```bash
GET /api/users?limit=10&offset=0&sortBy=created_at&sortOrder=desc
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "clerk_id": "user_2abc123def456",
        "email": "john.doe@example.com",
        "first_name": "John",
        "last_name": "Doe",
        "created_at": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 1,
    "hasMore": false
  }
}
```

### 2. Create User

**POST** `/api/users`

Creates a new user.

#### Request Body

```json
{
  "clerk_id": "user_2abc123def456",
  "email": "john.doe@example.com",
  "first_name": "John",
  "last_name": "Doe"
}
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "clerk_id": "user_2abc123def456",
    "email": "john.doe@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### 3. Get User by ID

**GET** `/api/users/{id}`

Retrieves a specific user by their UUID.

#### Example Request

```bash
GET /api/users/123e4567-e89b-12d3-a456-426614174000
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "clerk_id": "user_2abc123def456",
    "email": "john.doe@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### 4. Update User

**PUT** `/api/users/{id}`

Updates a specific user by their UUID.

#### Request Body

```json
{
  "email": "john.updated@example.com",
  "first_name": "Johnny",
  "last_name": "Doe"
}
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "clerk_id": "user_2abc123def456",
    "email": "john.updated@example.com",
    "first_name": "Johnny",
    "last_name": "Doe",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### 5. Delete User

**DELETE** `/api/users/{id}`

Deletes a specific user by their UUID.

#### Example Request

```bash
DELETE /api/users/123e4567-e89b-12d3-a456-426614174000
```

#### Example Response

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

### 6. Get User by Clerk ID

**GET** `/api/users/clerk/{clerkId}`

Retrieves a user by their Clerk ID.

#### Example Request

```bash
GET /api/users/clerk/user_2abc123def456
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "clerk_id": "user_2abc123def456",
    "email": "john.doe@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### 7. Get User by Email

**GET** `/api/users/email/{email}`

Retrieves a user by their email address.

#### Example Request

```bash
GET /api/users/email/john.doe%40example.com
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "clerk_id": "user_2abc123def456",
    "email": "john.doe@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created (for POST requests)
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## Usage Examples

### JavaScript/TypeScript

```typescript
// Fetch all users
const response = await fetch('/api/users?limit=10&sortBy=created_at');
const result = await response.json();

// Create a new user
const newUser = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    clerk_id: 'user_2abc123def456',
    email: 'john.doe@example.com',
    first_name: 'John',
    last_name: 'Doe'
  })
});

// Update a user
const updatedUser = await fetch('/api/users/123e4567-e89b-12d3-a456-426614174000', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    first_name: 'Johnny'
  })
});

// Delete a user
const deleteResult = await fetch('/api/users/123e4567-e89b-12d3-a456-426614174000', {
  method: 'DELETE'
});
```

### cURL Examples

```bash
# Get all users
curl -X GET "http://localhost:3000/api/users?limit=10"

# Create a user
curl -X POST "http://localhost:3000/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "clerk_id": "user_2abc123def456",
    "email": "john.doe@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }'

# Get user by ID
curl -X GET "http://localhost:3000/api/users/123e4567-e89b-12d3-a456-426614174000"

# Update user
curl -X PUT "http://localhost:3000/api/users/123e4567-e89b-12d3-a456-426614174000" \
  -H "Content-Type: application/json" \
  -d '{"first_name": "Johnny"}'

# Delete user
curl -X DELETE "http://localhost:3000/api/users/123e4567-e89b-12d3-a456-426614174000"
```

## Testing

You can test the API using the test page at `/test-users` which provides a user interface for all CRUD operations.

## Notes

- The API includes fallback mock data when Supabase is not configured
- All email addresses are validated for proper format
- Clerk ID and email must be unique
- The `created_at` field is automatically set when creating users
- Pagination is supported for the main users list endpoint
- Partial text matching is supported for email, first_name, and last_name filters 