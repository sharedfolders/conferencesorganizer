import { useState } from "react";
import { AddSection } from "./components/AddSection";
import { UserList } from "./components/UserList";
import { ConferencesItem } from "./components/ConferencesItem";
import { ConferencesAddForm } from "./components/ConferencesAddForm";
import { UserAddForm } from "./components/UserAddForm";
import { Footer } from "./components/Footer";
import { TitleBar } from "./components/TitleBar";
import "./styles.css";

function App() {
  const userData = [
    {
      id: "118839",
      name: "Mark S.",
      picture: "https://i.pravatar.cc/48?u=118839",
      conferences: [
        { topic: "Work and Life Balance", time: "08:15", date: "2026-10-07" },
        {
          topic: "Micromanagement : Ain't so bad ?",
          time: "08:30",
          date: "2026-10-19",
        },
        {
          topic: "How to put Paperclips properly",
          time: "09:30",
          date: "2026-12-27",
        },
      ],
    },
    {
      id: "112341",
      name: "Helly R.",
      picture: "https://i.pravatar.cc/48?u=112341",
      conferences: [
        { topic: "Lumon Lunch Experience", time: "08:15", date: "2026-10-07" },
        {
          topic: "Winter holidays : Break the ice !",
          time: "08:30",
          date: "2026-10-19",
        },
      ],
    },
    {
      id: "158584",
      name: "Irving B.",
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
    setShowAddUser(false);
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
    setShowAddConferences(false);
  }

  return (
    <>
      <TitleBar />
      <div className="button-bar">
        <AddSection
          onShowAddUser={handleShowUser}
          showAddUser={showAddUser}
          onShowAddConferences={handleShowConferences}
          showAddConferences={showAddConferences}
        />
      </div>
      <div className="main-section">
        <div className="user-list">
          <UserList
            userData={users}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            onShowConferences={handleShowConferences}
            showAddConferences={showAddConferences}
          />
        </div>
        <div className="forms-section">
          {showAddUser && (
            <UserAddForm onAddUser={handleNewUser} users={users} />
          )}
          {showAddConferences && (
            <ConferencesAddForm
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              users={users}
              onAddConference={handleAddConference}
            />
          )}
        </div>
      </div>

      <div className="flex items-center justify-center">
        {selectedUser !== "" && (
          <ConferencesItem
            users={users}
            selectedUser={selectedUser}
            setUsers={setUsers}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
