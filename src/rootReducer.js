/**
 * Created by ankit on 4/18/17.
 */
import {combineReducers} from 'redux';
import genres from './genreReducer'
import games from './gamesReducer'
import singleGame from './singleGameReducer'
import cartGames from './cartGameReducer'

export default combineReducers( {
    genres,
    games,
    singleGame,
    cartGames
})