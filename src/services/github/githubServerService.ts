import type {
  GitHubRepo,
  GitHubUserDetails,
} from '@/types/github';
import axios from 'axios';
import {
  GITHUB_API_BASE_URL,
  GITHUB_API_HEADERS,
} from './githubConstants';

const serverClient = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  headers: GITHUB_API_HEADERS,
});

export const githubServerService = {
  async getUserDetails(
    username: string
  ): Promise<GitHubUserDetails> {
    const { data } = await serverClient.get(
      `/users/${username}`
    );
    return data;
  },

  async getUserRepos(
    username: string
  ): Promise<GitHubRepo[]> {
    const { data } = await serverClient.get(
      `/users/${username}/repos`
    );
    return data;
  },
};
