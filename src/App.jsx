import { useState, useEffect } from 'react';

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('efe-not-v2');
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('efe-not-v2', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (text.trim()) {
      setNotes([{ id: Date.now(), content: text, completed: false }, ...notes]);
      setText('');
    }
  };

  const toggleComplete = (id) => {
    setNotes(notes.map(n => n.id === id ? { ...n, completed: !n.completed } : n));
  };

  const filteredNotes = notes.filter(n => 
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-gray-100 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-extrabold text-purple-600 mb-8 text-center tracking-tighter">NOTLARIM</h1>
        
        {/* Arama ve Ekleme Alanı */}
        <div className="space-y-4 mb-10">
          <input 
            type="text"
            placeholder="Notlarda ara..."
            className="w-full bg-gray-900 border border-gray-800 p-3 rounded-xl focus:border-purple-500 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2">
            <input 
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addNote()}
              placeholder="Yeni bir şeyler yaz..."
              className="flex-1 bg-gray-900 border border-purple-900/30 p-4 rounded-xl focus:border-purple-500 outline-none"
            />
            <button onClick={addNote} className="bg-purple-600 hover:bg-purple-500 px-6 rounded-xl font-bold transition-transform active:scale-95">
              EKLE
            </button>
          </div>
        </div>

        {/* Not Listesi */}
        <div className="grid gap-3">
          {filteredNotes.map(note => (
            <div 
              key={note.id} 
              className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
                note.completed ? 'bg-gray-900/30 border-gray-800 opacity-50' : 'bg-gray-900 border-purple-900/20'
              }`}
            >
              <span 
                onClick={() => toggleComplete(note.id)}
                className={`flex-1 cursor-pointer ${note.completed ? 'line-through text-gray-600' : 'text-gray-200'}`}
              >
                {note.content}
              </span>
              <button 
                onClick={() => setNotes(notes.filter(n => n.id !== note.id))}
                className="text-gray-600 hover:text-red-500 ml-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
