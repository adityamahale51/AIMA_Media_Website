# AIMA Media - Full Stack Website

A full-stack clone of [https://aimamedia.org/](https://aimamedia.org/) built with **React.js** (Frontend) and **Express.js** (Backend).

---

## Project Structure

```
aditywebsite/
├── backend/          → Express.js API Server (Port 5000)
│   ├── server.js
│   ├── seed.js
│   ├── routes/       → auth, news, members, gallery, contact
│   ├── middleware/    → JWT authentication
│   ├── utils/        → JSON file database
│   └── data/         → JSON database files
│
├── frontend/         → React + Vite (Port 5173)
│   ├── src/
│   │   ├── api/      → API call functions
│   │   ├── context/  → Auth context (JWT)
│   │   ├── components/ → Layout, Carousel, NewsCard, Sidebar
│   │   ├── pages/    → 11 pages (Home, Login, Dashboard, etc.)
│   │   └── styles.css
│   └── vite.config.js → Proxy /api to backend
│
└── package.json      → Root scripts to run both
```

---

## How to Run

### Step 1: Install Dependencies

Open terminal in the project root folder (`aditywebsite/`) and run:

```bash
cd backend
npm install

cd ../frontend
npm install

cd ..
npm install
```

Or use the shortcut (from root):

```bash
npm run install-all
npm install
```

### Step 2: Seed the Database

This creates the demo user and initial data (news, members, gallery):

```bash
npm run seed
```

### Step 3: Start Both Servers

**Option A — Run both together:**

```bash
npm run dev
```

**Option B — Run separately (2 terminals):**

Terminal 1 (Backend):
```bash
cd backend
node server.js
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### Step 4: Open in Browser

- Frontend: **http://localhost:5173**
- Backend API: **http://localhost:5000/api**

---

## Login Credentials

| Type         | Email / Mobile       | Password   |
|--------------|----------------------|------------|
| **Demo User** | `demo@aimamedia.org` | `demo123`  |
| **Demo User** | `9999999999`         | `demo123`  |

You can also **Register** a new account from the Join Us / Register page.

---

## API Endpoints

| Method | Endpoint              | Auth     | Description              |
|--------|-----------------------|----------|--------------------------|
| POST   | `/api/auth/register`  | No       | Register new user        |
| POST   | `/api/auth/login`     | No       | Login (returns JWT)      |
| GET    | `/api/auth/me`        | Yes      | Get current user profile |
| PUT    | `/api/auth/profile`   | Yes      | Update profile           |
| GET    | `/api/news`           | No       | Get all news posts       |
| POST   | `/api/news`           | Yes      | Create news (with files) |
| PUT    | `/api/news/:id/like`  | Yes      | Like / unlike a post     |
| DELETE | `/api/news/:id`       | Yes      | Delete own post          |
| GET    | `/api/members`        | No       | Get all members          |
| GET    | `/api/members/active` | No       | Get most active members  |
| GET    | `/api/gallery`        | No       | Get gallery images       |
| POST   | `/api/contact`        | No       | Submit contact form      |
| GET    | `/api/health`         | No       | Server health check      |

**Auth** = Requires `Authorization: Bearer <token>` header

---

## Pages

| Route           | Page           | Auth Required |
|-----------------|----------------|---------------|
| `/`             | Home           | No            |
| `/login`        | Login          | No            |
| `/register`     | Register       | No            |
| `/dashboard`    | Dashboard      | Yes           |
| `/about`        | About Us       | No            |
| `/contact`      | Contact Us     | No            |
| `/members`      | Members List   | No            |
| `/gallery`      | Photo Gallery  | No            |
| `/news-upload`  | Upload News    | Yes           |
| `/profile`      | My Profile     | Yes           |
| `/edit-profile` | Edit Profile   | Yes           |

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 19, React Router v7, Vite 7   |
| Backend    | Express.js, Node.js                 |
| Auth       | JWT (jsonwebtoken), bcryptjs        |
| Database   | JSON file-based (no setup needed)   |
| Upload     | Multer (image + audio)              |
| Icons      | Font Awesome 6                      |
| Styling    | Custom CSS (matching aimamedia.org) |

---

## Features

- Same-to-same design matching aimamedia.org
- JWT authentication (login / register / logout)
- News feed with like, comment, share buttons
- Image carousel with auto-slide
- Most Active Members sidebar
- District Committees selector
- News upload with image & audio support
- Member profile with edit functionality
- Gallery with lightbox viewer
- Contact form (saves to backend)
- Bottom navigation with dropdown menus
- Fully responsive (mobile / tablet / desktop)
