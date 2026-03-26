# Authentication Backend Specification (For AI Agent)

## 1. Objective

The AI Agent must implement a **backend authentication system** that integrates with an existing frontend interface.

The frontend already contains the following pages:

* Login
* Register account
* Forgot password
* Reset password
* Change password

The backend must expose REST APIs and authentication logic to support these pages.

Frontend UI development is **not part of the agent's task**.

---

# 2. System Responsibilities

The backend must handle:

* User authentication
* User registration
* Password management
* Token authentication
* Security protection
* Authentication logging

---

# 3. Authentication Method

The system must use:

* JWT Access Token
* Refresh Token

Token usage:

| Token         | Purpose                   | Expiration |
| ------------- | ------------------------- | ---------- |
| Access Token  | API authentication        | 15 minutes |
| Refresh Token | generate new access token | 7 days     |

---

# 4. API Base Path

```
/api/auth
```

All authentication APIs must use JSON.

---

# 5. API Endpoints

## 5.1 Register Account

Supports the **Create Account page**.

POST `/api/auth/register`

Request

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

Processing logic:

1. Validate input fields
2. Check if username already exists
3. Check if email already exists
4. Hash password using bcrypt
5. Store new user in database
6. Assign default role
7. Return success response

Response

```json
{
  "message": "Account created successfully"
}
```

---

# 5.2 Login

Supports the **Login page**.

POST `/api/auth/login`

Request

```json
{
  "username": "string",
  "password": "string"
}
```

Processing logic:

1. Validate input
2. Find user by username
3. Verify password hash
4. Check account status
5. Generate access token
6. Generate refresh token
7. Store refresh token
8. Return tokens

Response

```json
{
  "access_token": "string",
  "refresh_token": "string",
  "user": {
    "id": "uuid",
    "username": "string"
  }
}
```

Error

```json
{
  "error": "Invalid credentials"
}
```

---

# 5.3 Forgot Password

Supports the **Forgot Password page**.

POST `/api/auth/forgot-password`

Request

```json
{
  "email": "string"
}
```

Processing logic:

1. Check if email exists
2. Generate reset token
3. Store reset token with expiration
4. Send reset link to user email

Response

```json
{
  "message": "Password reset link sent"
}
```

---

# 5.4 Reset Password

Supports the **Reset Password page**.

POST `/api/auth/reset-password`

Request

```json
{
  "token": "string",
  "new_password": "string"
}
```

Processing logic:

1. Verify reset token
2. Check token expiration
3. Hash new password
4. Update password in database
5. Remove reset token

Response

```json
{
  "message": "Password updated successfully"
}
```

---

# 5.5 Change Password

Supports **Change Password inside user account**.

POST `/api/auth/change-password`

Header

```
Authorization: Bearer <access_token>
```

Request

```json
{
  "old_password": "string",
  "new_password": "string"
}
```

Processing logic:

1. Verify JWT token
2. Fetch current user
3. Verify old password
4. Hash new password
5. Update password

Response

```json
{
  "message": "Password changed successfully"
}
```

---

# 5.6 Refresh Token

POST `/api/auth/refresh`

Request

```json
{
  "refresh_token": "string"
}
```

Processing logic:

1. Validate refresh token
2. Check expiration
3. Generate new access token

Response

```json
{
  "access_token": "string"
}
```

---

# 6. Database Schema

## Users

| Field         | Type            |
| ------------- | --------------- |
| id            | uuid            |
| username      | string          |
| email         | string          |
| password_hash | string          |
| status        | active / locked |
| created_at    | datetime        |

---

## Password Reset Tokens

| Field      | Type     |
| ---------- | -------- |
| id         | uuid     |
| user_id    | uuid     |
| token      | string   |
| expires_at | datetime |

---

## Refresh Tokens

| Field      | Type     |
| ---------- | -------- |
| id         | uuid     |
| user_id    | uuid     |
| token      | string   |
| expires_at | datetime |

---

## Login Logs

| Field      | Type     |
| ---------- | -------- |
| id         | uuid     |
| user_id    | uuid     |
| ip_address | string   |
| login_time | datetime |

---

# 7. Security Requirements

The backend must implement the following security mechanisms.

---

## Password Hashing

Use:

```
bcrypt
```

Configuration

```
hash rounds = 12
```

---

## Login Rate Limit

```
max attempts = 5
window = 1 minute
```

---

## Account Lock

```
5 failed login attempts
lock account for 15 minutes
```

---

## Password Rules

```
minimum length = 8 characters
```

---

# 8. JWT Configuration

Example payload

```json
{
  "user_id": "uuid",
  "exp": "timestamp"
}
```

Environment configuration

```
JWT_SECRET=secret_key
JWT_EXPIRE=15m
REFRESH_TOKEN_EXPIRE=7d
```

---

# 9. Middleware

The system must implement authentication middleware.

Middleware responsibilities:

1. Read Authorization header
2. Verify JWT token
3. Decode payload
4. Attach user_id to request context

Header format

```
Authorization: Bearer <token>
```

---

# 10. Logging

The system must log the following events:

* login success
* login failure
* password reset
* password change
* logout

Log structure

```
timestamp
user_id
ip_address
action
```

---

# 11. Implementation Rules for AI Agent

The AI Agent must follow these rules:

1. Do not modify API endpoints defined in this document.
2. All APIs must return JSON responses.
3. Passwords must always be hashed.
4. Tokens must be securely generated.
5. Sensitive information must never be exposed in API responses.
6. Authentication middleware must protect secure endpoints.

---

# 12. Definition of Done

The backend implementation is complete when:

* All authentication APIs are implemented
* Login works with JWT
* Registration works
* Password reset flow works
* Change password works
* Refresh token works
* Security protections are active
* Authentication logs are recorded

---

# End of Specification
