import sendRequest from "./send-request";
const BASE_URL = '/api/stages';

export function getAllForUser() {
  return sendRequest(BASE_URL);
}

export function createStage(stage) {
  return sendRequest(`${BASE_URL}/stage`, 'POST', stage)
}