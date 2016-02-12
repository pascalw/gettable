import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import response from './response';
import projects from './projects';
import environments from './environments';
import ui from './ui';
import history from './history'

const rootReducer = combineReducers({
  projects,
  response,
  ui,
  environments,
  history,
  routing: routeReducer
});

export default rootReducer;
