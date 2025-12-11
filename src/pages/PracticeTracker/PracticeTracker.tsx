import { useState, useEffect } from 'react';
import { Music, Play, Pause, Square, Clock, Calendar, Target } from 'lucide-react';
import { format } from 'date-fns';

const PracticeTracker = () => {
  const [isPracticing, setIsPracticing] = useState(false);
  const [practiceTime, setPracticeTime] = useState(0);
  const [selectedInstrument, setSelectedInstrument] = useState('Piano');

  useEffect(() => {
    let interval: NodeJS.Timeout;
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
  const instruments = ['Piano', 'Guitar', 'Violin', 'Drums', 'Saxophone'];
  const practiceHistory = [
    { date: new Date(Date.now() - 86400000), duration: 45, instrument: 'Piano' },
    { date: new Date(Date.now() - 172800000), duration: 60, instrument: 'Piano' },
    { date: new Date(Date.now() - 259200000), duration: 30, instrument: 'Guitar' },
  ];

  const weeklyGoal = 300; // minutes
  const weeklyTotal = practiceHistory.reduce((sum, p) => sum + p.duration, 0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Practice Tracker</h1>
        <p className="text-gray-600">Track your daily practice sessions</p>
      </div>

      {/* Practice Timer */}
      <div className="card bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
        <div className="text-center">
          <div className="mb-6">
            <label className="block text-sm opacity-90 mb-2">Select Instrument</label>
            <select
              value={selectedInstrument}
              onChange={(e) => setSelectedInstrument(e.target.value)}
              className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              {instruments.map((inst) => (
                <option key={inst} value={inst} className="text-gray-900">
                  {inst}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-8">
            <div className="text-6xl font-bold mb-2">{formatTime(practiceTime)}</div>
            <p className="text-lg opacity-90">Current Session</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            {!isPracticing ? (
              <button
                onClick={() => setIsPracticing(true)}
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Start Practice
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsPracticing(false)}
                  className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center gap-2"
                >
                  <Pause className="w-5 h-5" />
                  Pause
                </button>
                <button
                  onClick={() => {
                    setIsPracticing(false);
                    setPracticeTime(0);
                  }}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <Square className="w-5 h-5" />
                  Stop
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Weekly Goal</h2>
          <Target className="w-5 h-5 text-primary-600" />
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>{weeklyTotal} / {weeklyGoal} minutes</span>
            <span>{Math.round((weeklyTotal / weeklyGoal) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-primary-600 h-3 rounded-full transition-all"
              style={{ width: `${Math.min((weeklyTotal / weeklyGoal) * 100, 100)}%` }}
            />
          </div>
        </div>
        <p className="text-sm text-gray-600">
          {weeklyGoal - weeklyTotal > 0
            ? `${weeklyGoal - weeklyTotal} minutes remaining this week`
            : 'Goal achieved! 🎉'}
        </p>
      </div>

      {/* Practice History */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Practice History</h2>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          {practiceHistory.map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Music className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{session.instrument}</p>
                  <p className="text-sm text-gray-600">{format(session.date, 'MMM d, yyyy')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary-600">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{session.duration} min</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeTracker;

