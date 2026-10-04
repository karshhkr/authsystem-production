# 🛡️ Secure AuthSystem: Full-Stack Enterprise Authentication Engine

> A production-grade, secure authentication and authorization boilerplate built with modern enterprise-level technologies. Designed to solve real-world security challenges like CORS preflight blocking, IP-based rate limiting, and stateless JWT verification.

---

## 🚀 Tech Stack

### **Backend**
* **Framework:** Spring Boot 3
* **Security:** Spring Security, JWT (JSON Web Tokens), Stateless Session Management
* **Database & Persistence:** PostgreSQL (Neon Cloud), Spring Data JPA, Flyway (Database Migrations)
* **Resilience & Rate Limiting:** Bucket4j (Token Bucket algorithm for DDoS/Brute-force protection)
* **Build Tool:** Maven

### **Frontend**
* **Library:** React (Vite)
* **Styling:** Custom Modern CSS with Responsive UI Layouts
* **HTTP Client:** Fetch API with custom error handling and response mapping

---

## ✨ Core Features Implemented

* **Secure Authentication Pipeline:** End-to-end Sign Up and Sign In flows with BCrypt password hashing.
* **Stateless JWT Authorization:** Custom `OncePerRequestFilter` (`JwtAuthFilter`) to extract, validate, and inject user authorities into the Spring Security Context.
* **Advanced Rate Limiting:** Integrated `Bucket4j` via `RateLimitingFilter` to protect sensitive authentication routes (`/api/auth/**`) from brute-force attacks based on client IP addresses.
* **CORS Preflight Management:** Explicit `OPTIONS` request bypasses configured across filters to ensure seamless cross-origin communication between React (`port 5174`) and Spring Boot.
* **Soft Delete Mechanism:** Database-level support for account deactivation via Flyway migrations (`is_deleted` and `deleted_at`).

---

## 🛠️ Engineering Challenges & Solutions

> *Highlights from building and debugging this architecture:*

1. **CORS Preflight Blocking by Custom Filters:**
   * **Issue:** Browser `OPTIONS` preflight requests were being intercepted and blocked by custom security filters (`RateLimitingFilter` and `JwtAuthFilter`) because they lacked credentials or authorization headers.
   * **Solution:** Added explicit method checks (`if ("OPTIONS".equalsIgnoreCase(request.getMethod()))`) to short-circuit and bypass security and rate-limiting filters for preflight requests.
2. **Circular Dependency Resolution:**
   * **Issue:** Circular dependency warnings/errors between `JwtAuthFilter` and `UserRepository`.
   * **Solution:** Applied `@Lazy` injection on the repository dependency inside the custom filter constructor to safely break the initialization loop.
3. **DTO & Response Payload Mapping:**
   * **Issue:** Frontend-backend field mismatch where the client expected `accessToken`, but the backend was serializing `token`.
   * **Solution:** Standardized the `AuthResponse` DTO payload and mapped token properties cleanly across the React client state.

---

## 📂 Project Structure

```text
authsystem/
├── src/main/java/com/example/authsystem/
│   ├── config/          # SecurityConfig, WebConfig (CORS)
│   ├── controller/      # AuthController, HomeController
│   ├── dto/             # Request & Response payloads
│   ├── entity/          # User entity & Role enums
│   ├── repository/      # Spring Data JPA repositories
│   ├── security/        # JwtAuthFilter, RateLimitingFilter, JwtService
│   └── service/         # Business logic & RateLimiterService
├── src/main/resources/
│   ├── db/migration/    # Flyway migration scripts (V1 - V9)
│   └── application.yml  # Database & security configurations
└── auth-frontend/       # React (Vite) Client Application
    └── src/
        ├── App.jsx      # Authentication & Dashboard UI components
        └── App.css      # Modern gradient styling

```
## clone
git clone [https://github.com/karshhkr/authsystem-production.git](https://github.com/karshhkr/authsystem-production.git)
cd authsystem

``
## run
mvn spring-boot:run

``

## 
Run the Frontend
cd auth-frontend
npm install
npm run dev

``
## 
🔮 Roadmap / Upcoming Features
[ ] Refresh Token Rotation: Implementing silent token refresh via secure HTTP-only cookies/database tokens.

[ ] Role-Based Access Control (RBAC): Expanding frontend UI routing and backend endpoints for distinct ADMIN and USER dashboards.

[ ] Forgot Password Flow: Secure email-based token recovery.


``
## 
👤 Author  Utkarsh Kumar Dabgarwal

GitHub: @karshhkr


