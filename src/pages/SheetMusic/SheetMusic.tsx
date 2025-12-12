import { useState } from 'react';
import { FileMusic, Search, Download, Eye, Star, Filter, Music2, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import BackButton from '@/components/BackButton';

const SheetMusic = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'piano' | 'guitar' | 'violin' | 'ensemble'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'difficulty'>('recent');

  // Mock data
  const sheetMusic = [
    {
      id: '1',
      title: 'Für Elise',
      composer: 'Ludwig van Beethoven',
      instrument: 'piano',
      difficulty: 'intermediate',
      pages: 3,
      downloads: 245,
      rating: 4.8,
      addedDate: new Date(Date.now() - 86400000 * 5),
      category: 'classical',
    },
    {
      id: '2',
      title: 'Canon in D',
      composer: 'Johann Pachelbel',
      instrument: 'piano',
      difficulty: 'beginner',
      pages: 2,
      downloads: 189,
      rating: 4.9,
      addedDate: new Date(Date.now() - 86400000 * 10),
      category: 'classical',
    },
    {
      id: '3',
      title: 'Stairway to Heaven',
      composer: 'Led Zeppelin',
      instrument: 'guitar',
      difficulty: 'advanced',
      pages: 5,
      downloads: 312,
      rating: 4.7,
      addedDate: new Date(Date.now() - 86400000 * 2),
      category: 'rock',
    },
    {
      id: '4',
      title: 'Spring from The Four Seasons',
      composer: 'Antonio Vivaldi',
      instrument: 'violin',
      difficulty: 'advanced',
      pages: 8,
      downloads: 156,
      rating: 4.6,
      addedDate: new Date(Date.now() - 86400000 * 15),
      category: 'classical',
    },
    {
      id: '5',
      title: 'Clair de Lune',
      composer: 'Claude Debussy',
      instrument: 'piano',
      difficulty: 'advanced',
      pages: 4,
      downloads: 278,
      rating: 4.9,
      addedDate: new Date(Date.now() - 86400000 * 3),
      category: 'classical',
    },
    {
      id: '6',
      title: 'Jazz Ensemble Collection',
      composer: 'Various Artists',
      instrument: 'ensemble',
      difficulty: 'intermediate',
      pages: 12,
      downloads: 98,
      rating: 4.5,
      addedDate: new Date(Date.now() - 86400000 * 7),
      category: 'jazz',
    },
  ];

  const filteredMusic = sheetMusic.filter((music) => {
    const matchesSearch = music.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      music.composer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || music.instrument === filter;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.downloads - a.downloads;
    if (sortBy === 'difficulty') {
      const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
      return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
    }
    return b.addedDate.getTime() - a.addedDate.getTime();
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton />
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Sheet Music Library</h1>
          <p className="text-gray-600">Browse and download sheet music from our collection</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <FileMusic className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Pieces</p>
              <p className="text-xl font-bold text-gray-900">{sheetMusic.length}</p>
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
              <Download className="w-6 h-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Downloads</p>
              <p className="text-xl font-bold text-gray-900">
                {sheetMusic.reduce((sum, m) => sum + m.downloads, 0)}
              </p>
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
              <Star className="w-6 h-6 text-accent-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Rating</p>
              <p className="text-xl font-bold text-gray-900">
                {(sheetMusic.reduce((sum, m) => sum + m.rating, 0) / sheetMusic.length).toFixed(1)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or composer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="input-field"
            >
              <option value="all">All Instruments</option>
              <option value="piano">Piano</option>
              <option value="guitar">Guitar</option>
              <option value="violin">Violin</option>
              <option value="ensemble">Ensemble</option>
            </select>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="input-field"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="difficulty">Difficulty</option>
          </select>
        </div>
      </motion.div>

      {/* Sheet Music Grid */}
      {filteredMusic.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMusic.map((music, index) => (
            <motion.div
              key={music.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="card hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors"
                >
                  <FileMusic className="w-7 h-7 text-primary-600" />
                </motion.div>
                <span className={`badge ${getDifficultyColor(music.difficulty)} capitalize`}>
                  {music.difficulty}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{music.title}</h3>
              <p className="text-sm text-gray-600 mb-3">by {music.composer}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <Music2 className="w-4 h-4" />
                  <span className="capitalize">{music.instrument}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {music.pages} pages
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">{music.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Download className="w-4 h-4" />
                  {music.downloads}
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex-1 text-sm flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex-1 text-sm flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card text-center py-12"
        >
          <FileMusic className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No sheet music found</p>
        </motion.div>
      )}
    </div>
  );
};

export default SheetMusic;
