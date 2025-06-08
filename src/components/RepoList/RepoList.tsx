import type { GitHubRepo } from '@/types/github';
import { useMemo, useState } from 'react';
import { RepoCard } from '../RepoCard';
import styles from './RepoList.module.scss';

const {
  'repo-list': repoList,
  'repo-list__grid': repoList__grid,
  'repo-list__header': repoList__header,
  'repo-list__title': repoList__title,
  'repo-list__filters': repoList__filters,
  'repo-list__select': repoList__select,
} = styles;

interface RepoListProps {
  repos: GitHubRepo[];
}

type SortOption = 'stars' | 'updated' | 'name';

export function RepoList({ repos }: RepoListProps) {
  const [sortBy, setSortBy] = useState<SortOption>('stars');
  const [language, setLanguage] = useState<string>('');

  const languages = useMemo(() => {
    const langs = new Set(
      repos.map((repo) => repo.language).filter(Boolean)
    );
    return Array.from(langs).sort();
  }, [repos]);

  const sortedAndFilteredRepos = useMemo(() => {
    let filtered = repos;

    if (language) {
      filtered = repos.filter(
        (repo) => repo.language === language
      );
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'updated':
          return (
            new Date(b.updated_at).getTime() -
            new Date(a.updated_at).getTime()
          );
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [repos, sortBy, language]);

  return (
    <div className={repoList}>
      <div className={repoList__header}>
        <h2 className={repoList__title}>Repositories</h2>
        <div className={repoList__filters}>
          <select
            className={repoList__select}
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as SortOption)
            }
          >
            <option value="stars">Most stars</option>
            <option value="updated">
              Recently updated
            </option>
            <option value="name">Name</option>
          </select>

          <select
            className={repoList__select}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">All languages</option>
            {languages.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={repoList__grid}>
        {sortedAndFilteredRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}
