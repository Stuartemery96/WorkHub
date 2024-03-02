import './StageListStep.css'
import * as stagesAPI from '../../utilities/stages-api'
import { useState } from 'react';
import ClientList from '../ClientList/ClientList'

export default function StageListStep({ stage, clients, setClients, stages, setStages }) {
  const [stageName, setStageName] = useState({name: stage.name, clientType: stage.clientType});
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

  function handleChange(evt) {
    const data = {...stageName, [evt.target.name]: evt.target.value}
    setStageName(data);
  }

  return (
    <div className="StageListStep">
      <div className="header">
        { edit ?
          <div>
            <input
            type='text'
            value={stageName.name}
            name='name'
            onChange={handleChange}
            />
            <select
            name="clientType"
            value={stageName.clientType}
            onChange={handleChange}
            required
            >
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>               
            <button onClick={() => setEdit(false)}>Cancel</button>
            <button onClick={handleUpdate}>Update</button>
          </div>
          :
          <h2 onClick={() => setEdit(true)}>{stage.name.toUpperCase()}</h2>
        }
      </div>
      <div className="clientList">
        {clients.length ?
        <ClientList clients={clients} setClients={setClients} stage={stage} />
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
