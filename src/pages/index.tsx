import { useState } from 'react';
import Head from 'next/head';

import { api } from '@/utils/api';
import { NoteCard } from '@/components/NoteCard';
import { AddNoteForm } from '@/components/AddNoteForm';

const classes = {
  container: 'flex min-h-screen flex-col items-center justify-center bg-base-200',
  titleContainer: 'container flex flex-row justify-center gap-12 px-4 py-16',
  title: 'text-5xl font-extrabold',
};

export default function Home() {
  const [active, setActive] = useState(false);
  const notes = api.notes.getAllNotes.useQuery();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classes.container}>
        <div className={classes.titleContainer}>
          <h1 className={classes.title}>Notes</h1>
          <button className="btn btn-primary" onClick={() => setActive((prev) => !prev)}>
            Crear nota
          </button>
        </div>
        <section className="mb-8 min-h-[72px]">{active && <AddNoteForm onSuccess={() => notes.refetch()} />}</section>
        {notes.isLoading && <span>Loading...</span>}
        {notes.isError && <span>Error: {notes.error.message}</span>}
        <section className="flex flex-wrap justify-center gap-4">
          {notes.data?.map((note) => (
            <NoteCard key={note.id} {...note} onSuccess={() => notes.refetch()} />
          ))}
        </section>
      </main>
    </>
  );
}
