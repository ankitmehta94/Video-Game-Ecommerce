/**
 * Created by ankit on 4/24/17.
 */
import {GAME_DETAIL_ADDED_TO_CART} from './actions'
export default function cartGames(state= [], action = {}) {

    switch (action.type){
        case GAME_DETAIL_ADDED_TO_CART:
            return[...state.concat(action.game)
            ]
        default:return state;
    }
}