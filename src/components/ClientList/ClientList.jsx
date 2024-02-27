export default function ClientList({ clients }) {
  const clientItems = clients.map((c) => <div key={c._id}>{c.name}</div>)

  return (
    <>{clientItems}</>
  )
}
