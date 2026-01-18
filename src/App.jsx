import { React, useState } from "react";

function UserAddForm({ onAddUser }) {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("https://i.pravatar.cc/48?");

  function handleSubmit(e) {
    e.preventDefault();

    const id = crypto.randomUUID();
    const newUser = { id, name, picture, conferences: [] };

    onAddUser(newUser);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />

      <label>Picture link</label>
      <input
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
        type="text"
      />

      <button>Add</button>
    </form>
  );
}

function ConferencesAddForm({
  users,
  selectedUser,
  setSelectedUser,
  onAddConference,
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [topic, setTopic] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !topic) return;

    const formattedAnswer = `${topic} - ${selectedTime} - ${selectedDate}`;

    onAddConference(selectedUser, formattedAnswer);

    setSelectedDate("");
    setSelectedTime("");
    setTopic("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Who</label>
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        {users.map((user) => (
          <option key={user.id}>{user.name}</option>
        ))}
      </select>

      <label>What date</label>
      <input
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        type="date"
      ></input>

      <label>What time</label>
      <input
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        type="time"
      ></input>

      <label>What topic</label>
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        type="text"
      ></input>

      <button>Add</button>
    </form>
  );
}

function ConferencesItem({ users, selectedUser, setUsers }) {
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
    <div>
      <ul>
        {users.map(
          (user) =>
            user.id === selectedUser &&
            user.conferences.map((conference, i) => (
              <li key={i}>
                <div>
                  <Button onClick={() => handleConferenceDeletion(i)}>X</Button>
                  <span>{conference}</span>
                </div>
              </li>
            )),
        )}
      </ul>
    </div>
  );
}

function UserList({ userData, selectedUser, setSelectedUser }) {
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
        />
      ))}
    </ul>
  );
}

function UserDisplay({
  name,
  picture,
  conferences,
  id,
  onSelectedUser,
  selectedUser,
}) {
  return (
    <div>
      <img src={picture} alt={name} />
      <h3>{name}</h3>
      <p>Attending {conferences.length} conferences</p>
      {conferences.length != 0 ? (
        <Button onClick={() => onSelectedUser(selectedUser === id ? "" : id)}>
          {selectedUser === id ? "Close" : "Check"}
        </Button>
      ) : (
        <p>Add conferences now !</p>
      )}
    </div>
  );
}

function AddSection({
  showAddConferences,
  onShowAddConferences,
  showAddUser,
  onShowAddUser,
}) {
  return (
    <div>
      <Button onClick={onShowAddUser}>
        {showAddUser ? "Close" : "Add User"}
      </Button>
      <Button onClick={() => onShowAddConferences(!showAddConferences)}>
        {showAddConferences ? "Close" : "Add Conferences"}
      </Button>
    </div>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

function App() {
  const userData = [
    {
      id: 118839,
      name: "Jennifer",
      picture: "https://i.pravatar.cc/48?u=118839",
      conferences: [
        "Right of robots - 08:15 - 2026-10-07",
        "John Pork : A telecommunication experience - 08:30 - 2026-10-19",
        "How to make a site - 09:30 - 2026-12-27",
      ],
    },
    {
      id: 112341,
      name: "Mark",
      picture: "https://i.pravatar.cc/48?u=112341",
      conferences: [
        "Right of robots - 08:15 - 2026-10-07",
        "John Pork : A telecommunication experience - 08:30 - 2026-10-19",
      ],
    },
    {
      id: 158584,
      name: "Sam",
      picture: "https://i.pravatar.cc/48?u=158584",
      conferences: [],
    },
  ];

  const [users, setUsers] = useState(userData);
  const [selectedUser, setSelectedUser] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddConferences, setShowAddConferences] = useState(false);

  function handleShowUser() {
    setShowAddConferences(false);
    showAddUser ? setShowAddUser(false) : setShowAddUser(true);
  }

  function handleShowConferences() {
    setShowAddUser(false);
    showAddConferences
      ? setShowAddConferences(false)
      : setShowAddConferences(true);
  }

  function handleNewUser(newUser) {
    setUsers((users) => [...users, newUser]);
  }

  function handleAddConference(userName, newConference) {
    const userId = users.find((user) => user.name === userName)?.id;

    setUsers((users) =>
      users.map((user) =>
        user.id === userId
          ? { ...user, conferences: [...user.conferences, newConference] }
          : user,
      ),
    );
  }

  return (
    <>
      <UserList
        userData={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <AddSection
        onShowAddUser={handleShowUser}
        showAddUser={showAddUser}
        onShowAddConferences={handleShowConferences}
        showAddConferences={showAddConferences}
      />
      {showAddUser && <UserAddForm onAddUser={handleNewUser} users={users} />}
      {showAddConferences && (
        <ConferencesAddForm
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          users={users}
          onAddConference={handleAddConference}
        />
      )}

      {selectedUser !== "" && (
        <ConferencesItem
          users={users}
          selectedUser={selectedUser}
          setUsers={setUsers}
        />
      )}
    </>
  );
}

export default App;
