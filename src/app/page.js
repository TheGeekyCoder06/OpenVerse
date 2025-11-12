import NavbarMenu from "@/components/navbar/page.js";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer/page";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white via-blue-50 to-blue-100">

      {/* Main Content */}
      <main className="flex flex-col-reverse md:flex-row items-center justify-center flex-1 py-16 px-6 md:px-20 gap-12">
        {/* Text Section */}
        <div className="text-center md:text-left max-w-lg">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
            Welcome to <span className="text-blue-600">Open Verse</span>
          </h1>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            A social blogging platform where you can{" "}
            <span className="font-semibold text-blue-700">write</span>,{" "}
            <span className="font-semibold text-blue-700">share</span>, and{" "}
            <span className="font-semibold text-blue-700">explore</span> inspiring stories from creators around the globe.
          </p>

          {/* Button linking to /write */}
          <Link
            href="/write"
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md inline-block"
          >
            Start Writing
          </Link>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-[450px] h-[300px] relative">
          <Image
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200"
            alt="Open Verse Hero Image"
            fill
            className="rounded-2xl shadow-lg object-cover"
            priority
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
