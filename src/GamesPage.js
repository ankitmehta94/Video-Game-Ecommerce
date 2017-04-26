/**
 * Created by ankit on 4/21/17.
 */
import React from 'react'
import {connect} from 'react-redux';
import {fetchGameInformation} from './actions'
import {  Grid, List,Image,Header ,Segment} from 'semantic-ui-react'
import SummarySegment from './SummarySegment'
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
            screenShots:nextProps.singleGame.screenshots,
            mainPictureUrl:'https:'+nextProps.singleGame.screenshots[0].url
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
                return (<List.Item onMouseOver={()=>{this.setState({mainPictureUrl:'https:' + shots.url})}} key={shots.cloudinary_id}>
                    <Image avatar src={'https:' + shots.url} size={'mini'}/></List.Item>)
            })
        }
    }
    render(){
        return (
            <div>
                <Segment> <Header size={'huge'}>{this.state.game.name}</Header></Segment>
                <Grid>
                    <Grid.Column width={4}>
                    <Grid.Row >
                    <List>{this.createImageDisplay()}</List>
                        <Image src={this.state.mainPictureUrl} size={'medium'}/>
                    </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <SummarySegment game={this.state.game}/>
                    </Grid.Column></Grid></div>

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