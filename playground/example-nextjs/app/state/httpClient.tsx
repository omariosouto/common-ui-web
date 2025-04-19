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

export const httpClient_fetchReposPage = async ({ pageParam = 1, userLogin, PER_PAGE }: {
  pageParam: number;
  userLogin: string;
  PER_PAGE: number;
}) => {
  const res = await fetch(
    `https://api.github.com/users/${userLogin}/repos?per_page=${PER_PAGE}&page=${pageParam}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (!res.ok) {
    // Propaga erro para o React Query tratar
    throw new Error(`Falha ao buscar repositórios: ${res.statusText}`);
  }

  // A API já devolve array; basta retornar
  return res.json() as Promise<GitHubRepo[]>;
};

interface GitHubRepo {
  id: number;
  name: string;
  stargazers_count: number;
}
