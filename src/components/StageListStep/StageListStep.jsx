import './StageListStep.css'
import * as stagesAPI from '../../utilities/stages-api'
import { useState } from 'react';
import ClientList from '../ClientList/ClientList'

export default function StageListStep({ stage, clients, filteredClients, setClients, stages, setStages }) {
  const [stageName, setStageName] = useState({name: stage.name, clientType: stage.clientType});
  const [edit, setEdit] = useState(false);

  const gsv = filteredClients.reduce((total, client) => client.salePrice <= 0 ? total : total + client.salePrice, 0);
  const gci = filteredClients.reduce((total, client) => client.commission <= 0 ? total : total + client.commission, 0);

  async function handleUpdate() {
    // const s = {name: stageName, user: stage.user, sequence: stage.sequence};
    const updatedStage = await stagesAPI.editStage(stageName, stage._id);
    const updatedStages = stages.map(s => s._id === updatedStage._id ? updatedStage : s);
    setStages(updatedStages);
    setEdit(false);
  }

  function handleChange(evt) {
    const data = {...stageName, [evt.target.name]: evt.target.value}
    setStageName(data);
  }

  return (
    <div className="StageListStep">
      <div className="header">
        { edit ?
          <div className='EditStageForm'>
            <input
            type='text'
            value={stageName.name}
            name='name'
            onChange={handleChange}
            />
            <div>
              <button onClick={() => setEdit(false)}>Cancel</button>
              <button onClick={handleUpdate}>Update</button>
            </div> 
          </div>
          :
          <h2 onClick={() => setEdit(true)}>{stage.name.toUpperCase()}</h2>
        }
      </div>
      <div className="clientList">
        {clients.length ?
        <ClientList clients={clients} filteredClients={filteredClients} setClients={setClients} stage={stage} stages={stages} />
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
