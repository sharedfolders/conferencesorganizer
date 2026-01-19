import { Button } from "./Button";

export function AddSection({
  showAddConferences,
  onShowAddConferences,
  showAddUser,
  onShowAddUser,
}) {
  return (
    <div className="flex gap-4">
      <Button className="btn-primary" onClick={onShowAddUser}>
        {showAddUser ? (
          <>
            <img src="./close-square.svg" alt="X" className="icon" />
            <span>Close</span>
          </>
        ) : (
          <>
            <img src="./add.svg" alt="X" className="icon" />
            <span>New User</span>
          </>
        )}
      </Button>
      <Button
        className="btn-primary"
        onClick={() => onShowAddConferences(!showAddConferences)}
      >
        {showAddConferences ? (
          <>
            <img src="./close-square.svg" alt="X" className="icon" />
            <span>Close</span>
          </>
        ) : (
          <>
            <img src="./add.svg" alt="X" className="icon" />
            <span>New Conf</span>
          </>
        )}
      </Button>
    </div>
  );
}
