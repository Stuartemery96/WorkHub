import './ClientItems.css'

export default function ClientItems({ client }) {
  return (
    <div className="ClientItems">
      <div>
        <h2>{client.name}</h2>
        <p><strong>{client.clientType}</strong></p>
      </div>
      <div className="left">
        {client.clientType === 'Buyer' ?
        <p><strong>Approved for: </strong>${client.approvalAmt ?
          client.approvalAmt :
          'N/A'}</p>
          :
        <p><strong>Listing Price: </strong>${client.listingPrice ?
          client.listingPrice :
          'N/A'}</p>
        }   
        <p><strong>Commission: </strong>${client.commission ? client.commission :
          'N/A'}</p>
        <p><strong>Closing Date: </strong>{client.closeDate ? new Date(client.closeDate).toDateString() :
          'N/A'}</p>
      </div>
    </div>
  )
}
