"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileText, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Component() {
  const [text, setText] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setWordCount(newText.trim() ? newText.trim().split(/\s+/).length : 0);
  };

  const handleCheck = async () => {
    if (!text.trim()) {
      setError("Please enter some text to check for plagiarism");
      return;
    }

    setIsChecking(true);
    setError(null);

    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // For demo purposes, showing error
      throw new Error(
        "429 You exceeded your current quota, please check your plan and billing details.",
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6 text-white">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
            Welcome to Plagiarism Checker
          </h1>
          <p className="mx-auto max-w-2xl text-gray-400">
            Advanced natural language processing to detect plagiarism in your
            documents. Supports multiple file formats including PDF, PPT, and
            CSV.
          </p>
        </div>

        {/* Main Content */}
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <FileText className="h-5 w-5 text-white" />
              Plagiarism Checker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="Enter or paste your text here..."
                className="min-h-[200px] resize-none border-gray-700 bg-gray-800/50 text-white focus:border-purple-500"
                value={text}
                onChange={handleTextChange}
              />
              <Badge
                variant="secondary"
                className="absolute bottom-4 right-4 bg-gray-800"
              >
                Words: {wordCount}
              </Badge>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleCheck}
                disabled={isChecking || !!!text.trim()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isChecking ? (
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
              <Alert
                variant="destructive"
                className="border-red-800 bg-red-900/50"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="mt-2">
                  {error}
                  {error.includes("429") && (
                    <a
                      href="https://platform.openai.com/docs/guides/error-codes/api-errors"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-red-400 underline hover:text-red-300"
                    >
                      Learn more about this error
                    </a>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
