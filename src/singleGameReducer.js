/**
 * Created by ankit on 4/21/17.
 */
import {GAME_DETAIL_RECEIVED} from './actions'
export default function singleGame(state= [], action = {}) {
    switch (action.type){
        case GAME_DETAIL_RECEIVED:
            return action.game
        default:return state;
    }
}