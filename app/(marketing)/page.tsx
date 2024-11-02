import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Search, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent">
              Clear-Mark
            </span>
          </div>
          {/* <nav className="hidden space-x-6 md:flex">
            <Link href="#" className="text-gray-300 hover:text-white">
              Features
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white">
              Pricing
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white">
              Resources
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white">
              Tool
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white">
              Parameters
            </Link>
          </nav> */}
          <Button className="bg-purple-600 hover:bg-purple-700">
            Check Now
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Trinka Plagiarism Checker now Enhanced with{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AI Content Detector
              </span>
            </h1>
            <p className="text-lg text-gray-400">
              Unlock clarity with AI-powered, paid publication and complete
              internet database coverage of all the 3 trillion+ indexed web
              pages.
            </p>
            <Button className="bg-purple-600 px-8 py-6 text-lg hover:bg-purple-700">
              Check Now
            </Button>
          </div>
          <div className="relative h-[500px]">
            <Image
              src="https://g-22vosbrawtd.vusercontent.net/placeholder.svg"
              alt="Plagiarism checker illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            { number: "82M+", label: "Words Checked" },
            { number: "91B+", label: "Internet and paid pages" },
            { number: "153M+", label: "Sources" },
            { number: "102M+", label: "Similarity found" },
          ].map((stat) => (
            <div key={stat.label} className="space-y-2">
              <div className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                {stat.number}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-12 text-2xl font-bold">
          Key Benefits of Plagiarism Check
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Search,
              title: "Free Plagiarism Score",
              description:
                "Get a detailed report of your document's originality score and potential matches.",
            },
            {
              icon: FileText,
              title: "Easy to Understand Report",
              description:
                "Clear visual representation of similarity matches with source links.",
            },

            {
              icon: Zap,
              title: "Source Detection Technology",
              description:
                "Advanced algorithms to detect potential sources accurately.",
            },
          ].map((benefit) => (
            <Card
              key={benefit.title}
              className="border-gray-700 bg-gray-800 p-6"
            >
              <benefit.icon className="mb-4 h-10 w-10 text-purple-400" />
              <h3 className="mb-2 text-lg font-semibold text-purple-300">
                {benefit.title}
              </h3>
              <p className="text-gray-400">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-purple-900 py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-3xl font-bold">
            Avoid Plagiarism & Submit your Work Confidently
          </h2>
          <Button className="bg-purple-600 px-8 py-6 text-lg hover:bg-purple-700">
            Check Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Work With Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Features</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    AI Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Grammar Check
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Style Guide
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Blog & Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Release Notes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Help & Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>Copyright ©2023 Created by Clear-Mark</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
