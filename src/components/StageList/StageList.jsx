import './StageList.css';
import { useState } from 'react';
import * as stagesAPI from '../../utilities/stages-api'
import StageListStep from '../StageListStep/StageListStep';
import NewStageForm from '../NewStageForm/NewStageForm';


export default function StageList({ stages, setStages, clients }) {
  const [showNewForm, setShowNewForm] = useState(false);

  const stageSteps = stages.map((stage) => <StageListStep
    key={stage._id}
    stage={stage}
    clients={clients.filter(c => c.curStage === stage.sequence)}
  />)

  async function handleAddStage(newStage) {
    const stage = await stagesAPI.createStage(newStage)
    setStages([...stages, stage]);
  }

  return (
    <main className='StageList'>
      { stages.length ?
        stageSteps
        :
        <p>No Stages</p>
      }
      <div className="NewForm">
      <button onClick={() => setShowNewForm
      (!showNewForm)}>
        {showNewForm ? 'Cancel' : 'Add Stage'}
      </button>
      {showNewForm && 
      <NewStageForm handleAddStage={handleAddStage} />}      
      </div>
    </main>
  )
}
