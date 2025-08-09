export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt?: Date;
  authorId?: string;
};

export type CreateNoteRequest = {
  title: string;
  content: string;
};
