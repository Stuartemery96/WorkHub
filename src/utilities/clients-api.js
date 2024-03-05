import sendRequest from "./send-request";
const BASE_URL = '/api/clients';

export function getAllForUser() {
  return sendRequest(BASE_URL);
}

export function createClient(client) {
  return sendRequest(BASE_URL, 'POST', client);
}

export function getClient(clientId) {
  return sendRequest(`${BASE_URL}/${clientId}`);
}

export function updateClient(clientId, clientData) {
  return sendRequest(`${BASE_URL}/${clientId}`, 'PUT', clientData);
}

export function addNote(clientId, newNote) {
  return sendRequest(`${BASE_URL}/${clientId}/notes`, 'POST', newNote);
}

export function updateNote(clientId, noteId, noteText) {
  return sendRequest(`${BASE_URL}/${clientId}/notes/${noteId}`, 'PUT', {noteText});
}

export function deleteNote(clientId, noteId, noteText) {
  return sendRequest(`${BASE_URL}/${clientId}/notes/${noteId}`, 'DELETE');
}

export function updateClientStage(clientId, newStage) {
  return sendRequest(`${BASE_URL}/${clientId}/stage`, 'PUT', {newStage});
}