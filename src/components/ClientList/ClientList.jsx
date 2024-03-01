import ClientItems from '../ClientItems/ClientItems';

export default function ClientList({ clients, setClients }) {
  const clientItems = clients.map((c) => <ClientItems key={c._id} client={c} />)

  return (
    <>{clientItems}</>
  )
}
