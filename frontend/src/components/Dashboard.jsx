import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotes, createNote, deleteNote } from '../lib/api/notes';
import { useState } from 'react';

export default function Dashboard({ user, onLogout }) {
  const queryClient = useQueryClient();
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  // Fetch Notes
  const { data: notes, isLoading, isError } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  });

  // Create Note Mutation
  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
      setNewNote({ title: '', content: '' });
    },
  });

  // Delete Note Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newNote.title || !newNote.content) return;
    createMutation.mutate(newNote);
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading notes...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Keepify</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Hi, {user?.name}</span>
          <button 
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Add Note Form */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-sm mb-12">
        <input
          type="text"
          placeholder="Title"
          className="w-full mb-3 p-2 font-semibold text-lg focus:outline-none"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Take a note..."
          className="w-full p-2 focus:outline-none resize-none"
          rows="3"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <div className="flex justify-end mt-4">
          <button 
            type="submit"
            disabled={createMutation.isLoading}
            className="px-6 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 disabled:bg-orange-300"
          >
            {createMutation.isLoading ? 'Adding...' : 'Add Note'}
          </button>
        </div>
      </form>

      {/* Notes Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes?.map((note) => (
          <div key={note._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition group">
            <h3 className="font-bold text-lg mb-2">{note.title}</h3>
            <p className="text-gray-600 whitespace-pre-wrap mb-4">{note.content}</p>
            <div className="flex justify-end opacity-0 group-hover:opacity-100 transition">
              <button 
                onClick={() => deleteMutation.mutate(note._id)}
                className="text-red-500 hover:text-red-700 text-sm font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {isError && <p className="text-center text-red-500 mt-4">Failed to load notes.</p>}
    </div>
  );
}
