import './StageList.css';
import { useState } from 'react';
import * as stagesAPI from '../../utilities/stages-api'
import StageListStep from '../StageListStep/StageListStep';
import NewStageForm from '../NewStageForm/NewStageForm';


export default function StageList({ stages, setStages, clients, setClients }) {
  const [showNewForm, setShowNewForm] = useState(false);

  const stageSteps = stages.map((stage) => <StageListStep
    key={stage._id}
    stage={stage}
    clients={clients}
    filteredClients={clients.filter(c => c.curStage === stage.sequence && c.clientType === stage.clientType)}
    setClients={setClients}
    stages={stages}
    setStages={setStages}
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
      {showNewForm && 
      <NewStageForm handleAddStage={handleAddStage} setShowNewForm={setShowNewForm} />}      
      {!showNewForm &&
        <button className='AddStageBtn' onClick={() => setShowNewForm(true)}>
          Add Stage
        </button>
      }
      </div>
    </main>
  )
}
