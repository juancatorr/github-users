import type {
  GitHubRepo,
  GitHubSearchResponse,
  GitHubUser,
  GitHubUserDetails,
} from '@/types/github';
import { ApiClient } from '../api/apiClient';
import {
  GITHUB_API_BASE_URL,
  GITHUB_API_HEADERS,
} from './githubConstants';

class GitHubService {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient({
      baseURL: GITHUB_API_BASE_URL,
      headers: GITHUB_API_HEADERS,
    });
  }

  async getUsers(
    since = 0,
    perPage = 40
  ): Promise<GitHubUser[]> {
    return this.apiClient.fetch(
      `/users?since=${since}&per_page=${perPage}`
    );
  }

  async getUserDetails(
    username: string
  ): Promise<GitHubUserDetails> {
    return this.apiClient.fetch(`/users/${username}`);
  }

  async getUserRepos(
    username: string
  ): Promise<GitHubRepo[]> {
    return this.apiClient.fetch(`/users/${username}/repos`);
  }

  async searchUsers(
    query: string
  ): Promise<GitHubSearchResponse> {
    return this.apiClient.fetch(
      `/search/users?q=${encodeURIComponent(query)}`
    );
  }
}

// Exportamos una única instancia del servicio
export const githubService = new GitHubService();
