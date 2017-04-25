/**
 * Created by ankit on 4/19/17.
 */
import React from 'react'
import {connect} from 'react-redux';
import { Rating,Button,Icon, Reveal, Image, Card, Grid } from 'semantic-ui-react'
import {fetchPopularGames,addGameToCart} from './actions'
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom'
class GamesList extends  React.Component {
    componentDidMount () {
        this.props.fetchPopularGames()
    }
    createGameCard(){
        return this.props.games.map((game)=>{
            console.log(game);
            if(game.cover!==undefined){
                return (
                    <Card key={game.id}>
                        <Reveal animated='move up'>
                            <Reveal.Content visible>
                                <Image src={'https:' + game.cover.url} size='medium' />
                            </Reveal.Content>
                            <Reveal.Content hidden>
                                <Grid  centered  verticalAlign='middle' container={true}>
                                    <Grid.Column verticalAlign='middle'>
                                        <Button.Group attached='top' vertical >
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
                                        </Button.Group>
                                        <Grid.Row centered>
                                            {game.aggregated_rating &&<Rating icon='star' defaultRating={game.aggregated_rating*0.05} maxRating={5} disabled={true} />}
                                        </Grid.Row>
                                    </Grid.Column>
                                </Grid>
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
            <div className="ui three stackable cards">
                {this.createGameCard()}
            </div>
        )
    }
    render(){
        return (
            <div className="twelve wide column">
                {this.createCardGameList()}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        games:state.games
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({fetchPopularGames:fetchPopularGames,addGameToCart:addGameToCart}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(GamesList)