import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;

export interface CreatePunchData {
  punch_insert: Punch_Key;
}

export interface CreatePunchVariables {
  userId: UUIDString;
  punchTime: TimestampString;
  punchType: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  username: string;
  passwordHash: string;
  displayName: string;
}

export interface GetUserByUsernameData {
  user?: {
    id: UUIDString;
    username: string;
    displayName?: string | null;
    passwordHash: string;
  } & User_Key;
}

export interface GetUserByUsernameVariables {
  username: string;
}

export interface GetWorkSessionsForUserData {
  workSessions: ({
    id: UUIDString;
    startTime: TimestampString;
    endTime: TimestampString;
    totalDurationInMinutes: number;
  } & WorkSession_Key)[];
}

export interface GetWorkSessionsForUserVariables {
  userId: UUIDString;
}

export interface Punch_Key {
  id: UUIDString;
  __typename?: 'Punch_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface WorkSession_Key {
  id: UUIDString;
  __typename?: 'WorkSession_Key';
}

interface CreatePunchRef {
  (vars: CreatePunchVariables): MutationRef<CreatePunchData, CreatePunchVariables>;
  (dc: DataConnect, vars: CreatePunchVariables): MutationRef<CreatePunchData, CreatePunchVariables>;
  operationName: string;
}
export const createPunchRef: CreatePunchRef;

export function createPunch(vars: CreatePunchVariables): MutationPromise<CreatePunchData, CreatePunchVariables>;
export function createPunch(dc: DataConnect, vars: CreatePunchVariables): MutationPromise<CreatePunchData, CreatePunchVariables>;

interface GetWorkSessionsForUserRef {
  (vars: GetWorkSessionsForUserVariables): QueryRef<GetWorkSessionsForUserData, GetWorkSessionsForUserVariables>;
  (dc: DataConnect, vars: GetWorkSessionsForUserVariables): QueryRef<GetWorkSessionsForUserData, GetWorkSessionsForUserVariables>;
  operationName: string;
}
export const getWorkSessionsForUserRef: GetWorkSessionsForUserRef;

export function getWorkSessionsForUser(vars: GetWorkSessionsForUserVariables): QueryPromise<GetWorkSessionsForUserData, GetWorkSessionsForUserVariables>;
export function getWorkSessionsForUser(dc: DataConnect, vars: GetWorkSessionsForUserVariables): QueryPromise<GetWorkSessionsForUserData, GetWorkSessionsForUserVariables>;

interface CreateUserRef {
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface GetUserByUsernameRef {
  (vars: GetUserByUsernameVariables): QueryRef<GetUserByUsernameData, GetUserByUsernameVariables>;
  (dc: DataConnect, vars: GetUserByUsernameVariables): QueryRef<GetUserByUsernameData, GetUserByUsernameVariables>;
  operationName: string;
}
export const getUserByUsernameRef: GetUserByUsernameRef;

export function getUserByUsername(vars: GetUserByUsernameVariables): QueryPromise<GetUserByUsernameData, GetUserByUsernameVariables>;
export function getUserByUsername(dc: DataConnect, vars: GetUserByUsernameVariables): QueryPromise<GetUserByUsernameData, GetUserByUsernameVariables>;

