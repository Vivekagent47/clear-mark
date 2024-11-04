"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, AlertCircle, Loader2, Sun, Upload } from "lucide-react";

export default function PlagiarismChecker() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setError(null);
      setResult(null);

      try {
        const text = await extractTextFromFile(selectedFile);
        setExtractedText(text);
        setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
      } catch (err) {
        setError(
          `Error extracting text from file: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
        setExtractedText("");
        setWordCount(0);
      }
    }
  };

  const extractTextFromFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        resolve(text);
      };
      reader.onerror = () => reject(new Error("File could not be read"));
      reader.readAsText(file);
    });
  };

  const checkPlagiarism = async () => {
    if (!extractedText.trim()) {
      setError("Please upload a file with content to check for plagiarism");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/plagiarism", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: extractedText }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.result);
      }

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      setError(
        `${error instanceof Error ? error : "An unknown error occurred"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen`}>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6 text-gray-900 transition-colors duration-300 dark:from-gray-900 dark:to-black dark:text-white">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-4xl font-bold text-transparent">
              Plagiarism Checker
            </h1>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
            </div>
          </div>

          <Card className="border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                Upload Your File
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors duration-300 hover:border-purple-500 dark:border-gray-700 dark:hover:border-purple-400"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".txt,.doc,.docx,.pdf"
                  className="hidden"
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Supported formats: TXT, DOC, DOCX, PDF
                </p>
              </div>

              {file && (
                <div className="flex items-center justify-between rounded bg-gray-100 p-2 dark:bg-gray-700">
                  <span className="truncate text-sm">{file.name}</span>
                  <Badge variant="secondary">Words: {wordCount}</Badge>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={checkPlagiarism}
                  disabled={loading || !extractedText.trim()}
                  className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    "Check Plagiarism"
                  )}
                </Button>
              </div>

              {error && (
                <div>
                  <Alert
                    variant="destructive"
                    className="border-red-200 bg-red-100 dark:border-red-800 dark:bg-red-900"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </div>
              )}

              {result && (
                <div>
                  <Alert className="border-green-200 bg-green-100 dark:border-green-800 dark:bg-green-900">
                    <AlertTitle>Results</AlertTitle>
                    <AlertDescription className="whitespace-pre-wrap">
                      {result}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
