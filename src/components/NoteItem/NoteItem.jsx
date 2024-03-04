import './NoteItem.css'
import { useState } from "react"

export default function NoteItems({ note, handleUpdateNote }) {
  const [noteText, setNoteText] = useState(note.text)
  const [editNote, setEditNote] = useState(false);

  function handleSubmit() {
    handleUpdateNote(note._id, noteText);
    setEditNote(false);
  }

  return (
    <>
    { editNote ?
      <li className="EditNoteForm">
        <input
          type="text"
          name="text"
          value={noteText}
          onChange={(evt) => setNoteText(evt.target.value)}
        />
        <button className='UpdateBtn' onClick={handleSubmit}>Update</button>
        <button onClick={() => setEditNote(false)}>Cancel</button>
      </li>
      :
      <li onClick={() => setEditNote(true)}>{note.text}</li>
    }
    </>
   )
}