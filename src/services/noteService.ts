import type { CreateNoteRequest } from "@/types/note";
import axiosClient from "./axiosClient";

export const getNotesByAuthorId = async () => {
  const userId = localStorage.getItem("userId");
  const res = await axiosClient.get(`/api/notes/author?userId=${userId}`);
  return res.data;
};

export const createNote = async (node: CreateNoteRequest) => {
  const res = await axiosClient.post("/api/notes", node);
  return res.data.id;
};

export const getNoteById = async (id: string) => {
  const res = await axiosClient.get(`/api/notes/${id}`);
  return res.data;
};

export const updateNote = async (id: string, node: CreateNoteRequest) => {
  const res = await axiosClient.put(`/api/notes/${id}`, node);
  return res.data;
};
export const deleteNote = async (id: string) => {
  await axiosClient.delete(`/api/notes/${id}`);
};

export const getNotesByAuthorIdAndTitle = async (title: string) => {
  const userId = localStorage.getItem("userId");
  const res = await axiosClient.get(
    `/api/notes/author?userId=${userId}&filter=${title}`
  );
  return res.data;
};
