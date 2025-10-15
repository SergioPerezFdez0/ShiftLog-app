import { CreatePunchData, CreatePunchVariables, GetWorkSessionsForUserData, GetWorkSessionsForUserVariables, CreateUserData, CreateUserVariables, GetUserByUsernameData, GetUserByUsernameVariables } from '../';
import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise} from '@angular/fire/data-connect';
import { CreateQueryResult, CreateMutationResult} from '@tanstack/angular-query-experimental';
import { CreateDataConnectQueryResult, CreateDataConnectQueryOptions, CreateDataConnectMutationResult, DataConnectMutationOptionsUndefinedMutationFn } from '@tanstack-query-firebase/angular/data-connect';
import { FirebaseError } from 'firebase/app';
import { Injector } from '@angular/core';

type CreatePunchOptions = DataConnectMutationOptionsUndefinedMutationFn<CreatePunchData, FirebaseError, CreatePunchVariables>;
export function injectCreatePunch(options?: CreatePunchOptions, injector?: Injector): CreateDataConnectMutationResult<CreatePunchData, CreatePunchVariables, CreatePunchVariables>;

type GetWorkSessionsForUserArgs = GetWorkSessionsForUserVariables | (() => GetWorkSessionsForUserVariables);
export type GetWorkSessionsForUserOptions = () => Omit<CreateDataConnectQueryOptions<GetWorkSessionsForUserData, GetWorkSessionsForUserVariables>, 'queryFn'>;
export function injectGetWorkSessionsForUser(args: GetWorkSessionsForUserArgs, options?: GetWorkSessionsForUserOptions, injector?: Injector): CreateDataConnectQueryResult<GetWorkSessionsForUserData, GetWorkSessionsForUserVariables>;

type CreateUserOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateUserData, FirebaseError, CreateUserVariables>;
export function injectCreateUser(options?: CreateUserOptions, injector?: Injector): CreateDataConnectMutationResult<CreateUserData, CreateUserVariables, CreateUserVariables>;

type GetUserByUsernameArgs = GetUserByUsernameVariables | (() => GetUserByUsernameVariables);
export type GetUserByUsernameOptions = () => Omit<CreateDataConnectQueryOptions<GetUserByUsernameData, GetUserByUsernameVariables>, 'queryFn'>;
export function injectGetUserByUsername(args: GetUserByUsernameArgs, options?: GetUserByUsernameOptions, injector?: Injector): CreateDataConnectQueryResult<GetUserByUsernameData, GetUserByUsernameVariables>;
