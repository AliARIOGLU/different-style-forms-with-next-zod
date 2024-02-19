import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`h-screen flex items-center justify-center ${inter.className}`}
    >
      <div className="flex items-center space-x-4">
        <div className="group">
          <p className="text-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Go to
          </p>
          <Link
            className="px-2 py-1.5 bg-slate-300 rounded text-slate-800 font-bold"
            href="/basic-form"
          >
            Basic Form
          </Link>
        </div>
        <div className="group">
          <p className="text-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Go to
          </p>
          <Link
            className="px-2 py-1.5 bg-slate-300 rounded text-slate-800 font-bold"
            href="/password-validation"
          >
            Password Validation
          </Link>
        </div>
        <div className="group">
          <p className="text-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Go to
          </p>
          <Link
            className="px-2 py-1.5 bg-slate-300 rounded text-slate-800 font-bold"
            href="/multi-step-form"
          >
            MultiStep Form
          </Link>
        </div>
      </div>
    </main>
  );
}
