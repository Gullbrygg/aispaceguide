import Link from "next/link";

const aaa: string[] = [];
// import { signup } from "@/app/actions/auth";
export default function Home() {
  return (
    <div className="flex-1 -mx-[calc((100vw-100%)/2)] flex flex-col items-center justify-center bg-bg">
      {/* Main content */}
      <div className="text-center px-6 max-w-3xl mx-auto py-24">
        <div className="inline-flex items-center gap-2 bg-accent-tint text-accent-text text-sm font-medium px-4 py-1.5 rounded-full mb-8 border border-accent-border animate-fade-in-up">
          <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
          Academic collaboration platform
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-fg mb-6 tracking-tight animate-fade-in-up animation-delay-1000">
          GullBrygg
        </h1>
        <p className="text-xl text-muted mb-6 animate-fade-in-up animation-delay-2000">
          Connect. Collaborate. Conquer.
        </p>
        <p className="text-base text-subtle mb-14 animate-fade-in-up animation-delay-2000 max-w-xl mx-auto leading-relaxed">
          The platform for students, teachers, and universities to form study groups,
          share knowledge, and achieve academic excellence together.
        </p>

        {/* Role selection buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-3000">
          <Link
            href="/about/student"
            className="flex items-center gap-2.5 bg-surface border border-border text-fg px-6 py-3.5 rounded-lg font-medium text-sm hover:border-accent hover:text-accent-text hover:shadow-md transition-all duration-200 shadow-sm"
          >
            <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
            </svg>
            I'm a Student
          </Link>

          <Link
            href="/about/teacher"
            className="flex items-center gap-2.5 bg-surface border border-border text-fg px-6 py-3.5 rounded-lg font-medium text-sm hover:border-accent hover:text-accent-text hover:shadow-md transition-all duration-200 shadow-sm"
          >
            <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
            </svg>
            I'm a Teacher
          </Link>

          <Link
            href="/about/university"
            className="flex items-center gap-2.5 bg-accent text-accent-fg px-6 py-3.5 rounded-lg font-medium text-sm hover:bg-accent-hover transition-colors duration-200 shadow-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
            </svg>
            University Rep
          </Link>
        </div>
      </div>
    </div>
  );
}
