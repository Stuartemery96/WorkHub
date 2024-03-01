import './EditClientForm.css'
import { useState } from "react"

export default function EditClientForm({client, setEdit, handleUpdateClient}) {
  const [updatedClient, setUpdatedClient] = useState({
    name: client.name,
    email: client.email,
    phone: client.phone,
    clientType: client.clientType,
    address: client.address,
    description: client.description,
    approvalAmt: client.approvalAmt,
    listingPrice: client.listingPrice,
    salePrice: client.salePrice,
    commission: client.commission,
    closeDate: client.closeDate,
  })

  async function handleSubmit(evt) {
    evt.preventDefault();
    handleUpdateClient(updatedClient);
    setUpdatedClient({
      name: client.name,
      email: client.email,
      phone: client.phone,
      clientType: client.clientType,
      address: client.address,
      description: client.description,
      approvalAmt: client.approvalAmt,
      listingPrice: client.listingPrice,
      salePrice: client.salePrice,
      commission: client.commission,
      closeDate: client.closeDate,
    })
  }

  function handleChange(evt) {
    const formUpdatedClient = {...updatedClient, [evt.target.name]: evt.target.value};
    setUpdatedClient(formUpdatedClient)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <label>*Client Name:</label>
        <input
        name="name"
        value={updatedClient.name}
        required
        />
        <label>*Email:</label>
        <input
        name="email"
        value={updatedClient.email}
        required
        />
        <label>*Phone Number:</label>
        <input
        name="phone"
        value={updatedClient.phone}
        pattern='[/^[0-9]{10}$/g]'
        required
        />
        <label>*Client Type:</label>
        <input
        name="clientType"
        value={updatedClient.clientType}
        required
        />
        <label>Address:</label>
        <input
        name="address"
        value={updatedClient.address}
        />
        <label>Description:</label>
        <input
        name="description"
        value={updatedClient.description}
        />
        <label>Approval Amount:</label>
        <input
        type="number"
        name="approvalAmt"
        value={updatedClient.approvalAmt}
        />
        <label>Listing Price:</label>
        <input
        type="number"
        name="listingPrice"
        value={updatedClient.listingPrice}
        />
        <label>Sale Price:</label>
        <input
        type="number"
        name="salePrice"
        value={updatedClient.salePrice}
        />
        <label>Commission:</label>
        <input
        type="number"
        name="commission"
        value={updatedClient.commission}
        />
        <label>Close Date:</label>
        <input
        type="date"
        name="closeDate"
        value={updatedClient.closeDate}
        />
        <button type="Submit">Update</button>
        <button onClick={() => setEdit(false)}>Cancel</button>
      </form>
    </div>
  )
}