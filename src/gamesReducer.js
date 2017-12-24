/**
 * Created by ankit on 4/20/17.
 */
import {GAMES_RECEIVED} from './actions'
export default function games(state= [], action = {}) {
    switch (action.type){
        case GAMES_RECEIVED:
        	console.log(action);
            return action.games
        default:return state;
    }
}