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
        selectedGame:[]
    }
    render(){
        return (
            <Header as='h3' block>
                <Label>
                    <Icon name='shopping cart' size='big' />{this.state.selectedGame.length>0?this.state.selectedGame.length:''}
                </Label>

            </Header>
        )
    }
}
navBar.propTypes= {
    fetchPopularGames:React.PropTypes.func.isRequired,
    games:React.PropTypes.array.isRequired
};
export default navBar