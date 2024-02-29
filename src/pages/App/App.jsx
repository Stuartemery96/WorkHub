import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import StagesPage from '../StagesPage/StagesPage';
import ClientsPage from '../ClientsPage/ClientsPage'
import ClientDetailPage from '../ClientDetailPage/ClientDetailPage';


export default function App() {
  const [stages, setStages] = useState([]);
  const [user, setUser] = useState(getUser());
  const [clients, setClients] = useState([]);

  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* Route Components in here */}
            <Route path="/" element={<StagesPage
              stages={stages}
              setStages={setStages}
              user={user}
              clients={clients}
              setClients={setClients}
              />}
            />
            <Route path="/clients" element=
              {<ClientsPage
                user={user}
                clients={clients}
                setClients={setClients}
              />}
            />
            <Route path='/clients/:clientId' element={<ClientDetailPage
              user={user}
              clients={clients}
              setClients={setClients}
              stages={stages}
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
