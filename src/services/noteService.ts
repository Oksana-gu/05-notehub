import axios from 'axios';
import { type Note, type NoteTag } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  search: string;
  perPage?: number;
}

export const fetchNotes = async ({
  page,
  search,
  perPage = 12,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await instance.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search,
    },
  });

  return response.data;
};

interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (
  noteData: CreateNoteParams
): Promise<Note> => {
  const response = await instance.post<Note>('/notes', noteData);

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await instance.delete<Note>(`/notes/${id}`);

  return response.data;
};