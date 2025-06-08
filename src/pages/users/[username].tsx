import { Layout } from '@/components/Layout';
import { RepoList } from '@/components/RepoList';
import { UserProfile } from '@/components/UserProfile';
import { useUserDetails } from '@/hooks/users/useUserDetails';
import { useUserRepos } from '@/hooks/users/useUserRepos';
import { prefetchUserData } from '@/utils/prefetch';
import {
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';

type Props = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export default function UserPage({ username }: Props) {
  const { data: user, isLoading: isLoadingUser } =
    useUserDetails(username);
  const { data: repos, isLoading: isLoadingRepos } =
    useUserRepos(username);

  return (
    <Layout>
      {isLoadingUser ? (
        <div>Loading user...</div>
      ) : user ? (
        <UserProfile user={user} />
      ) : (
        <div>User not found</div>
      )}

      {isLoadingRepos ? (
        <div>Loading repositories...</div>
      ) : repos ? (
        <RepoList repos={repos} />
      ) : null}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  username: string;
}> = async ({ params }) => {
  const username = params?.username as string;
  if (!username) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();

  await prefetchUserData(queryClient, username);

  return {
    props: {
      username,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
