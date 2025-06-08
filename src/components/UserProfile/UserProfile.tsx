import type { GitHubUserDetails } from '@/types/github';
import Image from 'next/image';
import {
  FaBuilding,
  FaLink,
  FaMapMarkerAlt,
  FaTwitter,
} from 'react-icons/fa';
import { FavoriteButton } from '../FavoriteButton';
import styles from './UserProfile.module.scss';

const {
  'user-profile': userProfile,
  'user-profile__header': userProfile__header,
  'user-profile__avatar': userProfile__avatar,
  'user-profile__info': userProfile__info,
  'user-profile__name': userProfile__name,
  'user-profile__username': userProfile__username,
  'user-profile__bio': userProfile__bio,
  'user-profile__meta': userProfile__meta,
  'user-profile__meta-item': userProfile__meta_item,
  'user-profile__stats': userProfile__stats,
  'user-profile__stat': userProfile__stat,
  'user-profile__stat-label': userProfile__stat_label,
  'user-profile__stat-value': userProfile__stat_value,
} = styles;

interface UserProfileProps {
  user: GitHubUserDetails;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className={userProfile}>
      <div className={userProfile__header}>
        <Image
          src={user.avatar_url}
          alt={user.login}
          width={150}
          height={150}
          className={userProfile__avatar}
          priority
        />
        <div className={userProfile__info}>
          <div>
            <h1 className={userProfile__name}>
              {user.name || user.login}
            </h1>
            <a
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className={userProfile__username}
            >
              @{user.login}
            </a>
          </div>
          <FavoriteButton user={user} size={32} />
        </div>
      </div>

      {user.bio && (
        <p className={userProfile__bio}>{user.bio}</p>
      )}

      <div className={userProfile__meta}>
        {user.location && (
          <span className={userProfile__meta_item}>
            <FaMapMarkerAlt /> {user.location}
          </span>
        )}
        {user.company && (
          <span className={userProfile__meta_item}>
            <FaBuilding /> {user.company}
          </span>
        )}
        {user.blog && (
          <a
            href={
              user.blog.startsWith('http')
                ? user.blog
                : `https://${user.blog}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className={userProfile__meta_item}
          >
            <FaLink /> {user.blog}
          </a>
        )}
        {user.twitter_username && (
          <a
            href={`https://twitter.com/${user.twitter_username}`}
            target="_blank"
            rel="noopener noreferrer"
            className={userProfile__meta_item}
          >
            <FaTwitter /> @{user.twitter_username}
          </a>
        )}
      </div>

      <div className={userProfile__stats}>
        <div className={userProfile__stat}>
          <span className={userProfile__stat_value}>
            {user.followers}
          </span>
          <span className={userProfile__stat_label}>
            followers
          </span>
        </div>
        <div className={userProfile__stat}>
          <span className={userProfile__stat_value}>
            {user.following}
          </span>
          <span className={userProfile__stat_label}>
            following
          </span>
        </div>
        <div className={userProfile__stat}>
          <span className={userProfile__stat_value}>
            {user.public_repos}
          </span>
          <span className={userProfile__stat_label}>
            repositories
          </span>
        </div>
      </div>
    </div>
  );
}
