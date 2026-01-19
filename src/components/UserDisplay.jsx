import { Button } from "./Button";

export function UserDisplay({
  name,
  picture,
  conferences,
  id,
  onSelectedUser,
  selectedUser,
  onShowConferences,
  showAddConferences,
}) {
  return (
    <div className="user-display">
      <img className="pfp" src={picture} alt={name} />
      <div>
        <h5 className="font-medium truncate">{name}</h5>
        <p className="text-sm"> {conferences.length} conferences</p>
      </div>
      <div className="ml-auto">
        {conferences.length != 0 ? (
          <Button
            className="btn-input"
            onClick={() => onSelectedUser(selectedUser === id ? "" : id)}
          >
            {selectedUser === id ? (
              <>
                <img src="./close-square.svg" alt="X" className="icon" />
                <span>Close</span>
              </>
            ) : (
              <>
                <img src="./view-list.svg" alt="X" className="icon" />
                <span>View</span>
              </>
            )}
          </Button>
        ) : (
          <Button
            className="btn-input"
            onClick={() => {
              onSelectedUser(selectedUser === id ? "" : id);
              onShowConferences();
            }}
          >
            {showAddConferences ? (
              <>
                <img src="./close-square.svg" alt="X" className="icon" />
                <span>Close</span>
              </>
            ) : (
              <>
                <img src="./add.svg" alt="X" className="icon" />
                <span>Add</span>
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
