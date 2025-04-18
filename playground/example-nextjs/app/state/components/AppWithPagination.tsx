"use client";

import React from "react";
import { Box, Text, Button } from "@omariosouto/common-ui-web/components";
import { useInfiniteQuery } from "@tanstack/react-query";
import { httpClient_fetchReposPage } from "../httpClient";

const githubStateKeys = {
  repos: (userLogin: string) => ["repos", userLogin] as const,
};

interface AppWithPaginationProps {
  title: string;
  userLogin?: string; // permite trocar o usuário se quiser
}

const PER_PAGE = 10;

export function AppWithPagination({
  title,
  userLogin = "omariosouto",
}: AppWithPaginationProps) {
  /**
   * useInfiniteQuery lida internamente com:
   *  - cache por chave
   *  - fetch de novas páginas
   *  - estados de loading / error
   */
  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: 1, // página inicial
    queryKey: githubStateKeys.repos(userLogin),
    queryFn: ({
      pageParam,
      queryKey,
    }) => {
      const [, userLogin] = queryKey;
      return httpClient_fetchReposPage({
        pageParam,
        userLogin,
        PER_PAGE,
      });
    },
    /**
     * Define se existe próxima página:
     * - Se a página atual tem menos itens que PER_PAGE, não há mais páginas
     */
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.length < PER_PAGE ? undefined : lastPageParam + 1,
    // Cache e stale time opcionais
    staleTime: 1000 * 60, // 1 min
  });

  // Achata o array de páginas num array único de itens
  const items = data?.pages.flat() ?? [];

  return (
    <Box className="space-y-4 overflow-scroll h-full py-6">
      <Box className="flex items-center gap-2">
        <Text tag="h2" className="text-2xl font-bold">
          {title}
        </Text>

        {/* Botão manual para refazer a primeira página */}
        <Button
          disabled={isFetching}
          onClick={() => refetch()}
          className="px-3 py-1 rounded"
        >
          Atualizar
        </Button>
      </Box>

      {/* Estado de erro */}
      {error && (
        <Text className="text-red-600">
          {(error as Error).message}
        </Text>
      )}

      <Box tag="ul" className="space-y-2">
        {items.map((repo) => (
          <Box tag="li" key={repo.id} className="flex items-center gap-2">
            <Text className="text-lg">{repo.name}</Text>
            <Text className="text-sm text-gray-500">
              ★ {repo.stargazers_count}
            </Text>
          </Box>
        ))}

        {items.length === 0 && !isFetching && (
          <Text>Nenhum repositório encontrado.</Text>
        )}
      </Box>

      {/* Botão “Carregar mais” */}
      {hasNextPage && (
        <Button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="px-3 py-1 rounded"
        >
          {isFetchingNextPage ? "Carregando..." : "Carregar mais"}
        </Button>
      )}
    </Box>
  );
}