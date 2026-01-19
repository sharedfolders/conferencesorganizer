import { useState } from "react";
import { Button } from "./Button";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";

export function ConferencesAddForm({
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
    <form className="form" onSubmit={handleSubmit}>
      <FormSelect
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        label="Who"
        className="form-input"
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
        className="form-input"
      />

      <FormInput
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        type="time"
        label="Time"
        className="form-input"
      />

      <FormInput
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        type="text"
        label="Topic"
        className="form-input"
        placeholder="Interesting topic"
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
