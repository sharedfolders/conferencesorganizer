import { useState } from "react";
import "./style.css";

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
      <FormInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        label="Name"
        className=""
      />

      <FormInput
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
        type="text"
        className=""
        label="Picture Link"
      />

      <Button>Add</Button>
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

    onAddConference(selectedUser, {
      topic,
      date: selectedDate,
      time: selectedTime,
    });

    setSelectedDate("");
    setSelectedTime("");
    setTopic("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormSelect
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        label="Who"
        className=""
      >
        {users.map((user) => (
          <option value={user.id} key={user.id}>
            {user.name}
          </option>
        ))}
      </FormSelect>

      <FormInput
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        type="date"
        label="Date"
        className=""
      />

      <FormInput
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        type="time"
        label="Time"
        className=""
      />

      <FormInput
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        type="text"
        label="Topic"
        className=""
      />

      <Button className={""}>Add</Button>
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
                  <span>
                    {conference.topic} - {conference.date} - {conference.time}
                  </span>
                </div>
              </li>
            )),
        )}
      </ul>
    </div>
  );
}

function UserList({
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

function UserDisplay({
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
    <div>
      <img src={picture} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>Attending {conferences.length} conferences</p>
      </div>

      {conferences.length != 0 ? (
        <Button onClick={() => onSelectedUser(selectedUser === id ? "" : id)}>
          {selectedUser === id ? "Close" : "Check"}
        </Button>
      ) : (
        <Button
          onClick={() => {
            onSelectedUser(selectedUser === id ? "" : id);
            onShowConferences();
          }}
        >
          {showAddConferences ? "Close" : "Add Now !"}
        </Button>
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

function Button({ children, onClick, className }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const userData = [
    {
      id: "118839",
      name: "Jennifer",
      picture: "https://i.pravatar.cc/48?u=118839",
      conferences: [
        { topic: "Right of robots", time: "08:15", date: "2026-10-07" },
        {
          topic: "John Pork : A telecommunication experience",
          time: "08:30",
          date: "2026-10-19",
        },
        {
          topic: "How to make a site",
          time: "09:30",
          date: "2026-12-27",
        },
      ],
    },
    {
      id: "112341",
      name: "Mark",
      picture: "https://i.pravatar.cc/48?u=112341",
      conferences: [
        { topic: "Right of robots", time: "08:15", date: "2026-10-07" },
        {
          topic: "John Pork : A telecommunication experience",
          time: "08:30",
          date: "2026-10-19",
        },
      ],
    },
    {
      id: "158584",
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

  function handleAddConference(userId, newConference) {
    setUsers((users) =>
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              conferences: [...user.conferences, newConference],
            }
          : user,
      ),
    );
  }

  return (
    <>
      <div>
        <AddSection
          onShowAddUser={handleShowUser}
          showAddUser={showAddUser}
          onShowAddConferences={handleShowConferences}
          showAddConferences={showAddConferences}
        />
      </div>
      <div>
        <UserList
          userData={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          onShowConferences={handleShowConferences}
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
      </div>

      <div>
        {selectedUser !== "" && (
          <ConferencesItem
            users={users}
            selectedUser={selectedUser}
            setUsers={setUsers}
          />
        )}
      </div>
    </>
  );
}

function FormInput({ value, onChange, type, label, className }) {
  return (
    <div className={className}>
      <label>{label}</label>
      <input value={value} onChange={onChange} type={type}></input>
    </div>
  );
}

function FormSelect({ value, onChange, label, children, className }) {
  return (
    <div className={className}>
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {children}
      </select>
    </div>
  );
}

export default App;
