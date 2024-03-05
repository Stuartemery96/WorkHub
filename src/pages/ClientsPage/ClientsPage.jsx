import './ClientsPage.css'
import { useEffect } from "react";
import * as clientsAPI from '../../utilities/clients-api'
import ClientPageList from "../../components/ClientPageList/ClienPagetList";
import NewClientForm from "../../components/NewClientForm/NewClientForm";

export default function ClientsPage({ clients, setClients, stage, stages }) {

  useEffect(function() {
    async function getClients() {
      const allClients = await clientsAPI.getAllForUser()
      setClients(allClients);
    }
    getClients();
  }, [setClients]);

  async function handleAddClient(newClient) {
    const client = await clientsAPI.createClient(newClient)
    setClients([...clients, client]);
  }

  return (
    <main className="ClientsPage">
      <h1>ClientsPage</h1>
      <span><NewClientForm handleAddClient={handleAddClient} /></span>
      <span className='Clients'>
        <ClientPageList clients={clients} stage={stage} stages={stages} filteredClients={clients} setClients={setClients}/>
      </span>
    </main>
  )
}
