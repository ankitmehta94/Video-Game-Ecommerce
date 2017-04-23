/**
 * Created by ankit on 4/21/17.
 */
import React from 'react'
import {connect} from 'react-redux';
import {fetchGameInformation} from './actions'
class GamesPage extends  React.Component {
    state={
        game:this.props.singleGame?this.props.singleGame:null,
        screenShots:this.props.singleGame?this.props.singleGame.screenshots:null,
        mainPictureUrl:null
    }
    componentWillReceiveProps = (nextProps) =>{
        console.log()
        this.setState({
            game:nextProps.singleGame,
            screenShots:nextProps.singleGame.screenshots
        })
    }
    componentDidMount () {
        console.log(this.props.match.params.id)
        this.props.fetchGameInformation(this.props.match.params.id)
    }
    createImageDisplay (){
        console.log(this.state.game)
        if(this.state.screenShots) {
            return this.state.screenShots.map((shots) => {
                return (<li onMouseOver={()=>{this.setState({mainPictureUrl:'https:' + shots.url})}} key={shots.cloudinary_id}><img src={'https:' + shots.url} /></li>)
            })
        }
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
                                <div className="ui star rating" data-rating="5" data-max-rating="5">xxxxxx</div>
                            </div>
                        </div>
                    </div>

                )
            }
        })


    }
    render(){
        return (
            <div>
                <h1>{this.state.game.name}</h1>
                <ul>{this.createImageDisplay()}</ul>
                <img src={this.state.mainPictureUrl}/>
            </div>
        )
    }
}
function mapStateToProps(state,props) {
    console.log(props.match.params.id);
    return {
        singleGame:state.singleGame
    }
}
GamesPage.propTypes= {
    fetchGameInformation:React.PropTypes.func.isRequired,
    singleGame:React.PropTypes.object.isRequired
};
export default connect(mapStateToProps,{fetchGameInformation})(GamesPage)