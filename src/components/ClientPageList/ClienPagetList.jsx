import './ClientPageList.css'
import ClientItems from '../ClientItems/ClientItems';
import * as clientsAPI from '../../utilities/clients-api'


export default function ClientPageList({ clients, filteredClients, setClients, stage, stages }) {
  const clientItems = filteredClients.map((c) => <ClientItems 
    key={c._id} client={c} stages={stages} handleChangeStage={handleChangeStage} />);
  const filteredClientType = filteredClients.filter((c) => c.clientType === stage.clientType).map((c) => <ClientItems
    key={c._id} client={c} stages={stages} handleChangeStage={handleChangeStage} />);
  
  async function handleChangeStage(clientId, newStage) {
    const updatedClient = await clientsAPI.updateClientStage(clientId, newStage);
    const updatedClients = clients.map((c) => c._id === updatedClient._id ? updatedClient : c);
    setClients(updatedClients);
  }
  
  return (
    <div className='ClientPageList'>{stage && stage ? filteredClientType : clientItems}</div>
  )
}
