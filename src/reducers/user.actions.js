import { event } from './util/promiseStates';
import authService from "reducers/util/auth";
import { dispatchPromiseWith } from "reducers/util/promiseStates";

export const GET_USER = event("GET_USER");
export const UPDATE_USER = event("UPDATE_USER");

export const getUser = (user) => (dispatch, getState) => {
  let { user: { [user]: current }} = getState();
  if (current && !current.isLoading) {
    return;
  }
  let p = authService.get(`/api/v1/user/${user}/profile`);
  return dispatchPromiseWith(p, GET_USER, user, dispatch);
};

export const updateUser = UPDATE_USER.putMy("/api/v1/user/$id/profile");