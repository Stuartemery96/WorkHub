import './ClientItems.css'

export default function ClientItems({ client }) {
  return (
    <div className="ClientItems">
      <div>
        <h2>{client.name}</h2>
      </div>
      <div className="left">
        <p>Approved for: ${client.approvalAmt ? client.approvalAmt :
          'N/A'}</p>
        <p>Commission: ${client.commission ? client.commission :
          'N/A'}</p>
        <p>Closing Date: ${client.closingDate ? client.closeDate :
          'N/A'}</p>
      </div>
    </div>
  )
}
