import { Todo } from "../api/todos/domain";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function httpClient_getTodos(): Promise<Todo[]> {
  await sleep(0.5 * 1000);

  return fetch("http://localhost:3000/api/todos")
    .then((res) => res.json());
}