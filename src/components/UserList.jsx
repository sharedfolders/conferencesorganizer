import { UserDisplay } from "./UserDisplay";

export function UserList({
  userData,
  selectedUser,
  setSelectedUser,
  onShowConferences,
  showAddConferences,
}) {
  return (
    <ul>
      {userData.map((user, index) => (
        <UserDisplay
          id={user.id}
          key={index}
          name={user.name}
          picture={user.picture}
          conferences={user.conferences}
          onSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
          onShowConferences={onShowConferences}
          showAddConferences={showAddConferences}
        />
      ))}
    </ul>
  );
}
