import './ClientDetailPage.css'
import * as clientsAPI from '../../utilities/clients-api'
import { useState } from "react"
import { useParams } from "react-router-dom";
import NoteItems from '../../components/NoteItems/NoteItems';
import EditClientForm from '../../components/EditClientForm/EditClientForm'
import NewNoteForm from '../../components/NewNoteForm/NewNoteForm';

export default function ClientDetailPage({ clients, setClients, stages }) {
  const [showNotes, setShowNotes] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const {clientId} = useParams();

  const client = clients.find(c => c._id === clientId);
  if (!client) return null;
  const stage = stages.find(s => s.sequence === client.curStage);
  if (!stage) return null;
  
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

  async function handleUpdateClient(clientData) {
    const updatedClient = await clientsAPI.updateClient(client._id, clientData);
    const updatedClients = clients.map(c => c._id === updatedClient._id ?
      updatedClient : c);
    setClients(updatedClients);
    setEdit(false);
  }
  
  async function handleAddNote(newNote) {
    const updatedClient = await clientsAPI.addNote(clientId, newNote);
    const updatedClients = clients.map(c => c._id === updatedClient._id ?
      updatedClient : c);
    setClients(updatedClients);
    setAddNote(false);
  }
  
  return (
    <main className="ClientDetailPage">
      {edit ? (
        <>
        {client &&
          <>
            <h1>Edit: {client.name}</h1>
            <EditClientForm client={client} setEdit={setEdit} handleUpdateClient={handleUpdateClient} />
          </>
        }
        </>
      ) : (
        <>
          {client &&
            <>
              <h1>{client.name.toUpperCase()}</h1>
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
                <button onClick={() => setEdit(true)}>Edit</button>
              </div>
              {showNotes &&
              <div className='NotesList'>
                <h2>Notes:</h2>
                <ul>
                  {client.notes.map((note) => <NoteItems note={note} key={note._id} />)}
                </ul>
                {addNote &&
                  <NewNoteForm handleAddNote={handleAddNote} />
                }
                <button onClick={() => setAddNote(!addNote)}>{addNote ? 'Cancel' : 'Add Note'}</button>
              </div>
              }
            </>
          }
        </>
      )}
    </main>
  )
}
