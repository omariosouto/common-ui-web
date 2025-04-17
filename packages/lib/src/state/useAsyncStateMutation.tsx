import { useMutation, useQueryClient } from "@tanstack/react-query";


type UseAsyncStateMutationInput = {
  asyncFn: (variables: any) => Promise<any>;
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

export function useAsyncStateMutation({
  asyncFn,
  stateKey,
  optimisticUpdate,
  optimisticUpdateRollback,
  invalidateState,
  invalidateStates,
  // Default Params
  onMutate,
  onSuccess,
  onError,
  onSettled,
}: UseAsyncStateMutationInput) {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    any, // Data -> Mutation Response
    Error, // Error -> Mutation Error
    any, // Variables -> 
    any // Context
  >({
    mutationFn: (variables) => {
      return asyncFn({
        variables,
      });
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