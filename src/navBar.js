/**
 * Created by ankit on 4/22/17.
 */
import React from 'react'
import {connect} from 'react-redux';
import './index.css'
import { Header, Label, Icon, Segment, Sidebar, Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { StickyContainer, Sticky } from 'react-sticky';
class navBar extends  React.Component {
    state = {
        selectedGames:[]
    }
    componentWillReceiveProps = (nextProps) =>{
        this.setState({selectedGames:nextProps.selectedGames})
    }
    render(){
        return (
            <StickyContainer>
            <Sticky>
            <Header as='h3' block>
                <Label> <Link to="/cart">
                    <Icon name='shopping cart' size='big' />{this.state.selectedGames.length}
               </Link></Label>

            </Header>
            </Sticky>
            </StickyContainer>

        )
    }
}
function mapStateToProps(state,props) {
    console.log(props);
    console.log(state);
    return {
        selectedGames:state.cartGames
    }
}
export default connect(mapStateToProps)(navBar)