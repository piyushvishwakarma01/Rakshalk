
import * as React from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";


interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}


const NavLink = ({ to, children }: NavLinkProps) => (
  <Link
    to={to}
    className="text-gray-700 hover:text-primary-600 transition-colors duration-200 px-3 py-2 dark:text-gray-200"
  >
    {children}
  </Link>
);

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                GramRakshak
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/features">Features</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            {/* <LanguageSelector /> */}
            <ThemeToggle />
            <Link
              to="/login"
              className="ml-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 animate-slide-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 transition-colors duration-200"
            >
              Features
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
