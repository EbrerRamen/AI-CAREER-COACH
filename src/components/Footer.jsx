export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center py-6 shadow-inner">
            <p className="text-sm opacity-90">
                © {new Date().getFullYear()} <span className="font-semibold">Career<span className="text-yellow-300">AI</span></span> All rights reserved.
            </p>
            <p className="text-xs mt-2 opacity-80">
                Empowering careers with intelligent insights ✨
            </p>
        </footer>
    );
}