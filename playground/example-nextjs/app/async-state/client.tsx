"use client";
import { useAsyncStateQuery } from "@omariosouto/common-ui-web/state";
import { Box, Button, Text } from "@omariosouto/common-ui-web/components";
import { sleep } from "@omariosouto/common-core";
import { getGitHubUserInfo, GitHubRepo } from "./httpClient";

const githubStateKeys = {
  profile: () => ["profile"] as const,
  reposByUser: (user: string) => ["repos", user] as const,
};

export default function GitHubClientView({
  githubUserLogin,
}: {
  githubUserLogin: string;
}) {

  const profileQuery = useAsyncStateQuery({
    suspendRenderization: true,
    // throwOnError: true,
    queryKey: githubStateKeys.profile(),
    async queryFn() {
      await sleep(1000);

      try {
        const data = await getGitHubUserInfo(githubUserLogin);
        return data;
      }
      catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    },
  });
  const login = profileQuery.data?.login!;

  const nextEnabled = Boolean(login);

  const reposQuery = useAsyncStateQuery({
    queryKey: githubStateKeys.reposByUser(login),
    queryFn: async ({ queryKey }) => {
      const [, login] = queryKey;
      await sleep(1000);
      const data = await fetch(`https://apia.github.com/users/${login}/repos`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data as GitHubRepo[];
      })
      .catch(() => {
        return [
          {
            full_name: "omariosouto/omariosouto",
          },
          {
            full_name: "omariosouto/common-ui-web",
          },
          {
            full_name: "omariosouto/common-ui-web-playground",
          }
        ];
      });

      return data;
    },
    enabled: nextEnabled,
  });

  return (
    <Box>
      {profileQuery.error && (
        <Box>
          <Text>Error: {profileQuery.error?.message}</Text>
          <Button
            onClick={() => {
              profileQuery.refetch();
            }}
          >
            Retry
          </Button>
        </Box>
      )}
      {reposQuery.error && (
        <Box>
          <Text>Error: {reposQuery.error?.message}</Text>
          <Button
            onClick={() => {
              reposQuery.refetch();
            }}
          >
            Retry
          </Button>
        </Box>
      )}
      <Text tag="h1">
        {profileQuery.data?.login}
        {profileQuery.isLoading && <Text>Loading user...</Text>}
      </Text>
      {reposQuery.isLoading && <Text>Loading...</Text>}
      {reposQuery.isError && (
        <Box>
          <Text>Error: {reposQuery.error?.message}</Text>
          <Button
            onClick={() => {
              reposQuery.refetch();
            }}
          >
            Retry
          </Button>
        </Box>
      )}
      {!reposQuery.isLoading && (
        <ul>
          {reposQuery.data?.map((repo) => (
            <li key={repo.full_name}>
              <Text tag="h2">
                {repo.full_name}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}