import './StageListStep.css'
import * as stagesAPI from '../../utilities/stages-api'
import { useState } from 'react';
import ClientList from '../ClientList/ClientList'

export default function StageListStep({ stage, clients, filteredClients, setClients, stages, setStages }) {
  const [stageName, setStageName] = useState({name: stage.name, clientType: stage.clientType});
  const [swapStage, setSwapStage] = useState(null)
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

  async function handleDelete() {
    try{
      await stagesAPI.deleteStage(stage._id)
      const updatedStages = stages.filter(s => s._id !== stage._id);
      setStages(updatedStages);
    } catch (err) {
      console.log(err);
    } 
  }

  async function handleChangeSeq(stageId, newSequence) {
    try {
      const response = await stagesAPI.updateSeq(stageId, newSequence);
      const stage = response.stage;
      const swapStage = response.swapStage;
      const swappedClients = response.updatedClients;
      // Update the stages array with the updated stage and swapStage
      const updatedStages = stages.map(s => {
        if (s._id === stage._id) {
          return stage;
        } else if (s._id === swapStage._id) {
          return swapStage;
        } else {
          return s;
        }
      });
      updatedStages.sort((a, b) => a.sequence - b.sequence);
      const updatedClients = clients.map(client => {
        const swappedClient = swappedClients.find(sc => sc._id === client._id);
        return swappedClient ? swappedClient : client;
      });

      // Update the state with the updated stages array
      setStages(updatedStages);
      setClients([clients, ...updatedClients]);
    } catch (error) {
      console.error('Error updating sequence:', error);
    }
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
        {filteredClients.length ?
        <ClientList clients={clients} filteredClients={filteredClients} setClients={setClients} stage={stage} stages={stages} />
        :
        <>
          <p>No Clients in Stage</p>
          <button className='DeleteBtn' onClick={handleDelete}>Delete Stage</button>
        </>  
        }
      </div>
      <div className="footer">
        <p>Total Sales Volume: ${gsv.toLocaleString('en-US', 
        {maximumFractionDigits:2})}</p>
        <p>Total Commission Volume: ${gci.toLocaleString('en-US', 
        {maximumFractionDigits:2})}</p>
      </div>
      {stage.sequence < stages.length &&
      <button onClick={() => handleChangeSeq(stage._id, stage.sequence + 1)}>Next</button>
      }
      {stage.sequence > 1 &&
      <button onClick={() => handleChangeSeq(stage._id, stage.sequence - 1)}>Prev</button>
      }
    </div>
  )
}
