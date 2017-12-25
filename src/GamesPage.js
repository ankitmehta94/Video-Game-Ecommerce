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
    state={
        game:this.props.singleGame?this.props.singleGame:null,
        screenShots:this.props.singleGame?this.props.singleGame.screenshots:null,
        mainPictureUrl:null,
        cover:null,
        loader:true

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
            return(  <div className="flex-row-space-around">
                <div className="width20cent flex-row-center align-items-center" ><Icon name={'chevron circle left'} size='huge' onClick={previousVideo} /></div>
                <div  width={10}><Segment>
                    <iframe id="embeddedVideo" width="854" height="400" src={link} ></iframe>
                </Segment></div>
                <div className="width20cent flex-row-center align-items-center"><Icon name={'chevron circle right'} size='huge' onClick={nextVideo}/></div>
            </div>)
        }else{
            return ( <Header as='h3' block textAlign={'centered'} content={'NO VIDEOS AVAILABLE'}/>);
        }
        
}
    componentDidMount () {
        //console.log(this.props.match.params.id);
        this.props.fetchGameInformation(this.props.match.params.id)
    }
    createCoverDisplay(){
        return (this.state.cover&&<List.Item onMouseOver={()=>{this.setState({mainPictureUrl:this.state.cover.url})}} >
            <Image avatar src={this.state.cover.url} className="height35px width35px"/></List.Item>)
    }
    createImageDisplay (){
        console.log(this.state.game)
        if(this.state.screenShots) {
            return this.state.screenShots.map((shots) => {
                return (<div onMouseOver={()=>{this.setState({mainPictureUrl:shots.url})}} key={shots.cloudinary_id}>
                    <Image avatar src={shots.url} className="height35px width35px"/></div>)
            })
        }
    }
    render(){
        let displayCss = classNames('flex-row-start', 'full-width', 'padding1cent',{'displayNone':this.state.loader});
        return (
                <div className="flex-col-start full-width full-height">
                    <Segment> <Header size={'huge'}>{this.state.game.name}</Header></Segment>
                    <Loader active={this.state.loader}>Loading</Loader>
                    <div className={displayCss}>
                        <div className="flex-row-space-around width25cent">
                            <div className="flex-col-start">
                                {this.createCoverDisplay()}
                                {this.createImageDisplay()}
                            </div>
                            <Image floated={'left'} src={this.state.mainPictureUrl} className="image-size"/>
                        </div>
                        <div className="flex-row-start width75cent">
                            <SummarySegment game={this.state.game}/>
                        </div>
                    </div>
                    {this.state.loader?'':this.createVideoDisplay()}
                </div>
            )
        // return (
        //     <div>
        //         <Segment> <Header size={'huge'}>{this.state.game.name}</Header></Segment>
        //         <Grid  >
        //             <Grid.Row className={displayCss}>
        //             <Grid.Column width={5}>
        //             <Grid.Row >
        //                 <List floated={'left'}>{this.createCoverDisplay()}
        //                     {this.createImageDisplay()}</List>
        //                 <Image floated={'left'} src={this.state.mainPictureUrl} className="image-size"/>
        //             </Grid.Row>
        //             </Grid.Column>
        //             <Grid.Column width={11}>
        //                 <SummarySegment game={this.state.game}/>
        //             </Grid.Column>
        //             </Grid.Row>
        //             <Loader active={this.state.loader}>Loading</Loader>
        //             {this.createVideoDisplay()}
        //           </Grid></div>

        // )
    }
}
function mapStateToProps(state,props) {
    console.log(state);
    return {
        singleGame:state.singleGame
    }
}
// GamesPage.propTypes= {
//     fetchGameInformation:React.PropTypes.func.isRequired,
//     singleGame:React.PropTypes.object.isRequired
// };
export default connect(mapStateToProps,{fetchGameInformation})(GamesPage)