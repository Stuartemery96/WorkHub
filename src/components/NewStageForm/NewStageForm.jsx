import { useState } from "react"

export default function NewStageForm({handleAddStage}) {
  const [newStage, setNewStage] = useState({
    name: '',
    clientType: ''
  })

  async function handleSubmit(evt) {
    evt.preventDefault();
    handleAddStage(newStage);
    setNewStage({
      name: '',
      clientType: ''
    })
  }

  function handleChange(evt) {
    const formNewStage = {...newStage, [evt.target.name]: evt.target.value};
    setNewStage(formNewStage)
  }

  return (
    <div>
      <h2>Add Stage</h2>
      <form onSubmit={handleSubmit}>
        <label>Stage Name</label>
        <input
        name="name"
        value={newStage.name}
        onChange={handleChange}
        required
        />
        <label>Client Type</label>
        <input 
        name="clientType"
        value={newStage.clientType}
        onChange={handleChange}
        required
        />
        <button type="Submit">Add</button>
      </form>
    </div>
  )
}
