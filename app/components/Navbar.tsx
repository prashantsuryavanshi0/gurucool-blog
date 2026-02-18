import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-white text-2xl font-bold tracking-wide hover:scale-105 transition"
        >
          ✍️ BlogApp
        </Link>

        {/* Navigation Buttons */}
        <nav className="flex gap-4">

          <Link
            href="/"
            className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition"
          >
            Home
          </Link>

          <Link
            href="/create"
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            + Create
          </Link>

          <Link
            href="/dashboard"
            className="bg-emerald-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-emerald-300 transition"
          >
            Dashboard
          </Link>

        </nav>
      </div>
    </header>
  );
}
