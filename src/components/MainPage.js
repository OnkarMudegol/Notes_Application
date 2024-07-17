// MainPage.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MainPage.css";

function MainPage({ logout }) {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newNote, setNewNote] = useState("");
  const [showNewNote, setShowNewNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const username = localStorage.getItem("username") || "Nitesh";

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://takenotes123backend.onrender.com/api/notes",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const addNote = async () => {
    if (newNote.trim()) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "https://takenotes123backend.onrender.com/api/notes",
          { text: newNote },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNotes([response.data, ...notes]);
        setNewNote("");
        setShowNewNote(false);
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  const updateNote = async (id, text) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://takenotes123backend.onrender.com/api/notes/${id}`,
        { text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes(notes.map(note => note._id === id ? response.data : note));
      setEditingNoteId(null);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://takenotes123backend.onrender.com/api/notes/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleHome = () => {
    setSearchTerm("");
    setShowNewNote(false);
  };

  const handleNewNote = () => {
    setShowNewNote(true);
  };

  return (
    <div className="main-container">
      <aside className="sidebar">
        <div className="logo">✏️</div>
        <nav className="menu">
          <button className="menu-item" title="Home" onClick={handleHome}>
            🏠
          </button>
          <button className="menu-item" title="New Note" onClick={handleNewNote}>
            ➕
          </button>
          <button className="menu-item" title="Logout" onClick={logout}>
            🚪
          </button>
        </nav>
      </aside>
      <main className="content">
        <header className="header">
          <h1>Hello, {username}! 👋</h1>
        </header>
        <div className="search-sort-container">
          <input
            type="text"
            placeholder="🔍 Search Notes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <p className="notes-intro">All your notes are here, in one place!</p>
        <div className="notes-grid">
          {showNewNote && (
            <div className="note new-note">
              <textarea
                placeholder="Type your note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    addNote();
                  }
                }}
              ></textarea>
              <div className="note-footer">
                <span>{formatDate(new Date().toISOString())}</span>
                <button onClick={addNote}>Add Note</button>
              </div>
            </div>
          )}
          {notes
  .filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .map((note) => (
    <div key={note._id} className="note">
      {editingNoteId === note._id ? (
        <textarea
          value={note.text}
          onChange={(e) => setNotes(notes.map(n => n._id === note._id ? {...n, text: e.target.value} : n))}
          onBlur={() => updateNote(note._id, note.text)}
        ></textarea>
      ) : (
        <div className="note-content" onClick={() => setEditingNoteId(note._id)}>
          {note.text}
        </div>
      )}
      <div className="note-footer">
        <span className="note-date">{formatDate(note.date)}</span>
        <div className="note-actions">
          <button onClick={() => setEditingNoteId(note._id)} className="edit-btn">✏️</button>
          <button onClick={() => deleteNote(note._id)} className="delete-btn">🗑️</button>
        </div>
      </div>
    </div>
  ))}
        </div>
      </main>
    </div>
  );
}

export default MainPage;