import './NoteItem.css'
import { useState } from "react"

export default function NoteItems({ note, handleUpdateNote, handleDeleteNote }) {
  const [noteText, setNoteText] = useState(note.text)
  const [editNote, setEditNote] = useState(false);

  function handleSubmit() {
    handleUpdateNote(note._id, noteText);
    setEditNote(false);
  }

  function handleDelete() {
    handleDeleteNote(note._id);
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
        <button  className='DeleteBtn' onClick={handleDelete}>❌</button>
      </li>
      :
      <li onClick={() => setEditNote(true)}>{note.text}</li>
    }
    </>
   )
}
