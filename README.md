# 🧩 TaskFlow – Task & Bug Management with Jira Integration

TaskFlow is a modern, Jira-integrated task and bug management application tailored for teams looking to streamline their workflow with a clean interface and powerful functionality. Inspired by tools like **Linear**, **ClickUp**, and **Monday.com**, TaskFlow offers a professional experience with deep customization and intuitive navigation.

---

## 🌟 Project Overview

TaskFlow was built to help teams manage tasks and bugs in one unified platform, fully integrated with Jira. It provides:

- A responsive dashboard  
- Task and bug detail views  
- Simplified Jira integration  
- A clean UI and productive UX  
- Built-in authentication and filtering  

> ✅ This project was created for internal use by my team, to manage our workflow more effectively on top of Jira’s capabilities.

---

## 🎯 Features

### 🔐 Authentication
- Secure login system
- Simplified for MVP version
- Built using Supabase Auth

### 🧭 Sidebar Navigation
- Left-hand sidebar with easy access to:
  - Home
  - Tasks
  - Bugs
  - Settings

### 📋 Tasks & Bugs View
- All assigned items displayed upon clicking “Tasks” or “Bugs”
- Mimics Home page behavior with real-time display
- Card-based layout with filters (status, priority, assignee)

### 📄 Task Detail Page
- Click on any task/bug card to view and edit full details:
  - Status updates
  - Assignee selection
  - Date picker
  - Priority setting
  - Rich-text description editing
  - File attachments
  - Real-time activity feed (comments, changes)

### 🔧 Jira Integration
- Settings page allows linking Jira workspace
- Syncs tasks and bugs from selected Jira boards
- Uses Jira REST API under the hood

### 🎨 Design System
- Color palette: Professional blues & purples with status-based accents
- Typography: Clean, accessible fonts
- Layout: Responsive grid and card UI
- Interactions: Smooth transitions and hover states

---

## 🛠️ Technologies Used

This project is built with:

- ⚡ **Vite** – Fast frontend build tool for modern web projects  
- 🟦 **TypeScript** – Typed superset of JavaScript for scalable development  
- ⚛️ **React** – JavaScript library for building user interfaces  
- 🎨 **Tailwind CSS** – Utility-first CSS framework for rapid UI development  
- 🧩 **shadcn/ui** – Beautifully designed, accessible components built on top of Radix UI

---


## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/shubhambhatia2103/jira-sync-taskflow.git
cd jira-sync-taskflow
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Supabase
Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Setup Jira Integration
- Go to [Jira Developer Portal](https://developer.atlassian.com/console/myapps/)
- Create an OAuth app and get your `client_id` and `client_secret`
- Add the values to your `.env.local`:
```env
JIRA_CLIENT_ID=your_client_id
JIRA_CLIENT_SECRET=your_client_secret
```

### 5. Run Locally
```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 🚀 Roadmap

- [x] Task/Bug dashboard with filters
- [x] Task detail page with update functionality
- [x] Jira integration with OAuth setup
- [x] Responsive UI and sidebar navigation
- [ ] Notification system (email + in-app)
- [ ] Team-based permission control
- [ ] Real-time collaboration (WebSockets)
- [ ] Drag & drop Kanban-style board

---

## 💖 Built with Loveable

This project was designed in collaboration with [**Lovable**](https://lovable.dev), a creative platform that helps makers build beautiful and thoughtful web experiences.  
Their calm-first design philosophy inspired the look, feel, and flow of *Tiny Wins*.


## Contact

[<img target="_blank" src="https://img.icons8.com/bubbles/100/000000/linkedin.png" title="LinkedIn">](https://www.linkedin.com/in/shubhambhatia2103/) [<img target="_blank" src="https://img.icons8.com/bubbles/100/000000/github.png" title="Github">](https://github.com/shubhambhatia2103) [<img target="_blank" src="https://img.icons8.com/bubbles/100/000000/instagram-new.png" title="Instagram">](https://instagram.com/6eingshubham) [<img target="_blank" src="https://img.icons8.com/bubbles/100/000000/twitter-squared.png" title="Twitter">](https://x.com/apmshubham)


