import { useState, useEffect } from 'react';
import { Music, Play, Pause, Square, Clock, Calendar, Target, TrendingUp, Award, Flame, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import BackButton from '@/components/BackButton';

const PracticeTracker = () => {
  const [isPracticing, setIsPracticing] = useState(false);
  const [practiceTime, setPracticeTime] = useState(0);
  const [selectedInstrument, setSelectedInstrument] = useState('Piano');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPracticing) {
      interval = setInterval(() => {
        setPracticeTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPracticing]);

  // Mock data
  const instruments = ['Piano', 'Guitar', 'Violin', 'Drums', 'Saxophone', 'Flute', 'Trumpet'];
  const practiceHistory = [
    { date: new Date(Date.now() - 86400000), duration: 45, instrument: 'Piano', notes: 'Focused on scales' },
    { date: new Date(Date.now() - 172800000), duration: 60, instrument: 'Piano', notes: 'Practiced sonata' },
    { date: new Date(Date.now() - 259200000), duration: 30, instrument: 'Guitar', notes: 'Chord progressions' },
    { date: new Date(Date.now() - 345600000), duration: 50, instrument: 'Piano', notes: 'Technique exercises' },
    { date: new Date(Date.now() - 432000000), duration: 40, instrument: 'Violin', notes: 'Bow technique' },
  ];

  const weeklyGoal = 300; // minutes
  const weeklyTotal = practiceHistory.reduce((sum, p) => sum + p.duration, 0);
  const dailyGoal = 45; // minutes
  const currentStreak = 7;
  const totalPracticeHours = Math.floor(weeklyTotal / 60);
  const totalPracticeMinutes = weeklyTotal % 60;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  const handleStop = () => {
    setIsPracticing(false);
    // In a real app, save the practice session here
    if (practiceTime > 0) {
      console.log(`Practice session: ${formatTime(practiceTime)} on ${selectedInstrument}`);
    }
    setPracticeTime(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton />
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Practice Tracker</h1>
          <p className="text-gray-600">Track your daily practice sessions and build consistency</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-xl font-bold text-gray-900">{formatDuration(weeklyTotal)}</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Weekly Goal</p>
              <p className="text-xl font-bold text-gray-900">{Math.round((weeklyTotal / weeklyGoal) * 100)}%</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
              <Flame className="w-6 h-6 text-accent-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Streak</p>
              <p className="text-xl font-bold text-gray-900">{currentStreak} days</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Hours</p>
              <p className="text-xl font-bold text-gray-900">{totalPracticeHours}h {totalPracticeMinutes}m</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Practice Timer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="card bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative text-center">
          <div className="mb-6">
            <label className="block text-sm opacity-90 mb-2">Select Instrument</label>
            <select
              value={selectedInstrument}
              onChange={(e) => setSelectedInstrument(e.target.value)}
              disabled={isPracticing}
              className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 disabled:opacity-50"
            >
              {instruments.map((inst) => (
                <option key={inst} value={inst} className="text-gray-900">
                  {inst}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-8">
            <motion.div
              animate={isPracticing ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: isPracticing ? Infinity : 0 }}
              className="text-7xl font-bold mb-2 font-mono"
            >
              {formatTime(practiceTime)}
            </motion.div>
            <p className="text-lg opacity-90">Current Session</p>
            <p className="text-sm opacity-75 mt-1">Instrument: {selectedInstrument}</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            {!isPracticing ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPracticing(true)}
                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-opacity-90 transition-colors flex items-center gap-2 shadow-lg"
              >
                <Play className="w-5 h-5" />
                Start Practice
              </motion.button>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPracticing(false)}
                  className="bg-white text-primary-600 px-6 py-4 rounded-xl font-semibold hover:bg-opacity-90 transition-colors flex items-center gap-2 shadow-lg"
                >
                  <Pause className="w-5 h-5" />
                  Pause
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStop}
                  className="bg-red-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center gap-2 shadow-lg"
                >
                  <Square className="w-5 h-5" />
                  Stop & Save
                </motion.button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary-600" />
              Weekly Goal Progress
            </h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>{weeklyTotal} / {weeklyGoal} minutes</span>
              <span className="font-medium">{Math.round((weeklyTotal / weeklyGoal) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((weeklyTotal / weeklyGoal) * 100, 100)}%` }}
                transition={{ duration: 1, delay: 0.4 }}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-4 rounded-full"
              />
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {weeklyGoal - weeklyTotal > 0 ? (
              <span>🎯 {weeklyGoal - weeklyTotal} minutes remaining this week</span>
            ) : (
              <span className="text-green-600 font-medium">🎉 Goal achieved! Great work!</span>
            )}
          </p>
        </motion.div>

        {/* Daily Goal */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-secondary-600" />
              Today's Goal
            </h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Today: {formatDuration(Math.floor(practiceTime / 60))}</span>
              <span className="font-medium">{Math.round((practiceTime / 60 / dailyGoal) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((practiceTime / 60 / dailyGoal) * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-secondary-500 to-accent-500 h-4 rounded-full"
              />
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Target: {dailyGoal} minutes per day
          </p>
        </motion.div>
      </div>

      {/* Practice History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent-600" />
            Practice History
          </h2>
        </div>
        <div className="space-y-3">
          {practiceHistory.map((session, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center"
                >
                  <Music className="w-6 h-6 text-primary-600" />
                </motion.div>
                <div>
                  <p className="font-medium text-gray-900">{session.instrument}</p>
                  <p className="text-sm text-gray-600">{format(session.date, 'MMM d, yyyy • h:mm a')}</p>
                  {session.notes && (
                    <p className="text-xs text-gray-500 mt-1">📝 {session.notes}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary-600">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{session.duration} min</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PracticeTracker;
