import { useUsers } from '@/hooks/users/useUsers';

export default function UsersPage() {
  const { data: users, isLoading } = useUsers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>GitHub Users</h1>
      <div>
        {users?.map((user) => (
          <div key={user.id}>
            <img
              src={user.avatar_url}
              alt={user.login}
              width={50}
              height={50}
            />
            <a href={`/users/${user.login}`}>
              {user.login}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
