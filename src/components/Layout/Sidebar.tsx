import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaBook,
  FaMusic,
  FaClipboardList,
  FaComments,
  FaChartBar,
  FaFileAlt,
  FaUsers,
  FaCog,
  FaCalendarAlt,
  FaTimes,
} from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color?: string;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { user } = useAuth();

  const studentNavItems: NavItem[] = [
    { path: '/dashboard', icon: FaHome, label: 'Dashboard', color: 'from-blue-500 to-blue-600' },
    { path: '/courses', icon: FaBook, label: 'My Courses', color: 'from-teal-500 to-teal-600' },
    { path: '/practice', icon: FaMusic, label: 'Practice Tracker', color: 'from-purple-500 to-purple-600' },
    { path: '/assessments', icon: FaClipboardList, label: 'Assignments', color: 'from-orange-500 to-orange-600' },
    { path: '/sheet-music', icon: FaFileAlt, label: 'Sheet Music', color: 'from-pink-500 to-pink-600' },
    { path: '/inventory', icon: FaMusic, label: 'Borrow Instruments', color: 'from-indigo-500 to-indigo-600' },
    { path: '/communication', icon: FaComments, label: 'Messages', color: 'from-cyan-500 to-cyan-600' },
  ];

  const teacherNavItems: NavItem[] = [
    { path: '/dashboard', icon: FaHome, label: 'Dashboard', color: 'from-blue-500 to-blue-600' },
    { path: '/courses', icon: FaBook, label: 'Courses', color: 'from-teal-500 to-teal-600' },
    { path: '/assessments', icon: FaClipboardList, label: 'Assessments', color: 'from-orange-500 to-orange-600' },
    { path: '/inventory', icon: FaMusic, label: 'Inventory', color: 'from-indigo-500 to-indigo-600' },
    { path: '/analytics', icon: FaChartBar, label: 'Analytics', color: 'from-green-500 to-green-600' },
    { path: '/reports', icon: FaFileAlt, label: 'Reports', color: 'from-amber-500 to-amber-600' },
    { path: '/communication', icon: FaComments, label: 'Messages', color: 'from-cyan-500 to-cyan-600' },
    { path: '/users', icon: FaUsers, label: 'Students', color: 'from-violet-500 to-violet-600' },
    { path: '/leave', icon: FaCalendarAlt, label: 'Leave Management', color: 'from-rose-500 to-rose-600' },
  ];

  const adminNavItems: NavItem[] = [
    ...teacherNavItems,
    { path: '/settings', icon: FaCog, label: 'Settings', color: 'from-gray-500 to-gray-600' },
  ];

  const getNavItems = () => {
    if (user?.role === 'admin') return adminNavItems;
    if (user?.role === 'teacher') return teacherNavItems;
    return studentNavItems;
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -280,
        }}
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white/80 backdrop-blur-md border-r border-gray-100
          flex flex-col shadow-xl lg:shadow-none
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">♪</span>
            </div>
            <h2 className="font-display font-semibold gradient-text">MICM LMS</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <FaTimes className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-50 to-teal-50 text-blue-700 font-medium shadow-sm border border-blue-100'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div
                          className={`icon-wrapper w-10 h-10 flex-shrink-0 ${
                            isActive
                              ? `bg-gradient-to-br ${item.color || 'from-blue-500 to-teal-500'} shadow-md`
                              : 'bg-gray-100 group-hover:bg-gray-200'
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-900'
                            } transition-colors`}
                          />
                        </div>
                        <span className="flex-1">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
              <span className="text-white font-medium text-sm">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
            </div>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
