import { useEffect } from "react";
import * as clientsAPI from '../../utilities/clients-api'
import ClientList from "../../components/ClientList/ClientList";

export default function ClientsPage({user, clients, setClients}) {

  useEffect(function() {
    async function getClients() {
      const allClients = await clientsAPI.getAllForUser()
      setClients(allClients);
    }
    getClients();
  }, []);

  return (
    <main>
      <h1>ClientsPage</h1>
      < ClientList clients={clients} />
    </main>
  )
}
