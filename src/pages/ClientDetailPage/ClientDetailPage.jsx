import './ClientDetailPage.css'
import * as clientsAPI from '../../utilities/clients-api'
import * as stagesAPI from '../../utilities/stages-api'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import NoteItems from '../../components/NoteItems/NoteItems';

export default function ClientDetailPage({ clients, stages }) {
  const [client, setClient] = useState(null);
  const [stage, setStage] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [edit, setEdit] = useState(false);
  const {clientId} = useParams();
  
  useEffect(function() {
    async function getClient() {
      const client = await clientsAPI.getClient(clientId)
      setClient(client)
    }
    async function getStage() {
      const clientStage = await stagesAPI.getStage(clientId);
      setStage(clientStage);
    }
    getClient();
    getStage();
  }, [clientId, clients, stages]);
  
  const phoneNumber = function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }

  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };
  
  return (
    <main className="ClientDetailPage">
      {client &&
        <>
          <h1>{client.name}</h1>
          <div className={`ClientDetails${showNotes ? '' : '-NoNotes'}`}>
            <ul className='ClientDetailList'>
              <div>
                <label>Email: </label>
                <li>{client.email}</li>
              </div>
              <div>
                <label>Phone: </label>
                <li>{phoneNumber(client.phone)}</li>
              </div>
              <div>
                <label>Client Type: </label>
                <li>{client.clientType}</li>
              </div>
              <div>
                <label>Address: </label>
                <li>{client.address}</li>
              </div>
                <div>
                  <label>Description: </label>
                  <li>{client.description}</li>
                </div>
              <div>
                <label>Stage: </label>
                <li>{stage && stage.name}</li>
              </div>
              {client.clientType === 'Buyer' && client.salePrice ? (
                <>
                  <div>
                    <label>Sale Price: </label>
                    <li>${client.salePrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}</li>
                  </div>
                </>
              ) : (client.clientType === 'Buyer') ? (
                <>
                  <div>
                    <label>Approved for: </label>
                    <li>${client.approvalAmt ? client.approvalAmt.toLocaleString('en-US', { maximumFractionDigits: 2 }) : 0}</li>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label>Listing Price: </label>
                    <li>${client.listingPrice ? client.listingPrice.toLocaleString('en-US', { maximumFractionDigits: 2 }) : 0}</li>
                  </div>
                </>
              )}
              <div>
                <label>Commission: </label>
                <li>${client.commission ? (client.commission).toLocaleString('en-US', { maximumFractionDigits: 2 }) : 0 }</li>
              </div>
              <div>
                <label>Close Date: </label>
                <li>{client.closeDate && new Date(client.closeDate).toDateString()}</li>
              </div>
              <div>
                <label>Notes: </label>
                <li><button onClick={toggleNotes}>{showNotes === true ? 'Hide Notes' : 'Show Notes'}</button></li>
              </div>
            </ul>
          </div>
          {showNotes &&
          <div className='NotesList'>
            <h2>Notes:</h2>
            <ul>
              { client.notes.map((note) => <NoteItems note={note} key={note._id} />)}
            </ul>
          </div>
          }
        </>
      }
    </main>
  )
}
