import { useState, useEffect } from "react";
import * as stagesAPI from '../../utilities/stages-api'
import './StagesPage.css'
import StageList from "../../components/StageList/StageList";
import NewStageForm from "../../components/NewStageForm/NewStageForm";

export default function StagesPage({ user }) {
  const [stages, setStages] = useState([]);
 

  useEffect(function() {
    async function getStages() {
      const allStages = await stagesAPI.getAllForUser()
      setStages(allStages);
    }
    getStages();
  }, []);



  return (
    <main className="StagesPage">
      <h1>StagesPage</h1>
      <StageList stages={stages} setStages={setStages}/>
    </main>
  )
}