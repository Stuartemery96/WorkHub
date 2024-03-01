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
  return sendRequest(`${BASE_URL}/${clientId}`, 'PUT', clientData)
}