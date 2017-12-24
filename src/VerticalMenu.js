/**
 * Created by ankit on 4/18/17.
 */
import React from 'react'
import {connect} from 'react-redux';
import {fetchGenres,getGamesOfGenre,fetchPopularGames} from './actions'
import { Menu, Loader } from 'semantic-ui-react'
import {bindActionCreators} from 'redux';
//console.log(fetchGenres);
class VerticalMenu extends  React.Component {
    state={ activeItem:'popular',
        loader:true,
    };
    componentDidMount () {
        this.props.fetchGenres().then(()=>{console.log(this.state.loader);this.setState({loader:false})})
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
        <Loader active={this.state.loader}>Loading</Loader>
        <Menu fluid vertical tabular>
            <Menu.Item name='Most Popular Games' active={this.state.activeItem === 'popular'} onClick={()=>{this.props.fetchPopularGames();this.setState({activeItem:'popular'})}}/>
            {this.createGenreList()}
        </Menu>

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