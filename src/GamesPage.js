/**
 * Created by ankit on 4/21/17.
 */
import React from 'react'
import {connect} from 'react-redux';
import {fetchGameInformation} from './actions'
import {  Grid, List,Image,Header ,Segment,Icon, Loader} from 'semantic-ui-react'
import SummarySegment from './SummarySegment'
import classNames from 'classnames';
class GamesPage extends  React.Component {
    constructor(props){
        super(props);
        this.state={
            game:props.singleGame?props.singleGame:null,
            screenShots:props.singleGame?props.singleGame.screenshots:null,
            mainPictureUrl:null,
            cover:null,
            loader:true
        }
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
                return(  <div className="flex-row-space-around">
                            <div className="width20cent flex-row-center align-items-center" >
                                <Icon name={'chevron circle left'} size='huge' onClick={previousVideo} />
                            </div>
                            <div  width={10}>
                                <Segment>
                                    <iframe id="embeddedVideo" width="854" height="400" src={link} ></iframe>
                                </Segment>
                            </div>
                            <div className="width20cent flex-row-center align-items-center">
                                <Icon name={'chevron circle right'} size='huge' onClick={nextVideo}/>
                            </div>
                        </div>
                    )
            }else{
                return ( <Header as='h3' block textAlign={'centered'} content={'NO VIDEOS AVAILABLE'}/>);
            }
            
    }
    componentWillReceiveProps = (nextProps) =>{
        this.setState({
            game:nextProps.singleGame,
            screenShots:nextProps.singleGame.screenshots,
            mainPictureUrl:nextProps.singleGame.cover.url,
            cover:nextProps.singleGame.cover,
            loader:false
        })
    }
    componentDidMount () {

        this.props.fetchGameInformation(this.props.match.params.id)
    }
    createCoverDisplay(){
        let {cover} = this.state
        return (cover && <List.Item onMouseOver={()=>{this.setState({mainPictureUrl:cover.url})}} >
                            <Image avatar src={cover.url} className="height35px width35px"/>
                         </List.Item>
            )
    }
    createImageDisplay (){
        let {screenShots} = this.state;
        if(screenShots) {
            return screenShots.map((shots) => {
                return (<div onMouseOver={()=>{this.setState({mainPictureUrl:shots.url})}} key={shots.cloudinary_id}>
                            <Image avatar src={shots.url} className="height35px width35px"/>
                        </div>
                        )
            })
        }
    }
    render(){
        let {loader, game, mainPictureUrl} = this.state;
        let displayCss = classNames('flex-row-start', 'full-width', 'padding1cent',{'displayNone':loader});
        return (
                <div className="flex-col-start full-width full-height">
                    <Segment> <Header size={'huge'}>{game.name}</Header></Segment>
                    <Loader active={loader}>Loading</Loader>
                    <div className={displayCss}>
                        <div className="flex-row-space-around width25cent">
                            <div className="flex-col-start">
                                {this.createCoverDisplay()}
                                {this.createImageDisplay()}
                            </div>
                            <Image floated={'left'} src={mainPictureUrl} className="image-size"/>
                        </div>
                        <div className="flex-row-start width75cent">
                            <SummarySegment game={game}/>
                        </div>
                    </div>
                    {loader?'':this.createVideoDisplay()}
                </div>
            )
    }
}
function mapStateToProps(state,props) {
    return {
        singleGame:state.singleGame
    }
}
// GamesPage.propTypes= {
//     fetchGameInformation:React.PropTypes.func.isRequired,
//     singleGame:React.PropTypes.object.isRequired
// };
export default connect(mapStateToProps,{fetchGameInformation})(GamesPage)