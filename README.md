# 🧩 TaskFlow – Task & Bug Management with Jira Integration

**TaskFlow** is a modern, Jira-integrated task and bug management app built to streamline team workflows with a clean interface, real-time updates, and Jira connectivity. Inspired by tools like **Linear**, **ClickUp**, and **Monday.com**, TaskFlow balances simplicity with power—perfect for agile teams.

> ✅ Originally built for internal use to extend Jira’s capabilities and streamline our team workflow.

---

## 🌟 Project Overview

TaskFlow was built to help teams manage tasks and bugs in one unified platform, fully integrated with Jira. It provides:

- Manage tasks and bugs from a unified, Jira-synced dashboard  
- View detailed task/bug cards with rich metadata and activity history  
- Filter, assign, and update statuses quickly  
- Integrate seamlessly with Jira using its REST API  
- Navigate via a responsive, sidebar-driven layout  

---

## 🎯 Features

### 🔐 Authentication
- Secure login system
- Simplified for MVP version
- Built using Supabase Auth

### 🧭 Navigation

```bash
/            → Dashboard  
/tasks       → All Tasks  
/bugs        → All Bugs  
/projects    → Projects List  
/projects/:id → Project Detail  
/reports     → Time Tracking & Reports  
/settings    → Jira & App Settings
```

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
## 📊 Reports & Time Tracker

- Log Weekly Hours on a grid interface
- Pie Charts for time distribution across projects
- Trend Analysis: Weekly/Monthly time trends with CSV export
- Export Support: PDF, DOC, and CSV formats

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

---

## 💖 Built with Lovable

This project was designed in collaboration with [**Lovable**](https://lovable.dev), a creative platform that empowers makers to build elegant and meaningful web applications.  
Lovable’s calm-first design philosophy inspired the layout, flow, and user experience of *TaskFlow*, helping shape a task management tool that's not just functional—but delightful to use. 


## Contact

[<img target="_blank" src="https://img.icons8.com/bubbles/100/000000/linkedin.png" title="LinkedIn">](https://www.linkedin.com/in/shubhambhatia2103/) [<img target="_blank" src="https://img.icons8.com/bubbles/100/000000/github.png" title="Github">](https://github.com/shubhambhatia2103) [<img target="_blank" src="https://img.icons8.com/bubbles/100/000000/instagram-new.png" title="Instagram">](https://instagram.com/6eingshubham) [<img target="_blank" src="https://img.icons8.com/bubbles/100/000000/twitter-squared.png" title="Twitter">](https://x.com/apmshubham)


