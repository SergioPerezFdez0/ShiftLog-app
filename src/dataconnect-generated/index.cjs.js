const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'shiftlog-app',
  location: 'europe-west1'
};
exports.connectorConfig = connectorConfig;

const createPunchRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePunch', inputVars);
}
createPunchRef.operationName = 'CreatePunch';
exports.createPunchRef = createPunchRef;

exports.createPunch = function createPunch(dcOrVars, vars) {
  return executeMutation(createPunchRef(dcOrVars, vars));
};

const getWorkSessionsForUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetWorkSessionsForUser', inputVars);
}
getWorkSessionsForUserRef.operationName = 'GetWorkSessionsForUser';
exports.getWorkSessionsForUserRef = getWorkSessionsForUserRef;

exports.getWorkSessionsForUser = function getWorkSessionsForUser(dcOrVars, vars) {
  return executeQuery(getWorkSessionsForUserRef(dcOrVars, vars));
};

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const getUserByUsernameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserByUsername', inputVars);
}
getUserByUsernameRef.operationName = 'GetUserByUsername';
exports.getUserByUsernameRef = getUserByUsernameRef;

exports.getUserByUsername = function getUserByUsername(dcOrVars, vars) {
  return executeQuery(getUserByUsernameRef(dcOrVars, vars));
};
