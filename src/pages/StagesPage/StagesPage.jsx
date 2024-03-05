import './StagesPage.css'
import { useState } from 'react';
import StageList from "../../components/StageList/StageList";

export default function StagesPage({ stages, setStages, clients, setClients, selectedClientType, setSelectedClientType }) { 
  const [showNewForm, setShowNewForm] = useState(false);
  const filteredStages = stages.filter((s) => s.clientType === selectedClientType)

  function handleSelectClientType() {
    selectedClientType === 'Seller' ?
    setSelectedClientType('Buyer')
    :
    setSelectedClientType('Seller');
    setShowNewForm(false);
  }

  return (
    <main className="StagesPage">
      <h1>DEALS</h1>
      {selectedClientType === 'Buyer' ?
      <button onClick={handleSelectClientType}>SELLERS</button>
      :
      <button onClick={handleSelectClientType}>BUYERS</button>
      }
      <StageList selectedClientType={selectedClientType} stages={filteredStages} setStages={setStages} clients={clients} setClients={setClients} showNewForm={showNewForm} setShowNewForm={setShowNewForm} />
    </main>
  )
}