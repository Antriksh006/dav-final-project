import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { UploadCloud, AlertCircle, CheckCircle2, Loader2, Brain, BarChart3, Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Progress } from "../components/ui/progress";

export function Home() {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError(null);
    setResult(null);
    
    if (selectedFile) {
      // Check if file is a valid NIfTI or DICOM file
      if (
        selectedFile.type === "application/x-nifti" || 
        selectedFile.name.endsWith('.nii.gz') ||
        selectedFile.name.endsWith('.nii') ||
        selectedFile.type === "application/dicom" ||
        selectedFile.name.endsWith('.dcm')
      ) {
        setPreviewURL(URL.createObjectURL(selectedFile));
      } else {
        setError("Please upload a valid NIfTI (.nii, .nii.gz) or DICOM (.dcm) file");
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    setError(null);
    setUploadProgress(0);

    // Create FormData - this is important for sending files
    const formData = new FormData();
    
    // Use "file" as the field name as expected by the backend
    formData.append("file", file);
    
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to process the image. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // Get class name with correct styling
  const getClassNameDisplay = () => {
    if (!result || !result.prediction) return "N/A";
    
    const className = result.prediction.class_name;
    let color = "text-foreground";
    
    // Color code based on diagnosis
    if (className === "PD") {
      color = "text-red-600"; // Parkinson's Disease - red
    } else if (className === "SWEDD") {
      color = "text-amber-600"; // SWEDD - amber/orange
    } else if (className === "Control") {
      color = "text-green-600"; // Control - green
    }
    
    return (
      <span className={color}>
        {className === "PD" ? "Parkinson's Disease" : 
         className === "SWEDD" ? "SWEDD" : 
         className === "Control" ? "No Parkinson's (Control)" : className}
      </span>
    );
  };

  // Format confidence value for display
  const formatConfidence = (value) => {
    if (!value && value !== 0) return "N/A";
    return `${(parseFloat(value) * 100).toFixed(2)}%`;
  };

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <Brain className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Parkinson's Detection</h1>
          <p className="text-muted-foreground text-lg">Upload your 3D SPECT image for AI-powered analysis</p>
        </div>

        <Card className="w-full shadow-xl border-primary/10 overflow-hidden">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-2xl">Image Analysis</CardTitle>
            <CardDescription className="text-base">
              Upload a 3D SPECT image in NIfTI format (.nii, .nii.gz) or DICOM format (.dcm) for Parkinson's detection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <Label htmlFor="file" className="text-lg font-medium">Select 3D SPECT Image</Label>
              <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/40 transition-all duration-300 bg-primary/5">
                <Input
                  id="file"
                  type="file"
                  accept=".nii,.nii.gz,.dcm"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <div className="bg-primary/10 p-4 rounded-full">
                    <UploadCloud className="w-10 h-10 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">
                    {file ? file.name : "Click to upload or drag and drop"}
                  </span>
                  <span className="text-sm text-muted-foreground">NIfTI (.nii, .nii.gz) or DICOM (.dcm) files</span>
                </label>
              </div>
            </div>

            {loading && (
              <div className="space-y-3">
                <Progress value={uploadProgress} className="w-full h-2" />
                <p className="text-sm text-muted-foreground text-center">
                  Processing your image... {uploadProgress.toFixed(0)}%
                </p>
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="border-destructive/50">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle className="text-lg">Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && !error && (
              <Alert className="bg-primary/5 border-primary/20">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <AlertTitle className="text-lg">Analysis Complete</AlertTitle>
                <AlertDescription className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="bg-background p-5 rounded-lg shadow-sm border border-primary/10">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        <p className="text-sm text-muted-foreground">Diagnosis</p>
                      </div>
                      <p className="text-xl font-semibold mt-1">
                        {getClassNameDisplay()}
                      </p>
                    </div>
                    <div className="bg-background p-5 rounded-lg shadow-sm border border-primary/10">
                      <div className="flex items-center gap-2">
                        <div className="text-primary">%</div>
                        <p className="text-sm text-muted-foreground">Confidence</p>
                      </div>
                      <p className="text-xl font-semibold text-foreground mt-1">
                        {result.prediction ? formatConfidence(result.prediction.confidence) : "N/A"}
                      </p>
                    </div>
                  </div>
                  
                  {/* Probabilities Section */}
                  {result.prediction && result.prediction.probabilities && (
                    <div className="mt-4 p-4 bg-background rounded-lg shadow-sm border border-primary/10">
                      <h3 className="text-lg font-medium mb-3">Classification Probabilities</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(result.prediction.probabilities).map(([key, value]) => (
                          <div key={key} className="flex flex-col">
                            <span className="text-sm text-muted-foreground">
                              {key === "PD" ? "Parkinson's Disease" : 
                               key === "SWEDD" ? "SWEDD" : 
                               key === "Control" ? "No Parkinson's (Control)" : key}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    key === "PD" ? "bg-red-500" : 
                                    key === "SWEDD" ? "bg-amber-500" : 
                                    "bg-green-500"
                                  }`}
                                  style={{width: `${value * 100}%`}}
                                ></div>
                              </div>
                              <span className="font-medium">
                                {(value * 100).toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Processing Time */}
                  {result.processing_time_ms && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Processing time: {result.processing_time_ms.toFixed(0)} ms</span>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleUpload}
              disabled={loading || !file}
              className="w-full flex items-center justify-center gap-2 h-12 text-base font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <UploadCloud className="w-5 h-5" />
                  Analyze Image
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}