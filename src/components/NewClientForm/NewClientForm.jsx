import './NewClientForm.css'
import { useState } from "react"

export default function NewClientForm({handleAddClient}) {
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    clientType: 'Buyer',
    address: '',
    description: '',
    approvalAmt: '',
    listingPrice: '',
    salePrice: '',
    commission: '',
    closeDate: '',
  });

  async function handleSubmit(evt) {
    evt.preventDefault();
    handleAddClient(newClient);
    setNewClient({
      name: '',
      email: '',
      phone: '',
      clientType: 'Buyer',
      address: '',
      description: '',
      approvalAmt: '',
      listingPrice: '',
      salePrice: '',
      commission: '',
      closeDate: '',
    });
  }

  function handleChange(evt) {
    const formNewClient = {...newClient, [evt.target.name]: evt.target.value};
    setNewClient(formNewClient)
  }

  return (
    <div className='NewClientForm'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>*Client Name:</label>
          <input
          name="name"
          value={newClient.name}
          onChange={handleChange}
          required
          />
        </div>
        <div>
          <label>*Email:</label>
          <input
          name="email"
          value={newClient.email}
          onChange={handleChange}
          required
          />
        </div>
        <div>
          <label>*Phone Number:</label>
          <input
          name="phone"
          value={newClient.phone}
          onChange={handleChange}
          pattern='[/^[0-9]{10}$/g]'
          required
          />
        </div>
        <div>
          <label>*Client Type:</label>
          <select
          name="clientType"
          value={newClient.clientType}
          onChange={handleChange}
          required
          >
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
        </div>
        <div>
          <label>Address:</label>
          <input
          name="address"
          value={newClient.address}
          onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
          name="description"
          value={newClient.description}
          onChange={handleChange}
          />
        </div>
        <div>
          <label>Approval Amount:</label>
          <input
          type="number"
          name="approvalAmt"
          value={newClient.approvalAmt}
          onChange={handleChange}
          />
        </div>
        <div>
          <label>Listing Price:</label>
          <input
          type="number"
          name="listingPrice"
          value={newClient.listingPrice}
          onChange={handleChange}
          />
        </div>
        <div>
          <label>Sale Price:</label>
          <input
          type="number"
          name="salePrice"
          value={newClient.salePrice}
          onChange={handleChange}
          />
        </div>
        <div>
          <label>Commission:</label>
          <input
          type="number"
          name="commission"
          value={newClient.commission}
          onChange={handleChange}
          />
        </div>
        <div>
          <label>Close Date:</label>
          <input
          type="date"
          name="closeDate"
          value={newClient.closeDate}
          onChange={handleChange}
          />
        </div>
        <button type="Submit">ADD CLIENT</button>
      </form>
    </div>
  )
}
