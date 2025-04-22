import React from "react";
import { Brain, Activity, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export function About() {
  return (
    <div className="container py-10 space-y-10">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="flex justify-center mb-2">
          <div className="bg-primary/10 p-3 rounded-full">
            <Brain className="w-10 h-10 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">About Parkinson's Detection</h1>
        <p className="text-muted-foreground text-lg">
          Advanced AI technology for early detection of Parkinson's disease
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="border-primary/10">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-2xl">Our Mission</CardTitle>
            <CardDescription className="text-base">
              Improving early diagnosis of Parkinson's disease
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-muted-foreground">
              Parkinson's Detection is dedicated to improving the early diagnosis of Parkinson's disease through advanced AI technology. Our platform analyzes 3D SPECT brain scans to detect early signs of Parkinson's, helping healthcare providers make more informed decisions.
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/10">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-2xl">How It Works</CardTitle>
            <CardDescription className="text-base">
              Advanced AI analysis of brain scans
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-muted-foreground">
              Our system uses deep learning algorithms trained on thousands of SPECT brain scans to identify patterns associated with Parkinson's disease. Simply upload a NIfTI format scan, and our AI will analyze it and provide a prediction with confidence score.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/10 flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Early Detection</h3>
            <p className="text-sm text-muted-foreground">
              Identify early signs of Parkinson's disease before symptoms become severe
            </p>
          </div>
          
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/10 flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Privacy Focused</h3>
            <p className="text-sm text-muted-foreground">
              Your data is processed securely and never stored without permission
            </p>
          </div>
          
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/10 flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Fast Results</h3>
            <p className="text-sm text-muted-foreground">
              Get analysis results in seconds with our optimized processing pipeline
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 