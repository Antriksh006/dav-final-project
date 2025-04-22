import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Brain } from "lucide-react";
import { ThemeToggle } from "./ui/theme-toggle";

export function Layout({ children }) {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
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
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/contact") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Contact
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  Parkinson's Detection
                </span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Advanced AI-powered tool for early detection of Parkinson's disease using 3D SPECT imaging.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Contact</h3>
              <p className="text-sm text-muted-foreground">
                For questions or support, please contact us at:
                <br />
                <a href="mailto:support@parkinsonsdetection.com" className="text-primary hover:underline">
                  support@parkinsonsdetection.com
                </a>
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Parkinson's Detection. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 