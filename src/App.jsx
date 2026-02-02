import { useState, useEffect } from 'react';

export default function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('efe-pro-notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('efe-pro-notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (input.trim().length === 0) return;
    const newNote = {
      id: Date.now(),
      text: input,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('tr-TR')
    };
    setNotes([newNote, ...notes]);
    setInput('');
  };

  const deleteNote = (id) => setNotes(notes.filter(n => n.id !== id));

  return (
    <div className="min-h-screen bg-black p-4 sm:p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <header className="flex flex-col items-center mb-12">
          <h1 className="text-5xl font-black text-purple-600 tracking-tighter mb-2 italic">EFE NOTES</h1>
          <div className="h-1 w-20 bg-purple-600 rounded-full mb-4"></div>
          <p className="text-gray-500 font-medium tracking-widest text-xs">VERSION 2026 PRO</p>
        </header>

        <div className="relative mb-12 group">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addNote()}
            className="w-full bg-neutral-900 border-2 border-neutral-800 rounded-2xl p-5 pr-16 focus:border-purple-600 outline-none transition-all text-lg shadow-2xl"
            placeholder="Aklındakileri buraya dök Efe..."
          />
          <button 
            onClick={addNote}
            className="absolute right-3 top-3 bottom-3 bg-purple-600 hover:bg-purple-500 text-white px-5 rounded-xl font-bold transition-all active:scale-90"
          >
            EKLE
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.length === 0 && (
            <p className="col-span-full text-center text-neutral-700 mt-10 italic">Henüz bir notun yok, haydi başla!</p>
          )}
          {notes.map(note => (
            <div key={note.id} className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl hover:border-purple-600/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-600 opacity-0 group-hover:opacity-100 transition-all"></div>
              <p className="text-neutral-200 leading-relaxed mb-4 text-lg">{note.text}</p>
              <div className="flex justify-between items-end">
                <div className="text-[10px] text-neutral-600 uppercase tracking-widest">
                  {note.date} — {note.time}
                </div>
                <button 
                  onClick={() => deleteNote(note.id)}
                  className="text-neutral-700 hover:text-red-500 transition-colors font-bold text-xs"
                >
                  SİL
                </button>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-20 text-center border-t border-neutral-900 pt-8">
          <p className="text-neutral-600 text-sm font-semibold tracking-tighter">
            Purpleguy © 2026 - tablet power
          </p>
        </footer>
      </div>
    </div>
  );
}
