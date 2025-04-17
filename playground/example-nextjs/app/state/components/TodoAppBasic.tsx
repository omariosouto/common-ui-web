"use client";
import { useQuery, queryOptions, useMutation } from "@omariosouto/common-ui-web/state";
import { httpClient_deleteTodoById, httpClient_getTodos } from "../httpClient";
import { TodoApp } from "./TodoApp";
import { Todo } from "@/app/api/todos/domain";

const todoKeys = {
  all: ['todos'] as const,
  // lists: () => [...todoKeys.all, 'list'] as const,
  // list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  // details: () => [...todoKeys.all, 'detail'] as const,
  // detail: (id: number) => [...todoKeys.details(), id] as const,
};

function todosOptions() {
  return queryOptions({
    queryKey: todoKeys.all,
    queryFn: () => httpClient_getTodos(),
  })
}

export function TodoAppBasic() {
  const asyncState = useQuery(todosOptions());
  const deleteMutation = useMutation<
    void, // function output
    Error,
    Todo,
    { previousTodos: Todo[] }
  >({
    mutationKey: ['deleteTodo'],
    mutationFn: ({ id }) => httpClient_deleteTodoById(id),
  });

  // const asyncState = useAsyncDataQuery({
  //   async asyncFn() {
  //     const todos = await httpClient_getTodos();
  //     return todos;
  //   },
  // });

  // // TODO: Adicionar suporte a filtros: https://tkdodo.eu/blog/effective-react-query-keys#structure
  // // TODO: Deixar no modelo master blaster das keys

  // // TODO: Move this inside the main library
  // const cacheKey = asyncState.key;

  // const queryClient = useQueryClient();   // TODO: This must be abstracted
  // const deleteMutation = useMutation<
  //   void,
  //   Error,
  //   Todo,
  //   { previousTodos: Todo[] }
  // >({
  //   mutationFn: ({ id }) => httpClient_deleteTodoById(id),
  //   onMutate: async ({ id }) => {
  //     await queryClient.cancelQueries({ queryKey: cacheKey });

  //     const previousTodos = queryClient.getQueryData<Todo[]>(cacheKey) || [];
  //     queryClient.setQueryData(
  //       cacheKey,
  //       previousTodos.filter((t) => t.id !== id)
  //     );

  //     return { previousTodos };
  //   },
  //   onError: (err, _, context) => {
  //     if (context?.previousTodos) {
  //       queryClient.setQueryData(cacheKey, context.previousTodos);
  //     }
  //     console.error("Error deleting:", err);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: cacheKey });
  //   },
  // });

  // const toggleMutation = useMutation<
  //   void,
  //   Error,
  //   Todo,
  //   { cachedData: Todo[] }
  // >({
  //   mutationFn: ({ id }) => httpClient_toggleTodoById(id),
  //   onMutate: async ({ id }) => {
  //     await queryClient.cancelQueries({ queryKey: cacheKey });

  //     const cachedData = queryClient.getQueryData<Todo[]>(cacheKey) || [];

  //     // Optimistically update the cache
  //     queryClient.setQueryData(
  //       cacheKey,
  //       cachedData.map((todo) =>
  //         todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //       )
  //     );

  //     return { cachedData };
  //   },
  //   onError: (err, _, context) => {
  //     if (context?.cachedData) {
  //       console.log(context?.cachedData[0]);
  //       queryClient.setQueryData(cacheKey, context.cachedData);
  //     }
  //     console.error("Error deleting:", err);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: cacheKey });
  //   },
  // });

  return (
    <>
      <p>
        {deleteMutation.error && (
          <span style={{ color: "red" }}>
            {deleteMutation.error.message}
          </span>
        )}
      </p>
      <p>
        {toggleMutation.error && (
          <span style={{ color: "red" }}>
            {toggleMutation.error.message}
          </span>
        )}
      </p>
      <TodoApp
        title={"Todo App Basic"}
        todosState={asyncState}
        onToggleTodo={async (todo) => {
          toggleMutation.mutate(todo);
        }}
        onDeleteTodo={async (todo) => {
          deleteMutation.mutate(todo);
        }}
      />
    </>
  );
}