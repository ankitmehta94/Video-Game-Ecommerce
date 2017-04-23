/**
 * Created by ankit on 4/18/17.
 */
import {GENRES_RECEIVED} from './actions'
export default function genres(state= [], action = {}) {
    switch (action.type){
        case GENRES_RECEIVED:
            return action.genres
        default:return state;
    }
}