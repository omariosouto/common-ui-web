import { Todo } from "./domain";

interface DB {
  todos: Todo[];
}

const db = {
  todos: [
    ...new Array(100).fill(null).map((_, index) => ({
      id: index + 1,
      title: `Todo ${index + 1}`,
      completed: Math.random() > 0.5,
    })),
  ],
} as DB;

export async function GET() {
  return new Response(
    JSON.stringify(db.todos),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}