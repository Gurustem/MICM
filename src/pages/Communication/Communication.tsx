import { useState } from 'react';
import { MessageSquare, Search, Plus, Bell, Users } from 'lucide-react';
import { format } from 'date-fns';

const Communication = () => {
  const [activeTab, setActiveTab] = useState<'messages' | 'announcements' | 'forums'>('messages');
  const [searchTerm, setSearchTerm] = useState('');

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

  const announcements = [
    {
      id: '1',
      title: 'Upcoming Recital - Save the Date!',
      content: 'Our annual spring recital will be held on...',
      author: 'Admin',
      priority: 'high' as const,
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      id: '2',
      title: 'New Sheet Music Library Available',
      content: 'We\'ve added 50 new pieces to the library...',
      author: 'Admin',
      priority: 'medium' as const,
      createdAt: new Date(Date.now() - 172800000),
    },
  ];

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Communication</h1>
          <p className="text-gray-600">Messages, announcements, and forums</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Message
        </button>
      </div>

      {/* Tabs */}
      <div className="card">
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
      </div>

      {/* Content */}
      <div className="card">
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
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
              </div>
            ))}
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={`p-4 border rounded-lg ${
                  announcement.priority === 'high'
                    ? 'border-red-200 bg-red-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                  {announcement.priority === 'high' && (
                    <span className="badge bg-red-100 text-red-700">High Priority</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>By {announcement.author}</span>
                  <span>{format(announcement.createdAt, 'MMM d, yyyy')}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'forums' && (
          <div className="space-y-4">
            {forumPosts.map((post) => (
              <div
                key={post.id}
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Communication;

