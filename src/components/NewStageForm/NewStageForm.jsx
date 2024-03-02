import './NewStageForm.css'
import { useState } from "react"

export default function NewStageForm({handleAddStage, setShowNewForm}) {
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
    <div className='NewStageForm'>
      <form onSubmit={handleSubmit}>
        <div>
          <input
          name="name"
          value={newStage.name}
          onChange={handleChange}
          required
          />
        </div>
        <select
        name="clientType"
        value={newStage.clientType}
        required
        >
          <option value="Buyer">Buyer</option>
          <option value="Seller">Seller</option>
        </select> 
        <div>
          <button type="Submit">Add</button>
          <button onClick={() => setShowNewForm(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
