import './StageListStep.css'

export default function StageListStep({ stage }) {
  const client = stage.client

  return (
    <div className="StageListStep">
      <div>
        <h1>{stage.name}</h1>
      </div>
      <div>
        <p>client details</p>
      </div>
    </div>
  )
}
