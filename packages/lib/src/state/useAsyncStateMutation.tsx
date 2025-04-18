import { DefaultError, MutationFunction, useMutation, useQueryClient } from "@tanstack/react-query";


type UseAsyncStateMutationInput<
  TVariables = void,
  TContext = unknown,
  TData = unknown,
  TError = DefaultError
> = {
  asyncFn: (input: { variables: TVariables }) => Promise<unknown>; // How to get that
  stateKey?: string[] | ReadonlyArray<string>;
  optimisticUpdate?: (data: any) => any;
  optimisticUpdateRollback?: (data: any) => any;
  invalidateState?: boolean;
  invalidateStates?: boolean;
  // Default Params
  onMutate?: (data: any) => void;
  onSuccess?: (data: any) => void;
  onError?: (data: any) => void;
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
    mutationFn(variables) {
      // return asyncFn({
      //   variables,
      // });
      const input = {
        variables,
      };
      return asyncFn(input);
      // return new Promise(() => {});
    },
    onMutate: (variables) => {
      const input = {
        variables,
        queryClient,
      };

      onMutate && onMutate(input);
      if (optimisticUpdate) optimisticUpdate(input);
    },
    onSuccess: (data, variables, context) => {
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
      onError && onError({
        error,
        variables,
        context,
        queryClient,
      });
      if (optimisticUpdateRollback) {
        optimisticUpdateRollback(error);
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