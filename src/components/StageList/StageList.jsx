import './StageList.css';
import StageListStep from '../StageListStep/StageListStep';


export default function StageList({ stages }) {
  const stageSteps = stages.map((stage) => <StageListStep
    key={stage._id}
    stage={stage}
  />)

  return (
    <main className='StageList'>
      { stages.length ?
        stageSteps
        :
        <span>No Stages</span>
      }
    </main>
  )
}
