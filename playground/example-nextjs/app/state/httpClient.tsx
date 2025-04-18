import { Todo } from "../api/todos/domain";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function httpClient_getTodos({
  delay = 0.5,
} = {}): Promise<Todo[]> {
  await sleep(delay * 1000);


  
  return fetch("/api/todos")
    .then((res) => res.json())
    .catch(() => []);
}

export async function httpClient_deleteTodoById({
  todoId,
}: {
  todoId: number;
}): Promise<void> {
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

export async function httpClient_toggleTodoById({ id }: { id: number }): Promise<void> {
  await sleep(1000);

  return fetch(`http://localhost:3000/api/todos?id=${id}&action=toggle_completed`, {
    method: "PATCH",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to toggle todo with id ${id}`);
      }
    });
}