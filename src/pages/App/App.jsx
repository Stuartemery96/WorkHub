import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import * as stagesAPI from '../../utilities/stages-api'
import * as clientsAPI from '../../utilities/clients-api'
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import StagesPage from '../StagesPage/StagesPage';
import ClientsPage from '../ClientsPage/ClientsPage'
import ClientDetailPage from '../ClientDetailPage/ClientDetailPage';


export default function App() {
  const [user, setUser] = useState(getUser());
  const [stages, setStages] = useState([]);
  const [selectedClientType, setSelectedClientType] = useState('Buyer');
  const [clients, setClients] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(function() {
    if (user) {
      async function getStages() {
        const allStages = await stagesAPI.getAllForUser();
        setStages(allStages);
      }
      getStages();
      async function getClients() {
        const allClients = await clientsAPI.getAllForUser();
        setClients(allClients);
      }
      getClients();
    } else {
      setClients([]);
      setStages([]);
    }
  }, [user]);


  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* Route Components in here */}
            <Route path="/" element={<StagesPage
              stages={stages}
              selectedClientType={selectedClientType}
              setSelectedClientType={setSelectedClientType}
              setStages={setStages}
              user={user}
              clients={clients}
              setClients={setClients}
              />}
            />
            <Route path="/clients" element={<ClientsPage
                user={user}
                clients={clients}
                setClients={setClients}
                stage={false}
              />}
            />
            <Route path='/clients/:clientId' element={<ClientDetailPage
              clients={clients}
              setClients={setClients}
              stages={stages}
              notes={notes}
              setNotes={setNotes}
              />}
            />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}
