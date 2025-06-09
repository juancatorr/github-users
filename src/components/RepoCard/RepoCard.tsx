import type { GitHubRepo } from '@/types/github';
import { FaCodeBranch, FaStar } from 'react-icons/fa';
import styles from './RepoCard.module.scss';

const {
  'repo-card': repoCard,
  'repo-card__header': repoCard__header,
  'repo-card__name': repoCard__name,
  'repo-card__description': repoCard__description,
  'repo-card__meta': repoCard__meta,
  'repo-card__meta-item': repoCard__meta_item,
  'repo-card__language': repoCard__language,
  'repo-card__language-color': repoCard__language_color,
} = styles;

interface RepoCardProps {
  repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={repoCard}
    >
      <div className={repoCard__header}>
        <h3 className={repoCard__name}>{repo.name}</h3>
        {repo.language && (
          <div className={repoCard__language}>
            <span
              className={repoCard__language_color}
              style={{
                backgroundColor: getLanguageColor(
                  repo.language
                ),
              }}
            />
            {repo.language}
          </div>
        )}
      </div>

      {repo.description && (
        <p className={repoCard__description}>
          {repo.description}
        </p>
      )}

      <div className={repoCard__meta}>
        <span className={repoCard__meta_item}>
          <FaStar /> {repo.stargazers_count}
        </span>
        <span className={repoCard__meta_item}>
          <FaCodeBranch /> {repo.forks_count}
        </span>
      </div>
    </a>
  );
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Java: '#b07219',
    Ruby: '#701516',
    PHP: '#4F5D95',
    CSS: '#563d7c',
    HTML: '#e34c26',
    Go: '#00ADD8',
    Rust: '#dea584',
  };

  return colors[language] || '#6e7681';
}
