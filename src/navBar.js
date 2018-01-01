/**
 * Created by ankit on 4/22/17.
 */
import React from 'react'
import {connect} from 'react-redux';
import './index.css'
import { Header, Label, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { StickyContainer, Sticky } from 'react-sticky';
class navBar extends  React.Component {
    constructor(props){
        super(props);
        this.state={
            selectedGames:[]
        };
    }
    componentWillReceiveProps = (nextProps) =>{
        this.setState({selectedGames:nextProps.selectedGames})
    }
    render(){
        let {selectedGames} = this.state;
        return (
            <div className=" full-width navHeight padding2cent navStyle">
                <div className="flex-row-space-between full-width">
                    <Label>
                        <Link to="/">
                            <Icon name='home' size='big' />
                        </Link>
                    </Label>
                    <Label className={'floatRight'}> 
                        <Link to="/cart">
                            <Icon name='shopping cart' size='big' />&nbsp;{selectedGames.length}
                        </Link>
                    </Label>
                </div>
            </div>
            )
    }
}
function mapStateToProps(state,props) {
    return {
        selectedGames:state.cartGames
    }
}
export default connect(mapStateToProps)(navBar)