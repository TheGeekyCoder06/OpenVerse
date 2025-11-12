export default function Footer() {
  return (
    <footer className="w-full py-6 text-center text-gray-500 text-sm border-t border-gray-200">
      © {new Date().getFullYear()} <span className="font-semibold text-gray-700">Open Verse</span>. All rights reserved.
    </footer>
  );
}
