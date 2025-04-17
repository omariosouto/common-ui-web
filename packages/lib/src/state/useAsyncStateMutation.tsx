import { useMutation, useQueryClient } from "@tanstack/react-query";


type UseAsyncStateMutationInput = {
  asyncFn: (variables: any) => Promise<any>;
  stateKey?: string[] | ReadonlyArray<string>;
  optimisticUpdate?: (data: any) => any;
  optimisticUpdateRollback?: (data: any) => any;
  invalidateState?: boolean;
  onSettled?: (data: any) => void;
}

export function useAsyncStateMutation({
  asyncFn,
  stateKey,
  optimisticUpdate,
  optimisticUpdateRollback,
  invalidateState,
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
    },
  });


  return mutation;
}