import { NextResponse } from "next/server";
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
  ].reverse(),
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

export async function DELETE(request: Request) {
  // get queryParams from request with next 15
  const url = new URL(request.url);
  const todoId = url.searchParams.get('id');

  if (todoId?.at(-1) === "1") {
    return NextResponse.json(
      {
        error: {
          message: "You can't delete the first todo",
        }
      },
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  db.todos = db.todos.filter((todo) => todo.id !== Number(todoId));
  console.log('db.todos', db.todos.length);


  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}