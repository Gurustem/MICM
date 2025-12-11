import { Mail, Phone, Calendar, Music, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Edit className="w-5 h-5" />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2 card">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-3xl">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-600 capitalize mb-4">{user?.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{user?.email}</p>
              </div>
            </div>
            {user?.phone && (
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">{user.phone}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="font-medium text-gray-900">
                  {user?.createdAt ? format(user.createdAt, 'MMMM d, yyyy') : 'N/A'}
                </p>
              </div>
            </div>
            {user?.lastLogin && (
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Last Login</p>
                  <p className="font-medium text-gray-900">
                    {format(user.lastLogin, 'MMMM d, yyyy • h:mm a')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-6">
          {user?.role === 'student' && (
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Music className="w-5 h-5 text-primary-600" />
                My Instrument
              </h3>
              <p className="text-gray-600">Piano</p>
            </div>
          )}

          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Account Settings</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-lg">
                Change Password
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-lg">
                Notification Preferences
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-lg text-red-600">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

