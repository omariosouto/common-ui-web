"use client";
import { useAsyncState, useMutation } from "@omariosouto/common-ui-web/state";
import { useQueryClient } from "@tanstack/react-query";
import { httpClient_deleteTodoById, httpClient_getTodos } from "../httpClient";
import { TodoApp } from "./TodoApp";
import { Todo } from "@/app/api/todos/domain";

export function TodoAppBasic() {
  const asyncState = useAsyncState({
    asyncFn: async () => {
      const todos = await httpClient_getTodos();
      return todos;
    },
  });

  const queryClient = useQueryClient();

  // TODO: Move this inside the main library
  const mutation = useMutation<
    void,
    Error,
    Todo,
    { previousTodos: Todo[] }
  >({
    mutationFn: ({ id }) => {
      return httpClient_deleteTodoById(id);
    },
    // 2.1 Antes da mutação: backup do estado atual
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({
        queryKey: asyncState.key,
      });

      const previousTodos = queryClient.getQueryData<Todo[]>(asyncState.key) || []
      // Remova imediatamente o item do cache
      queryClient.setQueryData(
        asyncState.key,
        previousTodos.filter((t) => t.id !== id)
      )
      return { previousTodos }
    },
    // 2.2 Em caso de erro: reverta o cache
    onError: (err, _, context) => {
      if (context) {
        queryClient.setQueryData(asyncState.key, context.previousTodos)
      }
      console.error('Erro ao deletar:', err);
    },
    // 2.3 Quando a mutação finalizar (sucesso ou erro): refetch
    onSettled: () => {
      console.log("[On_Settled]");
      queryClient.invalidateQueries({
        queryKey: asyncState.key,
      });
    },
  });

  return (
    <>
      <p>
        {mutation.error && (
          <span style={{ color: "red" }}>
            {mutation.error.message}
          </span>
        )}
      </p>
      <TodoApp
        title={"Todo App Basic"}
        todosState={asyncState}
        onDeleteTodo={async (todo) => {
          try {
            console.log("[start-delete]");
            await mutation.mutateAsync(todo);
          } catch {
            console.log("[catch-on-delete]");
          } finally {
            console.log("[finally-delete]");
          }
        }}
      />
    </>
  );
}