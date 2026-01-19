import { Button } from "./Button";

export function ConferencesItem({ users, selectedUser, setUsers }) {
  function handleConferenceDeletion(index) {
    setUsers((users) =>
      users.map((user) =>
        user.id === selectedUser
          ? {
              ...user,
              conferences: user.conferences.filter((_, i) => i !== index),
            }
          : user,
      ),
    );
  }

  return (
    <ul className="flex flex-wrap justify-center gap-4 ">
      {users.map(
        (user) =>
          user.id === selectedUser &&
          user.conferences.map((conference, i) => (
            <li key={i}>
              <div className="conference-list">
                <Button
                  className={"btn-delete"}
                  onClick={() => handleConferenceDeletion(i)}
                >
                  {<img src="./close-square.svg" alt="X" className="w-5 h-5" />}
                </Button>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{conference.topic}</span>
                  <span className="text-xs">
                    {conference.date} - {conference.time}
                  </span>
                </div>
              </div>
            </li>
          )),
      )}
    </ul>
  );
}
