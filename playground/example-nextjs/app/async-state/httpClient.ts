

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
}

export async function getGitHubUserInfo(githubUser: string): Promise<GitHubUser> {
  return fetch(`https://api.github.com/users/${githubUser}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data as GitHubUser;
    })
}