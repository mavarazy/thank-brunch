import { promiseReducer } from "../util/promiseStates";
import { combineReducers } from "redux"
import { GET_MY_PROJECTS } from "./project.actions";

export default combineReducers({
  my: promiseReducer(GET_MY_PROJECTS, [])
})