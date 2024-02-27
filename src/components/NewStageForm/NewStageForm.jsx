import './NewStageForm.css'
import { useState } from "react"

export default function NewStageForm({handleAddStage}) {
  const [newStage, setNewStage] = useState({
    name: '',
  })

  async function handleSubmit(evt) {
    evt.preventDefault();
    handleAddStage(newStage);
    setNewStage({
      name: '',
    })
  }

  function handleChange(evt) {
    const formNewStage = {...newStage, [evt.target.name]: evt.target.value};
    setNewStage(formNewStage)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Stage Name</label>
        <input
        name="name"
        value={newStage.name}
        onChange={handleChange}
        required
        />
        <button type="Submit">Add</button>
      </form>
    </div>
  )
}
