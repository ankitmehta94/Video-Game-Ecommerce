/**
 * Created by ankit on 4/22/17.
 */
import React from 'react'
import {connect} from 'react-redux';
import './index.css'
import {fetchPopularGames} from './actions'
import {Link} from 'react-router-dom'
class navBar extends  React.Component {
    render(){
        return (
            <div className="navBar">PLEASE ANYTHING WILL DO</div>
        )
    }
}
function mapStateToProps(state) {
    return {
        games:state.games
    }
}
navBar.propTypes= {
    fetchPopularGames:React.PropTypes.func.isRequired,
    games:React.PropTypes.array.isRequired
};
export default connect(mapStateToProps,{fetchPopularGames})(navBar)