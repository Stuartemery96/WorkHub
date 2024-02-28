import './NewClientForm.css'
import { useState } from "react"

export default function NewClientForm({handleAddClient}) {
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    clientType: '',
    address: '',
    description: '',
    approvalAmt: '',
    listingPrice: '',
    salePrice: '',
    commission: '',
    closeDate: '',
    notes: '',
  })

  async function handleSubmit(evt) {
    evt.preventDefault();
    handleAddClient(newClient);
    setNewClient({
      name: '',
      email: '',
      phone: '',
      clientType: '',
      address: '',
      description: '',
      approvalAmt: '',
      listingPrice: '',
      salePrice: '',
      commission: '',
      closeDate: '',
      notes: '',
    })
  }

  function handleChange(evt) {
    const formNewClient = {...newClient, [evt.target.name]: evt.target.value};
    setNewClient(formNewClient)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <label>Client Name:</label>
        <input
        name="name"
        value={newClient.name}
        required
        />
        <label>Email:</label>
        <input
        name="email"
        value={newClient.email}
        required
        />
        <label>Phone Number:</label>
        <input
        name="phone"
        value={newClient.phone}
        required
        />
        <label>Client Type:</label>
        <input
        name="clientType"
        value={newClient.clientType}
        required
        />
        <label>Address:</label>
        <input
        name="address"
        value={newClient.address}
        />
        <label>Description:</label>
        <input
        name="description"
        value={newClient.description}
        />
        <label>Approval Amount:</label>
        <input
        type="number"
        name="approvalAmt"
        value={newClient.approvalAmt}
        />
        <label>Listing Price:</label>
        <input
        type="number"
        name="listingPrice"
        value={newClient.listingPrice}
        />
        <label>Sale Price:</label>
        <input
        type="number"
        name="salePrice"
        value={newClient.salePrice}
        />
        <label>Commission:</label>
        <input
        type="number"
        name="commission"
        value={newClient.commission}
        />
        <label>Close Date:</label>
        <input
        type="date"
        name="closeDate"
        value={newClient.closeDate}
        />
        <label>Notes:</label>
        <input
        name="notes"
        value={newClient.notes}
        />
        <button type="Submit">Add</button>
      </form>
    </div>
  )
}
