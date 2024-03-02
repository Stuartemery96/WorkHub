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
    <div className='EditClientForm'>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <div>
          <label>Client Name:*</label>
          <input
          name="name"
          value={updatedClient.name}
          required
          />
        </div>
        <div>
          <label>Email:*</label>
          <input
          name="email"
          value={updatedClient.email}
          required
          />
        </div>
        <div>
        <label>Phone Number:*</label>
          <input
          name="phone"
          value={updatedClient.phone}
          pattern='[/^[0-9]{10}$/g]'
          required
          />
        </div>
        <div>
          <label>Client Type:*</label>
          <input
          name="clientType"
          value={updatedClient.clientType}
          required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
          name="address"
          value={updatedClient.address}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
          name="description"
          value={updatedClient.description}
          />
        </div>
        <div>
          <label>Approval Amount:</label>
          <input
          type="number"
          name="approvalAmt"
          value={updatedClient.approvalAmt}
          />
        </div>
        <div>
          <label>Listing Price:</label>
          <input
          type="number"
          name="listingPrice"
          value={updatedClient.listingPrice}
          />
        </div>
        <div>
          <label>Sale Price:</label>
          <input
          type="number"
          name="salePrice"
          value={updatedClient.salePrice}
          />
        </div>
        <div>
          <label>Commission:</label>
          <input
          type="number"
          name="commission"
          value={updatedClient.commission}
          />
        </div>
        <div>
          <label>Close Date:</label>
          <input
          type="date"
          name="closeDate"
          value={updatedClient.closeDate}
          />
        </div>
        <div>
          <button className='SubmitBtn' type="Submit">Update</button>
          <button onClick={() => setEdit(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}