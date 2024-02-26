import { useState, useEffect } from "react";
import * as stagesAPI from '../../utilities/stages-api'
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

  async function handleAddStage(newStage) {
    const stage = await stagesAPI.createStage(newStage)
    setStages([...stages, stage]);
  }

  return (
    <main>
      <h1>StagesPage</h1>
      <StageList stages={stages}/>
      <NewStageForm handleAddStage={handleAddStage} />
    </main>
  )
}