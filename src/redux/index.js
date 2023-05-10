import { combineReducers } from "redux";
import playArea from './reducers/playArea';
import app from './reducers/app';

export default combineReducers({ app, playArea });