/**
 * Created by ankit on 4/18/17.
 */
import React from 'react'
import {connect} from 'react-redux';
import {fetchGenres,getGamesOfGenre,fetchPopularGames} from './actions'
import {bindActionCreators} from 'redux';
//console.log(fetchGenres);
class VerticalMenu extends  React.Component {
    componentDidMount () {
        this.props.fetchGenres()
    }
    createGenreList(){
        return this.props.genres.map((genre)=>{
      //      console.log(genre);
            return (
                <a className="teal item" key={genre.id} onClick={()=>{this.props.getGamesOfGenre(genre.games)}}>{genre.name}</a>
            )
        })
    }
    render(){
return (
    <div className="three wide column">
    <div className="ui vertical pointing menu ">
        <a className="teal item active" onClick={()=>{this.props.fetchPopularGames()}} >Most Popular</a>
        {this.createGenreList()}
        </div>
    </div>
)
    }
}
function mapStateToProps(state) {
    return {
        genres:state.genres
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({getGamesOfGenre:getGamesOfGenre,fetchGenres:fetchGenres,fetchPopularGames:fetchPopularGames}, dispatch);
}
VerticalMenu.propTypes= {
    fetchGenres:React.PropTypes.func.isRequired,
    fetchPopularGames:React.PropTypes.func.isRequired,
    getGamesOfGenre:React.PropTypes.func.isRequired,
    genres:React.PropTypes.array.isRequired
};
export default connect(mapStateToProps,matchDispatchToProps)(VerticalMenu)