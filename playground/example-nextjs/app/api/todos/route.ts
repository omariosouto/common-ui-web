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
  const url = new URL(request.url);
  const todoIdRaw = url.searchParams.get('id');

  try {
    const todoId = Number(todoIdRaw);
    throwOnItemTerminatedWith(0, "You can't change this todo right now, please try again", todoId);

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
  } catch (err) {
    const e = err as Error;

    return NextResponse.json(
      {
        error: {
          message: e.message,
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
}

export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const todoIdRaw = url.searchParams.get('id');
  const action = url.searchParams.get('action');

  try {
    const todoId = Number(todoIdRaw);

    if (action === "toggle_completed") {
      throwOnItemTerminatedWith(0, "You can't change this todo right now, please try again", todoId);

      db.todos = db.todos.map((todo) => {
        if (todo.id === Number(todoId)) {
          const updatedTodo = { ...todo, completed: !todo.completed };
          console.log(`[action:${action}]`, updatedTodo);
          return updatedTodo;
        }
        return todo;
      });
    

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
    // db.todos = db.todos.map((todo) => {
    //   if (todo.id === Number(todoId)) {
    //     return { ...todo, completed };
    //   }
    //   return todo;
    // });
  } catch (err) {
    const e = err as Error;

    return NextResponse.json(
      {
        error: {
          message: e.message,
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

}


function throwOnItemTerminatedWith(num: number, message: string, todoId: number) {
  if (String(todoId)?.at(-1) === String(num)) {
    throw new Error(message);
  }
}