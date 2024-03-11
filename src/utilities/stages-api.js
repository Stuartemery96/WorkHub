import sendRequest from "./send-request";
const BASE_URL = '/api/stages';

export function getAllForUser() {
  return sendRequest(BASE_URL);
}

export function createStage(stage) {
  return sendRequest(BASE_URL, 'POST', stage)
}

export function editStage(stageName, stageId) {
  return sendRequest(BASE_URL, 'PUT', {stageName, stageId})
}

export function getStage(clientId) {
  return sendRequest(`${BASE_URL}/${clientId}`);
}

export function deleteStage(stageId) {
  return sendRequest(`${BASE_URL}/${stageId}`, 'DELETE');
}

export function updateSeq(stageId, newSequence) {
  return sendRequest(`${BASE_URL}/${stageId}/sequence`, 'PUT', {newSequence});
}