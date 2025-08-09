import SideBar from "@/components/SideBar";
import { createNote, getNotesByAuthorId } from "@/services/noteService";
import type { Note } from "@/types/note";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const [list, setList] = useState<Note[]>([]);
  const navigate = useNavigate();
  const handleCreateNote = async () => {
    const res = await createNote({ title: "New Note", content: "" });
    const response = await getNotesByAuthorId();
    setList(response);
    navigate(`/edit-note/${res}`);
  };
  const updateNoteTitle = (id: string, newTitle: string) => {
    setList((prev) =>
      prev.map((note) => (note.id === id ? { ...note, title: newTitle } : note))
    );
  };
  const handleDeleteNote = (id: string) => {
    setList((prev) => prev.filter((note) => note.id !== id));
  };
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getNotesByAuthorId();
        setList(response);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">
      <SideBar
        list={list}
        handleCreateNote={handleCreateNote}
        handleDeleteNote={handleDeleteNote}
      />
      <Outlet context={{ updateNoteTitle }} />
    </div>
  );
};

export default MainLayout;
