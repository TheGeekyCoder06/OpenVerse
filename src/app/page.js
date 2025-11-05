import NavbarMenu from "@/components/navbar/page.js";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Navbar */}
      <NavbarMenu />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 py-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Open Verse</h1>
        <p className="text-gray-600 max-w-xl text-center">
          A social blogging platform where you can write, share, and explore amazing stories from writers around the world.
        </p>
      </main>
    </div>
  );
}
