/**
 * Created by ankit on 4/22/17.
 */
import React from 'react'
import {connect} from 'react-redux';
import './index.css'
import { Header, Label, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
class navBar extends  React.Component {
    state = {
        selectedGames:[]
    }
    componentWillReceiveProps = (nextProps) =>{
        this.setState({selectedGames:nextProps.selectedGames})
    }
    render(){
        return (
            <Header as='h3' block>
               <Link to="/cart"> <Label>
                    <Icon name='shopping cart' size='big' />{this.state.selectedGames.length}
               </Label></Link>

            </Header>
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