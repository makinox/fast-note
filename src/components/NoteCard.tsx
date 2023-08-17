import { api } from '@/utils/api';

type NoteCardProps = {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  onSuccess: () => void;
};

export const NoteCard = ({ title, content, id, completed, onSuccess }: NoteCardProps) => {
  const completeMutation = api.notes.completeNote.useMutation({ onSuccess });
  const unCompleteMutation = api.notes.unCompleteNote.useMutation({ onSuccess });
  const deleteMutation = api.notes.deleteNote.useMutation({ onSuccess });

  const handleComplete = () => completeMutation.mutate({ id });

  const handleUnComplete = () => unCompleteMutation.mutate({ id });

  const handleDelete = () => deleteMutation.mutate({ id });

  return (
    <article key={title} className="w-80 rounded-md bg-base-100 px-4 py-2 shadow-md">
      <h2 className="mb-2 text-xl font-bold">{title}</h2>
      <p>{content}</p>
      <div className="mt-4 flex justify-between">
        {completed ? (
          <button className="btn btn-info btn-sm" onClick={handleUnComplete}>
            {completeMutation.isLoading ? 'Loading...' : 'Completed'}
          </button>
        ) : (
          <button className="btn btn-accent btn-sm" onClick={handleComplete}>
            {unCompleteMutation.isLoading ? 'Loading...' : 'Complete'}
          </button>
        )}
        <button className="btn btn-error btn-sm" onClick={handleDelete}>
          {deleteMutation.isLoading ? 'Loading...' : 'Eliminar'}
        </button>
      </div>
    </article>
  );
};
