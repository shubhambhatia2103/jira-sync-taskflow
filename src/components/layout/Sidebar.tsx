
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Settings, 
  Home, 
  CheckSquare, 
  Bug, 
  ChevronLeft, 
  ChevronRight, 
  Folder,
  FileChartPie
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Bugs', path: '/bugs', icon: Bug },
    { name: 'Projects', path: '/projects', icon: Folder },
    { name: 'Reports', path: '/reports', icon: FileChartPie },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={cn(
        'bg-sidebar/80 backdrop-blur-lg border-r border-border transition-all duration-300 ease-in-out flex flex-col',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border/40">
        <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "")}>
          {!collapsed && (
            <span className="font-bold text-xl text-sidebar-primary">TaskFlow</span>
          )}
          {collapsed && (
            <span className="font-bold text-xl text-sidebar-primary">TF</span>
          )}
        </div>
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="text-sidebar-foreground hover:bg-sidebar-accent/20"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <nav className="flex-1 pt-6 px-2">
        <TooltipProvider delayDuration={100}>
          <div className={cn(
            "flex",
            collapsed ? "flex-col items-center" : "flex-col"
          )}>
            {navigationItems.map((item) => (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "group flex items-center gap-3 my-1 transition-all duration-200",
                      collapsed 
                        ? "justify-center rounded-full p-3 mx-auto hover:bg-sidebar-accent/40"
                        : "px-3 py-2 rounded-md hover:bg-sidebar-accent/20",
                      currentPath === item.path || (
                        item.path !== '/' && currentPath.startsWith(item.path)
                      )
                        ? collapsed 
                          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md" 
                          : "bg-sidebar-accent/80 text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground"
                    )}
                  >
                    <item.icon className={cn(
                      "transition-all",
                      collapsed ? "h-6 w-6" : "h-5 w-5"
                    )} />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </nav>
      
      <div className={cn(
        "p-4 mt-auto border-t border-sidebar-border/40",
      )}>
        {collapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center cursor-pointer" onClick={() => setCollapsed(false)}>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-sidebar-accent/50 flex items-center justify-center text-sidebar-accent-foreground font-medium text-sm hover:bg-sidebar-accent transition-colors">
                      J
                    </div>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar"></span>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs opacity-70">john.doe@example.com</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-sidebar-accent/50 flex items-center justify-center text-sidebar-accent-foreground font-medium text-sm">
                    J
                  </div>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar"></span>
                </div>
                <div>
                  <p className="text-sm font-medium text-sidebar-foreground">John Doe</p>
                  <p className="text-xs text-sidebar-foreground/60">john.doe@example.com</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-sidebar-foreground hover:bg-sidebar-accent/20"
                onClick={() => setCollapsed(true)}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
