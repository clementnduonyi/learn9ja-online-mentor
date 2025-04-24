
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-learn9ja-green/5 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-learn9ja-green">Learn9ja</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              Connecting Nigerian students with qualified teachers for personalized online learning experiences.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">For Students</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-gray-600 hover:text-learn9ja-green">Find Teachers</Link></li>
              <li><Link to="/pricing" className="text-sm text-gray-600 hover:text-learn9ja-green">Pricing</Link></li>
              <li><Link to="/" className="text-sm text-gray-600 hover:text-learn9ja-green">How It Works</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">For Teachers</h3>
            <ul className="space-y-3">
              <li><Link to="/signup" className="text-sm text-gray-600 hover:text-learn9ja-green">Become a Teacher</Link></li>
              <li><Link to="/pricing" className="text-sm text-gray-600 hover:text-learn9ja-green">Premium Benefits</Link></li>
              <li><Link to="/" className="text-sm text-gray-600 hover:text-learn9ja-green">Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-gray-600 hover:text-learn9ja-green">About Us</Link></li>
              <li><Link to="/" className="text-sm text-gray-600 hover:text-learn9ja-green">Contact</Link></li>
              <li><Link to="/" className="text-sm text-gray-600 hover:text-learn9ja-green">Terms of Service</Link></li>
              <li><Link to="/" className="text-sm text-gray-600 hover:text-learn9ja-green">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-sm text-center text-gray-600">
            © {new Date().getFullYear()} Learn9ja. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
