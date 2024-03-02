import ClientItems from '../ClientItems/ClientItems';

export default function ClientList({ clients, setClients, stage }) {
  const clientItems = clients.map((c) => <ClientItems key={c._id} client={c} stage={stage} />);
  const filteredClients = clients.filter((c) => c.clientType === stage.clientType).map((c) => <ClientItems key={c._id} client={c} stage={stage} />);
  console.log(clientItems);
  return (
    <>{stage && stage ? filteredClients : clientItems}</>
  )
}
