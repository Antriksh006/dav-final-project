import React from "react";
import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
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
          <p>© {currentYear} Parkinson's Detection. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 