import { useState } from 'react';
import { FileMusic, Search, Download, Eye } from 'lucide-react';

const SheetMusic = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'piano' | 'guitar' | 'violin' | 'ensemble'>('all');

  // Mock data
  const sheetMusic = [
    {
      id: '1',
      title: 'Für Elise',
      composer: 'Ludwig van Beethoven',
      instrument: 'piano',
      difficulty: 'intermediate',
      pages: 3,
    },
    {
      id: '2',
      title: 'Canon in D',
      composer: 'Johann Pachelbel',
      instrument: 'piano',
      difficulty: 'beginner',
      pages: 2,
    },
    {
      id: '3',
      title: 'Stairway to Heaven',
      composer: 'Led Zeppelin',
      instrument: 'guitar',
      difficulty: 'advanced',
      pages: 5,
    },
    {
      id: '4',
      title: 'Spring from The Four Seasons',
      composer: 'Antonio Vivaldi',
      instrument: 'violin',
      difficulty: 'advanced',
      pages: 8,
    },
  ];

  const filteredMusic = sheetMusic.filter((music) => {
    const matchesSearch = music.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      music.composer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || music.instrument === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Sheet Music Library</h1>
        <p className="text-gray-600">Browse and download sheet music</p>
      </div>

      {/* Search and Filters */}
      <div className="card">
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
      </div>

      {/* Sheet Music Grid */}
      {filteredMusic.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMusic.map((music) => (
            <div
              key={music.id}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <FileMusic className="w-6 h-6 text-primary-600" />
                </div>
                <span className="badge bg-gray-100 text-gray-700 capitalize">
                  {music.difficulty}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{music.title}</h3>
              <p className="text-sm text-gray-600 mb-3">by {music.composer}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="capitalize">{music.instrument}</span>
                <span>•</span>
                <span>{music.pages} pages</span>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary flex-1 text-sm flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="btn-primary flex-1 text-sm flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <FileMusic className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No sheet music found</p>
        </div>
      )}
    </div>
  );
};

export default SheetMusic;

