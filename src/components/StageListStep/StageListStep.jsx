import './StageListStep.css'
import ClientList from '../ClientList/ClientList'

export default function StageListStep({ stage, clients }) {


  return (
    <div className="StageListStep">
      <div>
        <h2>{stage.name}</h2>
      </div>
      <div>
        {clients.length ?
        <ClientList clients={clients}/>
        :
        <p>No Clients in Stage</p>
        }
      </div>
    </div>
  )
}
