import { DefaultError, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";


type UseAsyncStateMutationInput<
  TVariables = void,
  TContext = unknown,
  TData = unknown,
  TError = DefaultError
> = {
  asyncFn: (input: { variables: TVariables }) => Promise<TData>;
  stateKey?: string[] | ReadonlyArray<string>;
  optimisticUpdate?: (data: {
    variables: TVariables;
    queryClient: QueryClient;
    data: TData;
    context: TContext | Promise<TContext | undefined> | undefined;
  }) => any;
  optimisticUpdateRollback?: (data: any) => any;
  invalidateState?: boolean;
  invalidateStates?: boolean;
  // Default Params
  onMutate?: (input: {
    variables: TVariables;
    queryClient: QueryClient;
  }) => TContext | Promise<TContext | undefined> | undefined;
  onSuccess?: (input: {
    variables: TVariables;
    queryClient: QueryClient;
    data: TData;
    context: TContext | Promise<TContext | undefined> | undefined;
  }) => void;
  onError?: (input: {
    error: TError;
    variables: TVariables;
    context: TContext | Promise<TContext | undefined> | undefined;
    queryClient: QueryClient;
  }) => void;
  onSettled?: (data: any) => void;
}

export function useAsyncStateMutation<
  TVariables = void,
  TContext = unknown,
  TData = unknown,
  TError = DefaultError
>({
  // Default Params
  onMutate,
  onSuccess,
  onError,
  onSettled,
  // Custom Params for DevEx
  asyncFn,
  stateKey,
  optimisticUpdate,
  optimisticUpdateRollback,
  invalidateState,
  invalidateStates = true,
}: UseAsyncStateMutationInput<
  TVariables,
  TContext,
  TData,
  TError
>) {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TData, // any, // Data -> Mutation Response
    TError, // Error, // Error -> Mutation Error
    TVariables, // any, // Variables -> 
    TContext // any // Context
  >({
    mutationFn(variables: TVariables) {
      const input = {
        variables,
      };
      return asyncFn(input);
    },
    onMutate(variables) { // TODO: Learn more about how to use this
      const input = {
        variables,
        queryClient,
      };
      return onMutate && onMutate(input);
    },
    onSuccess(data, variables, context) {
      const input = {
        data,
        variables,
        context,
        queryClient,
      };

      onSuccess && onSuccess(input);

      if (optimisticUpdate) optimisticUpdate(input);
    },
    onError: (error, variables, context) => {
      const input = {
        error,
        variables,
        context,
        queryClient,
      };

      onError && onError(input);
      if (optimisticUpdateRollback) {
        optimisticUpdateRollback(input);
      }
    },
    onSettled: (data, error, variables, context) => {
      onSettled && onSettled({
        data,
        error,
        variables,
        context,
        queryClient,
      });

      if (invalidateState) {
        queryClient.invalidateQueries({ queryKey: stateKey });
      }
      if (invalidateStates) {
        queryClient.invalidateQueries();
      }
    },
  });

  return mutation;
}


/**
 * @description 
1. If you want to invalidate all states, you can use this
```json
{
  invalidateStates: true,
}
```

2. - Just trigger the mutation
```json
{
  asyncFn: ({ variables }: any) => httpClient_toggleTodoById(variables.id),
}
```

3. Trigger the mutation and invalidate the state by key
// stateKey: todoKeys.all(),
// asyncFn: ({ variables }: any) => httpClient_toggleTodoById(variables.id),
// invalidateState: true,

4. Trigger the mutation, invalidate the state by key and make an optimistic update
// stateKey: todoKeys.all(),
// asyncFn: ({ variables }: any) => httpClient_toggleTodoById(variables.id),
// invalidateState: true,
// optimisticUpdate: () => {
//   console.log("[optimisticUpdate] time to update UI");
// },

5. Trigger the mutation, invalidate the state by key and make an optimistic update and rollback
// stateKey: todoKeys.all(),
// asyncFn: ({ variables }: any) => httpClient_toggleTodoById(variables.id),
// invalidateState: true,
// optimisticUpdate: () => {
//   console.log("[optimisticUpdate] time to update UI");
// },
// optimisticUpdateRollback() {
//   console.log("[rollback] time to update UI");
// },
*/