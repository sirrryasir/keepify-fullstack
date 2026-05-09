import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import NoteInput from "./components/NoteInput";
import NoteCard from "./components/NoteCard";
import NoteEditor from "./components/NoteEditor";
import Auth from "./components/Auth";
import {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} from "./lib/api/notes.js";

function App() {
  const queryClient = useQueryClient();
  const [editingNote, setEditingNote] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  // TanStack Query: Fetch Notes
  const { data: notes = [], isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    enabled: !!token,
  });

  // Mutations
  const addMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  const removeMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  const editMutation = useMutation({
    mutationFn: ({ id, noteData }) => updateNote({ id, ...noteData }),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      setEditingNote(null);
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  if (!token) {
    return <Auth onLoginSuccess={(data) => {
      setToken(data.token);
      setUser(data);
    }} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Header */}
      <header className="w-full max-w-4xl flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img src="/favicon.svg" alt="Keepify Logo" className="w-12 h-12 mr-3" />
          <h1 className="text-2xl font-bold text-orange-600">Keepify</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 font-medium">Hello, {user?.name}</span>
          <button 
            onClick={handleLogout}
            className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <NoteInput onAdd={(noteData) => addMutation.mutate(noteData)} />

      <main className="w-full max-w-5xl mt-8">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading notes...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {!notes.length && (
              <p className="text-center col-span-full text-gray-500">
                No notes available. Start by adding a new note!
              </p>
            )}

            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={() => removeMutation.mutate(note._id)}
                onEdit={() => setEditingNote(note)}
              />
            ))}
          </div>
        )}

        {editingNote && (
          <NoteEditor
            note={editingNote}
            onSave={(id, noteData) => editMutation.mutate({ id, noteData })}
            onClose={() => setEditingNote(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;