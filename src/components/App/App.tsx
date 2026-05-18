import { useState } from 'react';

import { useDebouncedCallback } from 'use-debounce';

import { useQuery } from '@tanstack/react-query';

import css from './App.module.css';

import { fetchNotes } from '../../services/noteService';

import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';

export default function App() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
   
  const debouncedSearch = useDebouncedCallback(
    (value: string) => {
      setSearch(value);
      setPage(1);
    },
    500
  );

  const { data, isLoading, isError } =
    useQuery({
      queryKey: ['notes', page, search],
      queryFn: () =>
        fetchNotes({
          page,
          search,
        }),
      placeholderData: (previousData) =>
      previousData,
    });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading notes...</p>;
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={debouncedSearch}
        />

        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            forcePage={page}
            onPageChange={setPage}
          />
        )}

        <button
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {data && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
        >
          <NoteForm
            onCancel={() =>
              setIsModalOpen(false)
            }
          />
        </Modal>
      )}
    </div>
  );
}