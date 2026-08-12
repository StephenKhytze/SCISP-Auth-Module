# 🚀 ABC School Student Portal - Team Guide

Welcome to the ABC School Student Portal template! This repository contains the master template, including the global navigation (Sidebar and Topbar) and the foundational routing. 

This guide will walk you through how to get the project running on your local machine and exactly which files your specific group should be editing.

---

## 🛠️ Step 1: Initial Setup

You do **not** need to install Node.js, PHP, or NPM directly on your computer! We have containerized the entire application using Docker to guarantee it works identically on everyone's machines.

### Prerequisites:
1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) and ensure it is running.
2. Install [Git](https://git-scm.com/downloads) and clone this repository to your machine.

### Starting the Application:
Open your terminal (Command Prompt, PowerShell, or Git Bash) inside the cloned project folder and run:

```bash
docker compose up -d
```

**What this command does:**
- It downloads all necessary images (Node, MySQL, PHP).
- It automatically runs `npm install` for you inside the container to install React and Tailwind CSS.
- It starts the frontend server on port `5173`.
- It starts the database and backend servers.

*(Note: The first time you run this, it may take a few minutes to download the images and install the NPM packages. Just wait until your terminal returns to the prompt.)*

### Viewing the Application:
Once Docker finishes starting the containers, open your web browser and go to:
👉 **[http://localhost:5173](http://localhost:5173)**

*If you ever need to stop the servers, run `docker compose down`.*

---

## 🏗️ Step 2: Project Architecture & Rules

We have separated the "Global UI" from the "Module Content". 

### 🚫 DO NOT EDIT THESE FILES (Global UI):
These files control the layout, the sidebar, the topbar, and the routing. **Do not touch these unless you are Group 1 (Auth/Core) and everyone agrees to a change!**
*   `frontend/src/App.jsx` (Controls the routing)
*   `frontend/src/components/Layout.jsx` (The structural wrapper)
*   `frontend/src/components/Sidebar.jsx` (The maroon left navigation)
*   `frontend/src/components/Topbar.jsx` (The top bar with the logo and user profile)
*   `frontend/tailwind.config.js` and `frontend/postcss.config.js`

---

## 🎯 Step 3: Group Assignments (Where to code)

When you are ready to start building your module, you **only** need to edit the specific file assigned to your group inside the `frontend/src/modules/` folder. 

Because the React Router is already set up, any code you write in your assigned file will automatically appear inside the main content area when someone clicks your tab in the sidebar!

Find your group below and open your specific file:

### Group 1: Auth & Dashboard
*   **Auth / Login Page:** `frontend/src/modules/auth/Login.jsx`
*   **Dashboard (Home):** `frontend/src/modules/home/Dashboard.jsx`

### Group 2: Schedule Module
*   **Main File:** `frontend/src/modules/schedule/ScheduleView.jsx`
*   *(This appears when clicking the "Schedule" tab)*

### Group 3: Announcements Module
*   **Main File:** `frontend/src/modules/announcements/AnnouncementList.jsx`
*   *(This appears when clicking the "Announcements" tab)*

### Group 4: Library Module
*   **Main File:** `frontend/src/modules/library/LibraryPortal.jsx`
*   *(This appears when clicking the "Library" tab)*

### Group 5: Faculty Module
*   **Main File:** `frontend/src/modules/faculty/FacultyList.jsx`
*   *(This appears when clicking the "Faculty Directory" tab)*

### Group 6: Student Information Module
*   **Main File:** `frontend/src/modules/student_info/StudentProfile.jsx`
*   *(This appears when clicking the "Student Information" tab)*

---

## 💡 Pro Tips for Development

1. **Hot Reloading:** You do not need to restart Docker when you save a file. Just save your `.jsx` file, and your browser will update instantly!
2. **Adding More Files:** If your module gets complex, you can create new folders and files *inside* your specific module directory (e.g., `frontend/src/modules/schedule/components/Calendar.jsx`) and import them into your main file. Just keep everything inside your own group's folder!
3. **Tailwind CSS:** We are using Tailwind CSS for styling. You can use any standard Tailwind classes (like `flex`, `p-4`, `text-blue-500`) directly in your JSX.
