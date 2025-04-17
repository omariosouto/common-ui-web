"use client";
import {
  queryOptions,
  useQueryClient,
  useQuery,
  useMutation,
  useAsyncStateMutation,
} from "@omariosouto/common-ui-web/state";
import { httpClient_deleteTodoById, httpClient_getTodos, httpClient_toggleTodoById } from "../httpClient";
import { TodoApp } from "./TodoApp";
// import { Todo } from "@/app/api/todos/domain";
import { Button } from "@omariosouto/common-ui-web/components";

// > useQuery is declarative, useMutation is imperative.


const todoKeys = {
  all: () => ['todos'] as const,
  // lists: () => [...todoKeys.all, 'list'] as const,
  // list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  // details: () => [...todoKeys.all, 'detail'] as const,
  // detail: (id: number) => [...todoKeys.details(), id] as const,
};

function todosOptions() {
  return queryOptions({
    queryKey: todoKeys.all(),
    queryFn: () => httpClient_getTodos(),
  })
}

export function TodoAppBasic() {
  const asyncState = useQuery(todosOptions());

  const queryClient = useQueryClient();
  const deleteMutation = useMutation<
    any, // Data -> Mutation Response
    Error, // Error -> Mutation Error
    any, // Variables -> 
    any // Context
  >({
    mutationFn: ({ id }) => httpClient_deleteTodoById(id),
    onSuccess(_data, _variable, _context) {
      console.log("[1 - on_success] - Apply optimistic update");
      // ✅ Optimistically update the cache
      // queryClient.setQueryData(todoKeys.all(), (oldData: Todo[] | undefined) => {
      //   if (!oldData) return [];
      //   return oldData.filter((todo) => todo.id !== _variable.id);
      // });
    },
    onError: (error, _variable, _context) => {
      console.log("[1 - on_error] - Revert optimistic update");
      console.log("error", error);
    },
    onSettled: (...args) => {
      console.log("[2- on_settled] - Invalidate queries");
      // ✅ Trigger a full refresh of data
      queryClient.invalidateQueries({ queryKey: todoKeys.all() });
    },
  });

  // const toggleMutation = useMutation<
  //   any, // Data -> Mutation Response
  //   Error, // Error -> Mutation Error
  //   any, // Variables -> 
  //   any // Context
  // >({
  //   mutationFn: ({ id }) => httpClient_toggleTodoById(id),
  //   onSettled: () => queryClient.invalidateQueries({ queryKey: todoKeys.all() }),
  // });
  
  // TODO: This must be FULLY typed
  const toggleMutation = useAsyncStateMutation({
    asyncFn: ({ variables }: any) => httpClient_toggleTodoById(variables.id),
    stateKey: todoKeys.all(),
    invalidateState: true,
    // optimisticUpdate: (input: any) => {
    //   console.log("[optimisticUpdate] time to update UI");
    // },
    // optimisticUpdateRollback(input: any) {
    //   console.log("[rollback] time to update UI");
    // },
    // onSettled: (input: any) => {
    //   console.log("[2- on_settled] - Invalidate queries", input);
    //   input.queryClient.invalidateQueries({ queryKey: todoKeys.all() });
    // },
  });

  return (
    <>
      <p>
        {deleteMutation.error && (
          <span style={{ color: "red" }}>
            {deleteMutation.error.message} - Attempts: {deleteMutation.failureCount}
          </span>
        )}
      </p>
      <p>
        {toggleMutation.error && (
          <>
            <span style={{ color: "red" }}>
              {toggleMutation.error.message} - Attempts: {toggleMutation.failureCount}
            </span>
            <Button onClick={() => toggleMutation.reset()}>Reset Error</Button>
          </>
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