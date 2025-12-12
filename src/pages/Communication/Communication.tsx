import { useState } from 'react';
import { MessageSquare, Search, Plus, Bell, Users, X, Send, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import BackButton from '@/components/BackButton';
import toast from 'react-hot-toast';

const Communication = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'messages' | 'announcements' | 'forums'>('messages');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');
  const [announcementPriority, setAnnouncementPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const canPostAnnouncements = user?.role === 'admin' || user?.role === 'teacher';

  // Mock data
  const messages = [
    {
      id: '1',
      from: 'Sarah Mkhize',
      subject: 'Piano Lesson Schedule Change',
      content: 'Hi, I need to reschedule our lesson this week...',
      read: false,
      sentAt: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      from: 'John Doe',
      subject: 'Music Theory Assignment Feedback',
      content: 'Great work on your last assignment!',
      read: true,
      sentAt: new Date(Date.now() - 86400000),
    },
  ];

  const [announcements, setAnnouncements] = useState<Array<{
    id: string;
    title: string;
    content: string;
    author: string;
    authorId: string;
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
  }>>([
    {
      id: '1',
      title: 'Upcoming Recital - Save the Date!',
      content: 'Our annual spring recital will be held on Saturday, May 15th at 2:00 PM. All students are encouraged to participate. Please prepare your pieces and submit your participation forms by April 30th.',
      author: 'Admin',
      authorId: 'admin-1',
      priority: 'high',
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      id: '2',
      title: 'New Sheet Music Library Available',
      content: 'We\'ve added 50 new pieces to the library including classical, jazz, and contemporary selections. Students can now access these through the Sheet Music section.',
      author: 'Admin',
      authorId: 'admin-1',
      priority: 'medium',
      createdAt: new Date(Date.now() - 172800000),
    },
    {
      id: '3',
      title: 'Theory Class Schedule Update',
      content: 'Please note that theory classes will be held on Saturdays from 9:00 AM to 11:00 AM. Make sure to bring your theory books and completed assignments.',
      author: 'Sarah Mkhize',
      authorId: 'teacher-1',
      priority: 'medium',
      createdAt: new Date(Date.now() - 259200000),
    },
  ]);

  const forumPosts = [
    {
      id: '1',
      title: 'Tips for Practicing Scales',
      author: 'Thabo Ndlovu',
      replies: 5,
      lastActivity: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      title: 'Best Piano Pieces for Beginners',
      author: 'Zanele Mthembu',
      replies: 12,
      lastActivity: new Date(Date.now() - 86400000),
    },
  ];

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!announcementTitle.trim() || !announcementContent.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newAnnouncement = {
      id: Date.now().toString(),
      title: announcementTitle,
      content: announcementContent,
      author: `${user?.firstName} ${user?.lastName}`,
      authorId: user?.id || '',
      priority: announcementPriority,
      createdAt: new Date(),
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    toast.success('Announcement posted successfully!');
    
    // Reset form
    setShowAnnouncementForm(false);
    setAnnouncementTitle('');
    setAnnouncementContent('');
    setAnnouncementPriority('medium');
  };

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <BackButton />
          <h1 className="text-3xl font-display font-bold text-gray-900 mt-2 mb-2">Communication</h1>
          <p className="text-gray-600">Messages, announcements, and forums</p>
        </div>
        <div className="flex gap-2">
          {canPostAnnouncements && activeTab === 'announcements' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAnnouncementForm(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Post Announcement
            </motion.button>
          )}
          {activeTab === 'messages' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Message
            </motion.button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex border-b border-gray-200 -mx-6 -mt-6 px-6">
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'messages'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Messages
              {messages.filter(m => !m.read).length > 0 && (
                <span className="badge bg-red-100 text-red-700">
                  {messages.filter(m => !m.read).length}
                </span>
              )}
            </div>
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'announcements'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Announcements
              <span className="badge bg-primary-100 text-primary-700">
                {announcements.length}
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('forums')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'forums'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Forums
            </div>
          </button>
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
      </motion.div>

      {/* Announcement Form */}
      {showAnnouncementForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card border-2 border-primary-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Post New Announcement</h2>
            <button
              onClick={() => setShowAnnouncementForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handlePostAnnouncement} className="space-y-4">
            <div>
              <label htmlFor="announcementTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="announcementTitle"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
                className="input-field"
                placeholder="Enter announcement title..."
                required
              />
            </div>
            <div>
              <label htmlFor="announcementContent" className="block text-sm font-medium text-gray-700 mb-1">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="announcementContent"
                value={announcementContent}
                onChange={(e) => setAnnouncementContent(e.target.value)}
                rows={6}
                className="input-field"
                placeholder="Enter announcement content... (This will be visible to all students)"
                required
              />
            </div>
            <div>
              <label htmlFor="announcementPriority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="announcementPriority"
                value={announcementPriority}
                onChange={(e) => setAnnouncementPriority(e.target.value as typeof announcementPriority)}
                className="input-field"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex gap-3">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-2 flex-1"
              >
                <Send className="w-5 h-5" />
                Post Announcement
              </motion.button>
              <button
                type="button"
                onClick={() => setShowAnnouncementForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Content */}
      <div className="card">
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 border rounded-lg cursor-pointer hover:border-primary-300 transition-colors ${
                  !message.read ? 'border-primary-200 bg-primary-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{message.from}</p>
                    <p className="text-sm text-gray-600">{message.subject}</p>
                  </div>
                  {!message.read && (
                    <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{message.content}</p>
                <p className="text-xs text-gray-500">{format(message.sentAt, 'MMM d, yyyy • h:mm a')}</p>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="space-y-4">
            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 border rounded-lg ${
                    announcement.priority === 'high'
                      ? 'border-red-200 bg-red-50'
                      : announcement.priority === 'medium'
                      ? 'border-yellow-200 bg-yellow-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                    <div className="flex items-center gap-2">
                      {announcement.priority === 'high' && (
                        <span className="badge bg-red-100 text-red-700 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          High Priority
                        </span>
                      )}
                      {announcement.priority === 'medium' && (
                        <span className="badge bg-yellow-100 text-yellow-700">Medium Priority</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 whitespace-pre-wrap">{announcement.content}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>By {announcement.author}</span>
                    <span>{format(announcement.createdAt, 'MMM d, yyyy • h:mm a')}</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No announcements found</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'forums' && (
          <div className="space-y-4">
            {forumPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>By {post.author}</span>
                  <div className="flex items-center gap-4">
                    <span>{post.replies} replies</span>
                    <span>{format(post.lastActivity, 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Communication;
