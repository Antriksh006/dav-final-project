import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

export default function ParkinsonsDetectionApp() {
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
      if (selectedFile.type === "application/x-nifti" || selectedFile.name.endsWith('.nii.gz')) {
        setPreviewURL(URL.createObjectURL(selectedFile));
      } else {
        setError("Please upload a valid NIfTI file (.nii or .nii.gz)");
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

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        body: formData,
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(progress);
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to process the image. Please try again.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Parkinson's Detection</h1>
          <p className="text-gray-600">Upload your 3D SPECT image for analysis</p>
        </div>

        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle>Image Analysis</CardTitle>
            <CardDescription>
              Upload a 3D SPECT image in NIfTI format (.nii or .nii.gz) for Parkinson's detection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file" className="text-lg">Select 3D SPECT Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <Input
                  id="file"
                  type="file"
                  accept=".nii,.nii.gz"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <UploadCloud className="w-12 h-12 text-gray-400" />
                  <span className="text-gray-600">
                    {file ? file.name : "Click to upload or drag and drop"}
                  </span>
                  <span className="text-sm text-gray-500">NIfTI files only (.nii, .nii.gz)</span>
                </label>
              </div>
            </div>

            {loading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-gray-500 text-center">
                  Processing your image... {uploadProgress.toFixed(0)}%
                </p>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && !error && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle>Analysis Complete</AlertTitle>
                <AlertDescription className="space-y-2">
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">Prediction</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {result.prediction === 1 ? "Parkinson's Detected" : "No Parkinson's Detected"}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">Confidence</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {(result.confidence * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleUpload}
              disabled={loading || !file}
              className="w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
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