import React, { useState, useEffect } from 'react';
import { PROGRAMS } from './constants';
import { Program, Gear, Category } from './types';
import { Sparkles, Camera, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>(PROGRAMS);
  const [selectedGear, setSelectedGear] = useState<Gear | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [generating, setGenerating] = useState(false);
  const [location, setLocation] = useState('Les Sables-d\'Olonne');

  const apiKey = process.env.LUMINASHOT_API_KEY;

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation(
          `Vendée (${pos.coords.latitude.toFixed(2)}° / ${pos.coords.longitude.toFixed(2)}°)`
        ),
      () => {}
    );
  }, []);

  const filteredPrograms = programs.filter(
    (p) =>
      (selectedGear === 'all' || p.gearRequired.includes(selectedGear as Gear)) &&
      (selectedCategory === 'all' || p.category === selectedCategory)
  );

  const cleanJsonFromModel = (text: string): string => {
    // enlève ```json ``` et le blabla autour
    let s = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const firstBrace = s.indexOf('{');
    const lastBrace = s.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      s = s.slice(firstBrace, lastBrace + 1);
    }
    return s.trim();
  };

  const generateCustomProgram = async () => {
    if (!apiKey) {
      alert('❌ LUMINASHOT_API_KEY manquante dans .env.local');
      return;
    }

    setGenerating(true);
    try {
      const prompt = `Tu es un assistant vidéo.
Retourne UNIQUEMENT un JSON valide (pas de texte autour, pas de markdown).

Exemple de format :
{
  "id": "custom-1",
  "title": "Plage Crépuscule Vendée",
  "description": "Shots automnales côtières",
  "category": "Cinématique",
  "duration": "2h",
  "gearRequired": ["Canon EOS R50","DJI Mini 3","Honor Magic 6 Pro"],
  "coverImage": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
  "shots": [
    {
      "id": "s1",
      "title": "Drone survol plage",
      "description": "Reveal du paysage côtier au coucher de soleil",
      "icon": "🛸",
      "settings": {
        "gear": "DJI Mini 3",
        "focalLength": "24mm",
        "aperture": "f/2.8",
        "shutter": "1/50s",
        "fps": "24fps",
        "iso": "100",
        "mode": "D-Cinelike",
        "composition": "règle des tiers"
      }
    }
  ]
}

Maintenant génère un nouveau programme adapté à : ${location}
Respecte exactement la structure JSON ci-dessus.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        console.error('OpenAI error:', err);
        throw new Error(err.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const raw = data.choices[0].message.content as string;
      const cleaned = cleanJsonFromModel(raw);
      const newProgram: Program = JSON.parse(cleaned);

      setPrograms((prev) => [newProgram, ...prev]);
      alert(`✅ Programme "${newProgram.title}" généré !`);
    } catch (e: any) {
      console.error('Erreur OpenAI:', e);
      alert(`Erreur OpenAI: ${e.message || e}`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            Lumina Shot Planner
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-6 max-w-2xl mx-auto">
            Plans IA pour Canon R50 • Honor Magic 6 Pro • DJI Mini 3
          </p>
          <div className="text-lg opacity-80 flex items-center justify-center gap-2 bg-slate-800/50 px-6 py-3 rounded-full max-w-max mx-auto">
            <MapPin className="w-5 h-5" />
            <span>{location}</span>
          </div>
        </header>

        {/* Filtres + bouton IA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 p-6 bg-slate-800/30 backdrop-blur-xl rounded-3xl border border-slate-700/50">
          <select
            value={selectedGear}
            onChange={(e) => setSelectedGear(e.target.value as Gear | 'all')}
            className="px-6 py-4 bg-slate-800/70 border border-slate-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 text-lg font-medium flex-1 min-w-[200px]"
          >
            <option value="all">🎥 Tous équipements</option>
            <option value="Canon EOS R50">📷 Canon R50</option>
            <option value="Honor Magic 6 Pro">📱 Honor Magic 6 Pro</option>
            <option value="DJI Mini 3">🛸 DJI Mini 3</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
            className="px-6 py-4 bg-slate-800/70 border border-slate-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 text-lg font-medium flex-1 min-w-[200px]"
          >
            <option value="all">🏷️ Toutes catégories</option>
            <option value="Cinématique">🎬 Cinématique</option>
            <option value="Vlog Quotidien">📹 Vlog</option>
            <option value="Photographie">📸 Photo</option>
          </select>

          <button
            onClick={generateCustomProgram}
            disabled={generating}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 min-w-[280px] text-lg"
          >
            <Sparkles className={`w-6 h-6 ${generating ? 'animate-spin' : ''}`} />
            {generating ? '⚡ IA génère...' : '✨ Nouveau plan IA'}
          </button>
        </div>

        {/* Cartes programmes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="group bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 border border-slate-700/50 hover:border-purple-500/70 hover:bg-slate-800/70 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-3 overflow-hidden"
            >
              <div className="relative h-48 mb-6 overflow-hidden rounded-2xl group-hover:scale-[1.02] transition-transform duration-500">
                <img
                  src={program.coverImage}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <h3 className="text-2xl font-black mb-4 text-white line-clamp-2 leading-tight">
                {program.title}
              </h3>

              <p className="text-slate-300 mb-6 text-lg leading-relaxed line-clamp-3">
                {program.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-2xl text-sm font-semibold border border-purple-500/40">
                  {program.category}
                </span>
                <span className="px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-2xl text-sm font-semibold border border-emerald-500/40">
                  {program.duration}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {program.gearRequired.map((gear) => (
                  <span
                    key={gear}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-blue-200 rounded-xl text-sm font-semibold border border-blue-500/50 backdrop-blur-sm"
                  >
                    {gear.split(' ').slice(-2).join(' ')}
                  </span>
                ))}
              </div>

              <div className="space-y-3 mb-8">
                {program.shots.slice(0, 4).map((shot) => (
                  <div
                    key={shot.id}
                    className="flex items-start gap-4 p-4 bg-slate-700/50 rounded-2xl hover:bg-slate-700/70 transition-colors group/shot"
                  >
                    <span className="text-2xl flex-shrink-0 mt-1">{shot.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-white text-base mb-1 truncate">
                        {shot.title}
                      </div>
                      <div className="text-slate-400 text-sm line-clamp-2">
                        {shot.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-700/50 flex justify-between items-center text-sm opacity-75">
                <span>{program.shots.length} plans</span>
                <span className="text-purple-400 font-semibold">
                  {program.gearRequired.length} équipements
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-32">
            <Camera className="w-24 h-24 text-slate-600 mx-auto mb-8 opacity-50" />
            <h3 className="text-3xl font-bold text-slate-400 mb-4">Aucun programme</h3>
            <p className="text-xl text-slate-500 max-w-md mx-auto">
              Ajuste les filtres ou génère ton premier plan IA !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
