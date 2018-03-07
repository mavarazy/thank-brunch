import { combineReducers } from "redux"
import { PROJECT_GET, GET_USER_PROJECTS, GET_SUPPORTED, REFRESH_MY_PROJECTS } from "./project.actions";
import { GET_OWNED_PROJECTS, UPDATE_MY_PROJECT, ENRICH_PROJECT } from "reducers/project.actions";

function byIdReducer(state = {}, { type, payload }) {
  switch (type) {
    case GET_OWNED_PROJECTS.fulfilled:
      payload = { projects: payload.installed.concat(payload.pending) };
    case GET_USER_PROJECTS.fulfilled:
    case REFRESH_MY_PROJECTS.fulfilled:
    case GET_SUPPORTED.fulfilled:
      let projectById = payload.projects.reduce((agg, project) => {
        agg[project._id] = project;
        return agg
      }, {});
      return Object.assign({}, state, projectById);
    case PROJECT_GET.fulfilled:
      return Object.assign({}, state, { [payload._id]: payload });
    case ENRICH_PROJECT.fulfilled:
      let prj = Object.values(state).find(({ url }) => url === payload.url) || payload;
      prj = Object.assign({}, payload, { _id: prj._id });
      return Object.assign({}, state, { [prj._id]: prj });
    case UPDATE_MY_PROJECT.fulfilled:
      return Object.assign({}, state, { [payload._id]: payload });
    default:
      return state;
  }
}

function byUserReducer(state = {}, { type, payload }) {
  switch (type) {
    case GET_USER_PROJECTS.fulfilled:
      let { id: user, projects } = payload;
      return Object.assign({}, state, { [user]: projects.map(({ _id }) => _id) });
    case UPDATE_MY_PROJECT.fulfilled:
      let { _id, enabled } = payload;
      if (!enabled) {
        return Object.assign({}, state, { "my": state.my.filter(id => id !== _id) })
      } else {
        if (state.my.includes(_id)) {
          return state;
        } else {
          return Object.assign({}, state, { "my": state.my.concat(_id) });
        }
      }
    default:
      return state;
  }
}

function supportedReducer(state = {}, { type, payload }) {
  switch (type) {
    case GET_SUPPORTED.fulfilled:
      let { id: user, projects } = payload;
      return Object.assign({}, state, { [user]: projects.map(({ _id }) => _id) });
    default:
      return state;
  }
}

function ownedReducer(state = { installed: [], pending: [] }, { type, payload }) {
  switch (type) {
    case GET_OWNED_PROJECTS.fulfilled:
      return {
        installed: payload.installed.map(({ _id }) => _id),
        pending: payload.pending.map(({ _id }) => _id)
      };
    default:
      return state;
  }
}

export default combineReducers({
  byId: byIdReducer,
  byUser: byUserReducer,
  supported: supportedReducer,
  owned: ownedReducer
})