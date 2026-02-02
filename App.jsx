import { useState, useEffect } from 'react';

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!input) return;
    setNotes([...notes, { id: Date.now(), text: input }]);
    setInput('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-xl shadow-2xl border border-purple-500">
        <h1 className="text-2xl font-bold mb-4 text-purple-400">Not Defterim</h1>
        <div className="flex gap-2 mb-6">
          <input 
            className="flex-1 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Notunuzu yazın..."
          />
          <button onClick={addNote} className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">Ekle</button>
        </div>
        <ul className="space-y-3">
          {notes.map(note => (
            <li key={note.id} className="flex justify-between bg-gray-800 p-3 rounded border-l-4 border-purple-500">
              {note.text}
              <button onClick={() => deleteNote(note.id)} className="text-red-400 hover:text-red-600">Sil</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

