export default function StageListStep({ stage }) {
  const client = stage.client

  return (
    <div>
      <div>
        <h1>{stage.name}</h1>
      </div>
    </div>
  )
}
