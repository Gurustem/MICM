import { useState } from 'react';
import { FaBars, FaBell, FaSearch, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 focus-visible-ring transition-colors"
            aria-label="Toggle menu"
          >
            <FaBars className="w-5 h-5 text-gray-600" />
          </motion.button>
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md"
            >
              <span className="text-white font-bold text-lg">♪</span>
            </motion.div>
            <h1 className="text-xl font-display font-semibold gradient-text hidden sm:block">
              MICM LMS
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search - hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5 min-w-[300px] border border-gray-100 hover:border-gray-200 transition-colors group"
          >
            <FaSearch className="w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search courses, students..."
              className="bg-transparent border-none outline-none text-sm flex-1 placeholder-gray-400"
            />
          </motion.div>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 rounded-xl hover:bg-gray-100 focus-visible-ring relative transition-colors"
            aria-label="Notifications"
          >
            <FaBell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-gradient-to-r from-red-400 to-red-500 rounded-full border-2 border-white"></span>
          </motion.button>

          {/* User Menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-100 focus-visible-ring transition-colors"
              aria-label="User menu"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.firstName}
                  className="w-9 h-9 rounded-xl border-2 border-gray-100"
                />
              ) : (
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-sm">
                  <FaUser className="w-4 h-4 text-white" />
                </div>
              )}
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user?.firstName} {user?.lastName}
              </span>
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20 overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2.5 transition-colors"
                    >
                      <FaUser className="w-4 h-4 text-gray-500" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/settings');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2.5 transition-colors"
                    >
                      <FaCog className="w-4 h-4 text-gray-500" />
                      <span>Settings</span>
                    </button>
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-red-50 flex items-center gap-2.5 transition-colors text-red-600"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
