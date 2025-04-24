
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify, X, User } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const dashboardLink = user?.role === "teacher" 
    ? "/teacher/dashboard" 
    : "/student/dashboard";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <span className="text-2xl font-bold text-learn9ja-green">Learn9ja</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-learn9ja-dark hover:text-learn9ja-green transition-colors">
            Home
          </Link>
          <Link to="/pricing" className="text-learn9ja-dark hover:text-learn9ja-green transition-colors">
            Pricing
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full h-9 w-9 flex items-center justify-center">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user.name || user.email}
                  <p className="text-xs text-muted-foreground mt-1 capitalize">{user.role}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={dashboardLink}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/pricing">Upgrade Plan</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-learn9ja-green hover:bg-learn9ja-green/90" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-learn9ja-dark focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <AlignJustify className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-learn9ja-dark hover:text-learn9ja-green px-2 py-2 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/pricing" 
              className="text-learn9ja-dark hover:text-learn9ja-green px-2 py-2 transition-colors"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            {user ? (
              <>
                <Link 
                  to={dashboardLink} 
                  className="text-learn9ja-dark hover:text-learn9ja-green px-2 py-2 transition-colors"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="text-left text-learn9ja-dark hover:text-learn9ja-green px-2 py-2 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="grid gap-2">
                <Link 
                  to="/login" 
                  className="btn-secondary w-full"
                  onClick={toggleMenu}
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="btn-primary w-full"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
