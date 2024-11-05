import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Zap, Headphones, ChevronRight } from "lucide-react";
import Link from "next/link";
import Appbar from "../components/Appbar";

export default function LandingPage() {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Appbar />

        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                    Let Your Fans Choose the Beat
                  </h1>
                  <p className="mx-auto max-w-[700px] text-white md:text-xl">
                    Empower your audience to curate your stream's soundtrack.
                    Connect, engage, and create unforgettable music experiences
                    together.
                  </p>
                </div>
                <div className="space-x-4">
                  <Button className="bg-white text-black hover:bg-gray-200">
                    Get Started
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-black"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-white flex items-center justify-center">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                Why MusicStream?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Fan Engagement</h3>
                  <p className="text-gray-600">
                    Boost interaction by letting fans influence your music
                    choices in real-time.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Zap className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Dynamic Playlists</h3>
                  <p className="text-gray-600">
                    Create evolving playlists that adapt to your audience's
                    preferences.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Headphones className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">
                    Seamless Integration
                  </h3>
                  <p className="text-gray-600">
                    Easily integrate with popular streaming platforms and music
                    libraries.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground flex items-center justify-center">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to Amplify Your Streams?
                  </h2>
                  <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                    Join MusicStream today and start creating unforgettable
                    music experiences with your fans.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input
                      className="flex-1"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Button
                      type="submit"
                      className="bg-background text-primary hover:bg-background/90"
                    >
                      Sign Up
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                  <p className="text-xs text-primary-foreground/60">
                    By signing up, you agree to our Terms of Service and Privacy
                    Policy.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500">
            © 2024 MusicStream. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
