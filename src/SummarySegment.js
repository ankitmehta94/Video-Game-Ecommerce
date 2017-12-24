/**
 * Created by ankit on 4/25/17.
 */
import React from 'react';
import {Segment, Image, Label,List, Button,Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import {addGameToCart} from './actions'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//const pegiArray = {'3':'1','7':'2','12':'3','16':'3','5':'4'};
const pegiLink1 = 'http://www.pegi.info/en/index/id/33/media/img/32';
const esrbLink1 = 'https://esrbstorage.blob.core.windows.net/esrbcontent/images/ratingsymbol_';
const pegiLink2 = '.gif';
const esrbLink2 = '.png';
const esrbArray =['rp','ec','e','ec10','t','m','ao'];

class SummarySegment extends React.Component{
    state = {
        esrb:this.props.game.esrb!==undefined?this.props.game.esrb:null,
        pegi:this.props.game.pegi!==undefined?this.props.game.pegi:null,
        timeToBeat:this.props.game.time_to_beat?this.props.game.time_to_beat:null
    }
    componentWillReceiveProps = (nextProps) =>{
        console.log(nextProps);
        this.setState({pegi:nextProps.game.pegi,esrb:nextProps.game.esrb,timeToBeat:nextProps.game.time_to_beat})
        console.log(this.state);
    }
    createTimeToBeatList(){
        if(this.state.timeToBeat){
            return (<List.Item>
                <Label color={'red'}>HASTLY<Label.Detail>{Math.round(this.state.timeToBeat.hastly/3600)} hours</Label.Detail></Label>
                <Label color={'yellow'}>Normally<Label.Detail>{Math.round(this.state.timeToBeat.normally/3600)} hours</Label.Detail></Label>
                <Label color={'green'}>Completely<Label.Detail>{Math.round(this.state.timeToBeat.completely/3600)} hours</Label.Detail></Label>
            </List.Item>)
        }

    }
    esrbValue(){
        console.log(esrbLink1+esrbArray[this.state.esrb.rating]+esrbLink2);
        return   esrbLink1+esrbArray[this.state.esrb.rating]+esrbLink2;
    }
    render(){
        //console.log(esrbLink1+esrbArray[this.state.esrb.rating]+esrbLink2);
        // let pegiValue = pegiArray[this.state.pegi.rating]
        return (<Segment>
            <Segment raised>
                <Label as='a' color='red'  ribbon>Summary</Label>{this.props.game.summary}</Segment>
            {this.props.game.storyline&&<Segment raised><Label as='a' color='blue' ribbon>Storyline</Label>{this.props.game.storyline}</Segment>}
            <List horizontal>
                <List.Item>
                    {this.state.pegi && <Image  src={pegiLink1+(this.state.pegi.rating-1)+pegiLink2} size={'mini'}/>}</List.Item>
                <List.Item>{this.state.esrb && <Image  src={this.esrbValue()} size={'mini'}/>}</List.Item>
                <List.Item>{this.createTimeToBeatList()}</List.Item>
                <List.Item><Button animated='vertical' onClick={()=>{this.props.addGameToCart(this.props.game)}}>
                    <Button.Content visible>ADD TO CART</Button.Content>
                    <Button.Content hidden>
                        <Icon name='shop' />
                    </Button.Content>
                </Button>
                </List.Item>
                <List.Item>
                    <Link to="/cart">
                        <Button animated='vertical' onClick={()=>{console.log(this.props);this.props.addGameToCart(this.props.game)}}>
                            <Button.Content visible>{this.props.game.aggregated_rating?'$'+Math.round(this.props.game.aggregated_rating):'FREE'}</Button.Content>
                            <Button.Content hidden>
                                {this.props.game.aggregated_rating?'BUY':'GET'}
                            </Button.Content>
                        </Button>
                    </Link></List.Item>
            </List>
        </Segment>)
    }
}
function mapStateToProps() {
    return {}
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({addGameToCart:addGameToCart}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(SummarySegment)