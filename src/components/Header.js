import Link from "next/link";
import React from "react";
import Title from "./Title";

export default function Header() {
  return (
    <div className="min-h-[72px] border-b border-b-[#282e3b] flex items-center">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-yellow-400">
          <Title title="AcademyHub" size="xl" />
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/category/biohacking" className="text-yellow-400">
            Categories
          </Link>
          <Link href="/">Blogs</Link>
          <Link href="/">Teachers</Link>
          <Link href="/">Contact</Link>
          <div className="flex items-center gap-4 ml-4">
            <Link href="/" className="p-4 py-3.5 bg-gray-700 rounded-xl font-bold">
              Register
            </Link>
            <Link href="/" className="p-8 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold">
              Login
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
