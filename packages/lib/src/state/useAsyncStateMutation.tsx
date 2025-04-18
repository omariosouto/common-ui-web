import { DefaultError, useMutation, useQueryClient, QueryClient, MutationFunction } from "@tanstack/react-query";


type UseAsyncStateMutationInput<
  TVariables = void,
  TContext = unknown,
  TData = unknown,
  TError = DefaultError
> = {
  mutationFn: MutationFunction<TData, TVariables>;
  stateKey?: string[] | ReadonlyArray<string> | unknown[] | ReadonlyArray<unknown>;
  onOptimisticUpdate?: (input: {
    variables: TVariables;
    queryClient: QueryClient;
  }) => TContext | Promise<TContext | undefined> | undefined;
  onOptimisticUpdateRollback?: (input: {
    error: TError;
    variables: TVariables;
    context: TContext | undefined;
    queryClient: QueryClient;
  }) => any;
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
  onSettled?: (data: {
    data: TData | undefined;
    error: TError | null;
    variables: TVariables;
    context: TContext | Promise<TContext | undefined> | undefined;
    queryClient: QueryClient;
  }) => void;
}

export function useAsyncStateMutation<
  TData = unknown,
  TContext = unknown,
  TError = DefaultError,
  TVariables = void
>({
  // Default Params
  onMutate,
  onSuccess,
  onError,
  onSettled,
  // Custom Params for DevEx
  mutationFn,
  stateKey,
  onOptimisticUpdate,
  onOptimisticUpdateRollback,
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
    mutationFn(...args) {
      return mutationFn(...args);
    },
    async onMutate(variables) { // TODO: Learn more about how to use this
      const input = {
        variables,
        queryClient,
      };

      let context = onMutate && await onMutate(input);

      if (onOptimisticUpdate) {
        context = await onOptimisticUpdate(input);
      }

      return context;
    },
    onSuccess(data, variables, context) {
      const input = {
        data,
        variables,
        context,
        queryClient,
      };

      onSuccess && onSuccess(input);
    },
    onError: (error, variables, context) => {
      const input = {
        error,
        variables,
        context,
        queryClient,
      };

      onError && onError(input);
      if (onOptimisticUpdateRollback) {
        onOptimisticUpdateRollback(input);
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
  mutationFn: ({ variables }: any) => httpClient_toggleTodoById(variables.id),
}
```

3. Trigger the mutation and invalidate the state by key
// stateKey: todoKeys.all(),
// mutationFn: ({ variables }: any) => httpClient_toggleTodoById(variables.id),
// invalidateState: true,

4. Trigger the mutation, invalidate the state by key and make an optimistic update
// stateKey: todoKeys.all(),
// mutationFn: ({ variables }: any) => httpClient_toggleTodoById(variables.id),
// invalidateState: true,
// onOptimisticUpdate: () => {
//   console.log("[onOptimisticUpdate] time to update UI");
// },

5. Trigger the mutation, invalidate the state by key and make an optimistic update and rollback
// stateKey: todoKeys.all(),
// mutationFn: ({ variables }: any) => httpClient_toggleTodoById(variables.id),
// invalidateState: true,
// onOptimisticUpdate: () => {
//   console.log("[onOptimisticUpdate] time to update UI");
// },
// onOptimisticUpdateRollback() {
//   console.log("[rollback] time to update UI");
// },
*/