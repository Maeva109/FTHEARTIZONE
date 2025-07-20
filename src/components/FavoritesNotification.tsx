import { useState, useEffect } from 'react';
import { Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FavoritesNotificationProps {
  isVisible: boolean;
  onClose: () => void;
}

export const FavoritesNotification = ({ isVisible, onClose }: FavoritesNotificationProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      // Auto-hide after 8 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
      isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
    }`}>
      <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg max-w-md mx-4 flex items-center gap-4">
        {/* Clock icon */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <Clock className="w-4 h-4 text-green-600" />
          </div>
        </div>
        
        {/* Text content */}
        <div className="flex-1">
          <p className="font-medium text-sm">Don't lose this great collection...</p>
          <p className="text-xs opacity-90">Guest favorites are only saved for 7 days.</p>
        </div>
        
        {/* Sign in button */}
        <Button
          asChild
          size="sm"
          className="bg-white text-green-600 hover:bg-gray-100 border border-green-600 px-4 py-1 text-sm font-medium"
        >
          <Link to="/login" onClick={onClose}>
            Sign in
          </Link>
        </Button>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}; 