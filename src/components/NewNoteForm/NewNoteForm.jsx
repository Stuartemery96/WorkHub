import './NewNoteForm.css'
import { useState } from "react"

export default function NewNoteForm({ handleAddNote }) {
  const [newNote, setNewNote] = useState({text: ''});

  async function handleSubmit(evt) {
    evt.preventDefault();
    handleAddNote(newNote);
    setNewNote({text: ''});
  }

  function handleChange(evt) {
    const formNewNote = {...newNote, [evt.target.name]: evt.target.value};
    setNewNote(formNewNote);
  }

  return (
    <div className="NewNoteForm">
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <textarea
        name="text"
        value={newNote.text}
        />
        <button type="Submit">Add</button>
      </form>
    </div>
  );
}
