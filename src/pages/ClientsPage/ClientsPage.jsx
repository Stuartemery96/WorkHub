import { useEffect } from "react";
import * as clientsAPI from '../../utilities/clients-api'
import ClientList from "../../components/ClientList/ClientList";
import NewClientForm from "../../components/NewClientForm/NewClientForm";

export default function ClientsPage({user, clients, setClients}) {

  useEffect(function() {
    async function getClients() {
      const allClients = await clientsAPI.getAllForUser()
      setClients(allClients);
      console.log(allClients)
    }
    getClients();
  }, []);

  async function handleAddClient(newClient) {
    const client = await clientsAPI.createClient(newClient)
    setClients([...clients, client]);
  }

  return (
    <main>
      <h1>ClientsPage</h1>
      <NewClientForm handleAddClient={handleAddClient} />
      <ClientList clients={clients} />
    </main>
  )
}
