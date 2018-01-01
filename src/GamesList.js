/**
 * Created by ankit on 4/19/17.
 */
import React from 'react'
import {connect} from 'react-redux';
import { Rating,Button,Icon, Reveal, Image, Card, Grid,Loader } from 'semantic-ui-react'
import {fetchPopularGames,addGameToCart} from './actions'
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom'
class GamesList extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            loader:true
        }
    }
	componentDidMount () {
		this.props.fetchPopularGames().then(()=>{this.setState({loader:false})})
	}
    returnButtonsAndRating (game){
        return (
                <div className="full-height flex-col-space-around align-items-center">
                     <Button animated='vertical' onClick={()=>{this.props.addGameToCart(game)}}>
                        <Button.Content visible>ADD TO CART</Button.Content>
                        <Button.Content hidden>
                            <Icon name='shop' />
                        </Button.Content>
                    </Button>
                    <Link to="/cart">
                        <Button animated='vertical' onClick={()=>{this.props.addGameToCart(game)}}>
                            <Button.Content visible>{game.aggregated_rating?'$'+Math.round(game.aggregated_rating):'FREE'}</Button.Content>
                            <Button.Content hidden>
                                {game.aggregated_rating?'BUY':'GET'}
                            </Button.Content>
                        </Button>
                    </Link>
                    <div>
                        {game.aggregated_rating &&<Rating icon='star' defaultRating={game.aggregated_rating*0.05} maxRating={5} disabled={true} />}
                    </div>
                </div>
            )
    }
	createGameCard(){
        let {games} = this.props;
		return games.map((game)=>{
			if(game.cover!==undefined){
				return (
                    <Card key={game.id}>
                        <Reveal animated='move up'>
                            <Reveal.Content visible>
                                <Image src={game.cover.url} className="image-size" />
                            </Reveal.Content>
                            <Reveal.Content hidden className="full-height">
                                {this.returnButtonsAndRating(game)}
                            </Reveal.Content>
                        </Reveal>
                        <Card.Content>
                            <Card.Header>
                                <Link to={`/games/${game.id}`} >{game.name}</Link>
                            </Card.Header>
                        </Card.Content>
                    </Card>
				)
			}
		})


	}
	createCardGameList(){
		return (
            <div className="ui four stackable cards">
				{this.createGameCard()}
            </div>
		)
	}
	render(){
        let {loader} = this.state;
		return (
            <div className="width80cent padding2cent max-100-scroll" >
                <Loader active={loader}>Loading</Loader>
				{loader?'':this.createCardGameList()}
            </div>
		)
	}
}
function mapStateToProps(state) {
    console.log(state);
	return {
		games:state.games
	}
}
function matchDispatchToProps(dispatch) {
	return bindActionCreators({fetchPopularGames:fetchPopularGames,addGameToCart:addGameToCart}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(GamesList)