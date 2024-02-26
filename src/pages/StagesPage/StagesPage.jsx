import { useState, useEffect } from "react";
import * as stagesAPI from '../../utilities/stages-api'
import './StagesPage.css'
import StageList from "../../components/StageList/StageList";
import NewStageForm from "../../components/NewStageForm/NewStageForm";

export default function StagesPage({ user }) {
  const [stages, setStages] = useState([]);
  const [showNewForm, setShowNewForm] = useState(false);

  useEffect(function() {
    async function getStages() {
      const allStages = await stagesAPI.getAllForUser()
      setStages(allStages);
    }
    getStages();
  }, []);

  async function handleAddStage(newStage) {
    const stage = await stagesAPI.createStage(newStage)
    setStages([...stages, stage]);
  }

  return (
    <main className="StagesPage">
      <h1>StagesPage</h1>
      <StageList stages={stages}/>
      <button onClick={() => setShowNewForm
      (!showNewForm)}>
        {showNewForm ? 'Cancel' : 'Add Stage'}
      </button>
      {showNewForm && 
      <NewStageForm handleAddStage={handleAddStage} />}
    </main>
  )
}