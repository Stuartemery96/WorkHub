import './StageListStep.css'

export default function StageListStep({ stage }) {
  

  return (
    <div className="StageListStep">
      <div>
        <h2>{stage.name}</h2>
      </div>
      <div>
        {stage.clients.lentgh ?
        <clientList />
        :
        <p>No Clients in Stage</p>
        }
      </div>
    </div>
  )
}
