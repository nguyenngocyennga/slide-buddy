"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

// -------------------------- Home Component ----------------------------------
// Renders the homepage of Slide Buddy with a hero section, navigation, and feature highlights.
export default function Home() {
  // ------------------------ Hooks and Mutations -----------------------------
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  // ------------------------ Side Effect -------------------------------------
  // On user change, ensure the user is added to the database
  useEffect(() => {
    user && CheckUser();
  }, [user])

  // ------------------------ Helper Functions --------------------------------
  // Checks if the user exists in the database; if not, creates the user
  const CheckUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
      userName: user?.fullName,
    })

    // console.log(result);
  }

  // ------------------------ Component UI ------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-cyan-300 p-8">
    {/* --------------------- Navbar ---------------------------------------- */}
    <nav className="flex items-center justify-between py-6">
      <div className="flex items-center space-x-4">
        <Image
          src="/logo.png"
          alt="Slide Buddy Logo"
          width={150}
          height={50}
          className="cursor-pointer"
        />
      </div>
      <div className="flex items-center space-x-4">
        <UserButton />
        <Link href="/dashboard">
          <Button className="bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-2 px-6 rounded-full shadow-lg">
            Let’s Go! 🚀
          </Button>
        </Link>
      </div>
    </nav>

    {/* --------------------- Main Section ---------------------------------- */}
    <main className="flex flex-col items-center text-center mt-16 space-y-6">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#2c4695] leading-tight">
        Take Notes. Ask Questions. <br />
        <span className="text-blue-500">Review Smarter ✨</span>
      </h1>
      <p className="text-gray-700 text-lg max-w-3xl">
        Slide Buddy is your perfect sidekick for lectures, study sessions, and
        exam prep. Upload slides, ask questions, and let our AI-powered buddy
        help you understand and ace your subjects. 📚
      </p>
      <p className="text-sm text-gray-600 italic">
        🚧 This is our early beta version. Expect a few bumps along the way,
        and we'd love your feedback to make Slide Buddy even better! 💬
      </p>
      <div className="flex space-x-4 mt-8">
        <Link href="/dashboard">
          <Button className="mt-4 px-10 py-6 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white font-semibold rounded-full hover:scale-105 transform transition text-xl">
            Get Started 🎉
          </Button>
        </Link>
      </div>
    </main>

    {/* --------------------- Features Section ------------------------------ */}
    <section className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
      {[
        {
          title: "🏄‍♂️ Lecture-Ready",
          description:
            "Upload slides before class. Let Slide Buddy assist with note-taking while you stay focused.",
        },
        {
          title: "🧠 Exam Prep",
          description:
            "Review key topics, ask for clarifications, and get detailed explanations anytime.",
        },
        {
          title: "🥰 Your Feedback Matters",
          description:
            "Help us improve! Share your thoughts and ideas to make Slide Buddy your ultimate study companion.",
        },
      ].map((feature, index) => (
        <div
          key={index}
          className="group bg-white/40 backdrop-blur-lg p-6 rounded-xl shadow-md transition transform hover:scale-105 hover:bg-white/45 hover:shadow-lg hover:bg-gradient-to-br from-blue-50 to-purple-50"
        >
          <h3 className="text-xl font-semibold  text-[#2c4695] mb-2 ">
            {feature.title}
          </h3>
          <p className="text-gray-700 group-hover:text-gray-800">{feature.description}</p>
        </div>
      ))}
    </section>

    {/* --------------------- Footer Section -------------------------------- */}
    <footer className="mt-12 text-center text-gray-600">
      <p className="text-sm">
        Built with ❤️ by the Slide Buddy team. We’re just getting started—
        stay tuned for more exciting features!
      </p>
    </footer>
  </div>
  );
}
