import { api } from '@/utils/api';

type AddNoteFormProps = {
  onSuccess: () => void;
};

export const AddNoteForm = ({ onSuccess }: AddNoteFormProps) => {
  const createMutatiion = api.notes.createNote.useMutation({ onSuccess });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, content } = event.target as typeof event.target & {
      title: { value: string };
      content: { value: string };
    };

    createMutatiion.mutate({ title: title.value, content: content.value });

    event.currentTarget.reset();
  };

  return (
    <form className="flex w-full items-end justify-center gap-8" onSubmit={handleSubmit}>
      <div>
        <span className="label-text">Title</span>
        <input type="text" name="title" className="input input-success w-full max-w-xs" />
      </div>
      <div>
        <span className="label-text">Content</span>
        <input type="text" name="content" className="input input-success w-full max-w-xs" />
      </div>
      <button className="btn btn-success" type="submit">
        {createMutatiion.isLoading ? 'Loading...' : 'Create'}
      </button>
    </form>
  );
};
