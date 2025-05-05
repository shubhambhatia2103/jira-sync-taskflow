
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import TaskDetail from "./pages/TaskDetail";
import TasksPage from "./pages/TasksPage";
import BugsPage from "./pages/BugsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetail from "./pages/ProjectDetail";
import ReportsPage from "./pages/ReportsPage";

const queryClient = new QueryClient();

const App = () => {
  // For demo purposes, we're assuming the user is authenticated
  const isAuthenticated = true;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
            
            <Route path="/" element={
              isAuthenticated ? 
              <MainLayout>
                <Dashboard />
              </MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/tasks" element={
              isAuthenticated ? 
              <MainLayout>
                <TasksPage />
              </MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/bugs" element={
              isAuthenticated ? 
              <MainLayout>
                <BugsPage />
              </MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/tasks/:id" element={
              isAuthenticated ? 
              <MainLayout>
                <TaskDetail />
              </MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/projects" element={
              isAuthenticated ? 
              <MainLayout>
                <ProjectsPage />
              </MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/projects/:id" element={
              isAuthenticated ? 
              <MainLayout>
                <ProjectDetail />
              </MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/reports" element={
              isAuthenticated ? 
              <MainLayout>
                <ReportsPage />
              </MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="/settings" element={
              isAuthenticated ? 
              <MainLayout>
                <Settings />
              </MainLayout> : 
              <Navigate to="/login" replace />
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
