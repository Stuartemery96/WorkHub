import './StagesPage.css'
import StageList from "../../components/StageList/StageList";

export default function StagesPage({ stages, setStages, clients, setClients, selectedClientType, setSelectedClientType }) { 
  const filteredStages = stages.filter((s) => s.clientType === selectedClientType)

  return (
    <main className="StagesPage">
      <h1>DEALS</h1>
      {selectedClientType === 'Buyer' ?
      <button onClick={() => setSelectedClientType('Seller')}>SELLERS</button>
      :
      <button onClick={() => setSelectedClientType('Buyer')}>BUYERS</button>
      }
      <StageList stages={filteredStages} setStages={setStages} clients={clients} setClients={setClients} />
    </main>
  )
}