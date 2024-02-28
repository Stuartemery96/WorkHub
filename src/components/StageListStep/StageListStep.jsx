import './StageListStep.css'
import ClientList from '../ClientList/ClientList'

export default function StageListStep({ stage, clients }) {
  const gsv = clients.reduce((total, client) => client.salePrice <= 0 ? total : total + client.salePrice, 0);
  const gci = clients.reduce((total, client) => client.commission <= 0 ? total : total + client.commission, 0);

  return (
    <div className="StageListStep">
      <div className="header">
        <h2>{stage.name}</h2>
      </div>
      <div className="clientList">
        {clients.length ?
        <ClientList clients={clients}/>
        :
        <p>No Clients in Stage</p>
        }
      </div>
      <div className="footer">
        <p>Total Sales Volume: ${gsv.toLocaleString('en-US', 
        {maximumFractionDigits:2})}</p>
        <p>Total Commission Volume: ${gci.toLocaleString('en-US', 
        {maximumFractionDigits:2})}</p>
      </div>
    </div>
  )
}
