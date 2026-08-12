# ABC School Student Portal - Team Guide

This repository contains the master template for the ABC School Student Portal, including the global navigation (Sidebar and Topbar) and foundational routing.

This guide outlines the local environment setup procedure and group file assignments.

---

## Step 1: Initial Setup

The application is fully containerized using Docker to ensure consistent environments across all machines. You do not need to install Node.js, PHP, or NPM locally.

### Prerequisites:
1. Install Docker Desktop and ensure the daemon is running.
2. Install Git and clone this repository to your local machine.

### Starting the Application:
Open your terminal (Command Prompt, PowerShell, or Git Bash) in the project root directory and execute:

```bash
docker compose up -d
```

**Execution Details:**
- Downloads necessary base images (Node, MySQL, PHP).
- Automatically executes `npm install` inside the container to install React and Tailwind CSS.
- Starts the frontend Vite server on port `5173`.
- Starts the database and backend services.

*(Note: The initial build may take several minutes to download images and dependencies.)*

### Accessing the Application:
Once the containers have started successfully, open your web browser and navigate to:
**http://localhost:5173**

To stop the servers, run `docker compose down`.

---

## Step 2: Project Architecture & Rules

The architecture separates the global UI components from the module-specific content.

### Restricted Files (Global UI):
The following files control the global layout, navigation, and routing. Do not modify these files unless authorized by Group 1 (Auth/Core):
*   `frontend/src/App.jsx` (Routing configuration)
*   `frontend/src/components/Layout.jsx` (Structural wrapper)
*   `frontend/src/components/Sidebar.jsx` (Left navigation)
*   `frontend/src/components/Topbar.jsx` (Top bar header)
*   `frontend/tailwind.config.js` and `frontend/postcss.config.js`

---

## Step 3: Group Assignments

When developing your assigned module, you should only edit the specific file assigned to your group located in the `frontend/src/modules/` directory.

The React Router is pre-configured. Any code written in your assigned file will automatically render in the main content area when the corresponding sidebar tab is clicked.

### Group 1: Auth & Dashboard
*   **Auth / Login Page:** `frontend/src/modules/auth/Login.jsx`
*   **Dashboard (Home):** `frontend/src/modules/home/Dashboard.jsx`

### Group 2: Library Module
*   **Main File:** `frontend/src/modules/library/LibraryPortal.jsx`

### Group 3: Class Schedule & Faculty Directory
*   **Schedule File:** `frontend/src/modules/schedule/ScheduleView.jsx`
*   **Faculty File:** `frontend/src/modules/faculty/FacultyList.jsx`

### Group 4: Announcements Module
*   **Main File:** `frontend/src/modules/announcements/AnnouncementList.jsx`

### Group 5: Student Information Module
*   **Main File:** `frontend/src/modules/student_info/StudentProfile.jsx`

---

## Development Guidelines

1. **Hot Reloading:** The frontend server supports hot module replacement (HMR). You do not need to restart Docker when saving a file; the browser will update automatically.
2. **File Structure:** You may create additional folders and files (e.g., components) strictly inside your assigned module directory. Import these new files into your main module file.
3. **Styling:** The project uses Tailwind CSS. Apply Tailwind utility classes directly within your JSX.
