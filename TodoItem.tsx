'use client';

type TodoItemProps = {
  todo: string;
  index: number;
  onDelete: (index: number) => void;
  onToggle: (index: number) => void;
  completed: boolean;
};

export default function TodoItem({ todo, index, onDelete, onToggle, completed }: TodoItemProps) {
  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow mb-2">
      <span
        className={`cursor-pointer ${completed ? 'line-through text-gray-500' : ''}`}
        onClick={() => onToggle(index)}
      >
        {todo}
      </span>
      <button onClick={() => onDelete(index)} className="text-red-500 font-bold">X</button>
    </div>
  );
}
