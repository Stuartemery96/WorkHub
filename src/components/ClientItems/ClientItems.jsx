import './ClientItems.css'
import { Link, useLocation } from 'react-router-dom';

export default function ClientItems({ client, stages, handleChangeStage }) {
  const { pathname } = useLocation();
  const clientStages = stages.filter((s) => s.clientType === client.clientType);
  const stage = stages.find(s => s.sequence === client.curStage);
  if (!stage) return null;

  return (
    <div className="ClientItems">
      <Link className='ClientDetailLink' to={`/clients/${client._id}`}>
      <div>
        <h2>{client.name}</h2>
        <p><strong>{client.clientType}</strong></p>
      </div>
      <div className="left">
        {client.clientType === 'Buyer' && client.salePrice ? (
          <p>
            <strong>Sale Price: </strong>
            ${client.salePrice.toLocaleString('en-US', 
            {maximumFractionDigits:2})}
          </p> )
          : (client.clientType === 'Buyer') ?
          (<p>
            <strong>Approved for: </strong>
            ${client.approvalAmt ?
            client.approvalAmt.toLocaleString('en-US', 
            {maximumFractionDigits:2}) :
            '0'}
          </p>)
            :
          (<p><strong>Listing Price: </strong>${client.listingPrice ?
            client.listingPrice.toLocaleString('en-US', 
            {maximumFractionDigits:2}) :
            '0'}</p>)
        }
        {client.clientType === 'Seller' && client.salePrice ?
          <p>
          <strong>Sale Price: </strong>
          ${client.salePrice.toLocaleString('en-US', 
          {maximumFractionDigits:2})}
          </p>
        :
          <></>
        }
        <p><strong>Commission: </strong>${client.commission ?
          client.commission.toLocaleString('en-US', 
          {maximumFractionDigits:2})
          :
          '0'}</p>
        <p><strong>Closing Date: </strong>{client.closeDate ?
          new Date(client.closeDate).toDateString()
          :
          'No Closing Date Yet'}</p>
      </div>
      </Link>
      {pathname === '/clients' ? (
        <></>
      ) : (
        <>
          {client.curStage === 1 ? (
            <></>
          ) : (
            <button onClick={() => handleChangeStage(client._id, client.curStage - 1)}>
              Prev
            </button>
          )}
          {client.curStage === clientStages.length ? (
            <></>
          ) : (
            <button onClick={() => handleChangeStage(client._id, client.curStage + 1)}>
              Next
            </button>
          )}
        </>
      )}
    </div>
  )
}
