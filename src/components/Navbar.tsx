import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/principal" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              LogicKids
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/principal"
              className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Inicio
            </Link>
            <Link
              to="/archivos"
              className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Archivos
            </Link>
            <Link
              to="/login"
              className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-primary to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Registrarse
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-foreground hover:bg-secondary focus:outline-none"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col space-y-2">
              <Link
                to="/principal"
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
              >
                Inicio
              </Link>
              <Link
                to="/archivos"
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
              >
                Archivos
              </Link>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="bg-gradient-to-r from-primary to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-center"
              >
                Registrarse
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}