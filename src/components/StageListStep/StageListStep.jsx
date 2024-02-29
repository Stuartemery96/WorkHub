import './StageListStep.css'
import * as stagesAPI from '../../utilities/stages-api'
import { useState } from 'react';
import ClientList from '../ClientList/ClientList'

export default function StageListStep({ stage, clients, stages, setStages }) {
  const [stageName, setStageName] = useState(stage.name);
  const [edit, setEdit] = useState(false);

  const gsv = clients.reduce((total, client) => client.salePrice <= 0 ? total : total + client.salePrice, 0);
  const gci = clients.reduce((total, client) => client.commission <= 0 ? total : total + client.commission, 0);

  async function handleUpdate() {
    // const s = {name: stageName, user: stage.user, sequence: stage.sequence};
    const updatedStage = await stagesAPI.editStage(stageName, stage._id);
    const updatedStages = stages.map(s => s._id === updatedStage._id ? updatedStage : s);
    setStages(updatedStages);
    setEdit(false);
  }

  return (
    <div className="StageListStep">
      <div className="header">
        { edit ?
          <div>
            <input
            type='text'
            value={stageName}
            name='name'
            onChange={(evt) => setStageName(evt.target.value)}
            />
            <button onClick={() => setEdit(false)}>Cancel</button>
            <button onClick={handleUpdate}>Update</button>
          </div>
          :
          <h2 onClick={() => setEdit(true)}>{stage.name}</h2>
        }
      </div>
      <div className="clientList">
        {clients.length ?
        <ClientList clients={clients}/>
        :
        <p>No Clients in Stage</p>
        }
      </div>
      <div className="footer">
        <p>Total Sales Volume: ${gsv.toLocaleString('en-US', 
        {maximumFractionDigits:2})}</p>
        <p>Total Commission Volume: ${gci.toLocaleString('en-US', 
        {maximumFractionDigits:2})}</p>
      </div>
    </div>
  )
}
