/**
 * Created by ankit on 4/19/17.
 */
import React from 'react'
import {connect} from 'react-redux';
// import { Card, Icon, Image } from 'semantic-ui-react'
import {fetchPopularGames} from './actions'
import {Link} from 'react-router-dom'
class GamesList extends  React.Component {
    componentDidMount () {
        this.props.fetchPopularGames()
    }
    createGameCardList(){
        return this.props.games.map((game)=>{
            console.log(game);
            if(game.cover!==undefined){
                return (

                        <div className="ui move up reveal"  key={game.id}>
                    <div className="ui card visible content" >
                        <div className="image"><img src={'https:' + game.cover.url} alt="Game Cover"/></div>
                        <div className="content">
                            <div className="header">{game.name}</div>
                        </div>
                    </div>
                            <div className="ui card hidden content">
                        <div className="content">
                            <Link to={`/${game.id}`}>xxxxxx</Link>
                        </div>
                    </div>
                    </div>

                )
            }
                    })


    }
    render(){
        return (
            <div className=" thirteen wide column">
            <div className="ui six cards column">
                {this.createGameCardList()}
            </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        games:state.games
    }
}
GamesList.propTypes= {
    fetchPopularGames:React.PropTypes.func.isRequired,
    games:React.PropTypes.array.isRequired
};
export default connect(mapStateToProps,{fetchPopularGames})(GamesList)