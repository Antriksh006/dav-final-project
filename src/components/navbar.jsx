import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Brain } from "lucide-react";
import { ThemeToggle } from "./ui/theme-toggle";

export function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Parkinson's Detection
            </span>
          </Link>
        </div>
        
        <nav className="flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/about") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
} 