import './StagesPage.css'
import StageList from "../../components/StageList/StageList";

export default function StagesPage({ stages, setStages, clients, setClients }) { 


  return (
    <main className="StagesPage">
      <h1>DEALS</h1>
      <StageList stages={stages} setStages={setStages} clients={clients}/>
    </main>
  )
}