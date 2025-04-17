import { Todo } from "../api/todos/domain";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function httpClient_getTodos(): Promise<Todo[]> {
  await sleep(0.5 * 1000);

  return fetch("http://localhost:3000/api/todos")
    .then((res) => res.json());
}

export async function httpClient_deleteTodoById(todoId: number): Promise<void> {
  await sleep(1000);

  return fetch(`http://localhost:3000/api/todos?id=${todoId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to delete todo with id ${todoId}`);
      }
    });
}

export async function httpClient_toggleTodoById(todoId: number): Promise<void> {
  await sleep(1000);

  return fetch(`http://localhost:3000/api/todos?id=${todoId}&action=toggle_completed`, {
    method: "PATCH",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to toggle todo with id ${todoId}`);
      }
    });
}