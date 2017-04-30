/**
 * Created by ankit on 4/21/17.
 */
import React from 'react'
import {connect} from 'react-redux';
import {fetchGameInformation} from './actions'
import {  Grid, List,Image,Header ,Segment,Icon} from 'semantic-ui-react'
import SummarySegment from './SummarySegment'
class GamesPage extends  React.Component {
    state={
        game:this.props.singleGame?this.props.singleGame:null,
        screenShots:this.props.singleGame?this.props.singleGame.screenshots:null,
        mainPictureUrl:null,
        cover:null,

    }
    componentWillReceiveProps = (nextProps) =>{
        this.setState({
            game:nextProps.singleGame,
            screenShots:nextProps.singleGame.screenshots,
            mainPictureUrl:'https:'+nextProps.singleGame.cover.url,
            cover:nextProps.singleGame.cover
        })
    }
createVideoDisplay(){
   let  {videos} = this.state.game;
    let i = 0;

        if(videos){
            let link = '//www.youtube.com/embed/'+videos[i].video_id
            let nextVideo = function () {
                if(i<videos.length){
                    i++;
                    link = '//www.youtube.com/embed/'+videos[i].video_id
                    console.log(link);
                    document.getElementById('embeddedVideo').src = link;
                }
            }
            let previousVideo = function () {
                if(i>1){
                    i--;
                    link = '//www.youtube.com/embed/'+videos[i].video_id
                    document.getElementById('embeddedVideo').src = link;
                }
            }

            return(  <Grid.Row centered>
                <Grid.Column width={2} verticalAlign={'middle'} ><Icon name={'chevron circle left'} size='huge' onClick={previousVideo} /></Grid.Column>
                <Grid.Column  width={10}><Segment>
                    <iframe id="embeddedVideo" width="854" height="400" src={link} ></iframe>
                </Segment></Grid.Column>
                <Grid.Column  width={2} verticalAlign={'middle'}><Icon name={'chevron circle right'} size='huge' onClick={nextVideo}/></Grid.Column>
            </Grid.Row>)
        }
}
    componentDidMount () {
        console.log(this.props.match.params.id)
        this.props.fetchGameInformation(this.props.match.params.id)
    }
    createCoverDisplay(){
        return (this.state.cover&&<List.Item onMouseOver={()=>{this.setState({mainPictureUrl:'https:' + this.state.cover.url})}} >
            <Image avatar src={'https:' + this.state.cover.url} size={'mini'}/></List.Item>)
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
                <Grid  >
                    <Grid.Row>
                    <Grid.Column width={5}>
                    <Grid.Row >
                        <List floated={'left'}>{this.createCoverDisplay()}
                            {this.createImageDisplay()}</List>
                        <Image floated={'left'} src={this.state.mainPictureUrl} size={'medium'}/>
                    </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <SummarySegment game={this.state.game}/>
                    </Grid.Column>
                    </Grid.Row>
                    {this.createVideoDisplay()}
                  </Grid></div>

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