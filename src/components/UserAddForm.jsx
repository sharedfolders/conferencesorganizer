import { useState } from "react";
import { Button } from "./Button";
import { FormInput } from "./FormInput";

export function UserAddForm({ onAddUser }) {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("https://i.pravatar.cc/48?");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;

    const id = crypto.randomUUID();
    const newUser = { id, name, picture, conferences: [] };

    onAddUser(newUser);

    setName("");
    setPicture("https://i.pravatar.cc/48?");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <FormInput
        placeholder="John P."
        maxLength={16}
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        label="Name"
        className="form-input"
      />

      <FormInput
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
        type="text"
        className="form-input"
        label="Picture Link"
      />
      <Button className="btn-input">
        <>
          <img src="./add.svg" alt="X" className="icon" />
          <span>Add</span>
        </>
      </Button>
    </form>
  );
}
