/**
 * Created by ankit on 4/18/17.
 */
import React from 'react'
import {connect} from 'react-redux';
import {fetchGenres,getGamesOfGenre,fetchPopularGames} from './actions'
import { Menu, Loader } from 'semantic-ui-react'
import {bindActionCreators} from 'redux';
import classnames from 'classnames'
//console.log(fetchGenres);
class VerticalMenu extends  React.Component {
    state={ activeItem:'popular',
        loader:true
    }
    componentDidMount () {
        this.props.fetchGenres().then(this.setState({loader:false}))
    }
    createGenreList(){
        return this.props.genres.map((genre)=>{
      //      console.log(genre);
            return (
            <Menu.Item key={genre.id} name={genre.name} active={this.state.activeItem === genre.name} onClick={()=>{this.props.getGamesOfGenre(genre.games);this.setState({activeItem:genre.name});console.log(this.state)}} />
            )
        })
    }
    render(){
return (
    <div className="four wide column">
        {this.state.loader===false?
        <Menu fluid vertical tabular>
            <Menu.Item name='Most Popular Games' active={this.state.activeItem === 'popular'} onClick={()=>{this.props.fetchPopularGames()}}/>
            {this.createGenreList()}
        </Menu>: <Loader>Loading</Loader>}
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

export default connect(mapStateToProps,matchDispatchToProps)(VerticalMenu)