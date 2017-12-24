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
    state = {
        selectedGames:[]
    }
    componentWillReceiveProps = (nextProps) =>{
        this.setState({selectedGames:nextProps.selectedGames})
    }
    returnNavBar(){
        return (
            <div className="flex-row-space-between full-width"></div>
            )
    }
    render(){

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
                            <Icon name='shopping cart' size='big' />&nbsp;{this.state.selectedGames.length}
                        </Link>
                    </Label>
                </div>
            </div>
            )
        // return (
        //     <StickyContainer>
        //     <Sticky>
        //     <Header as='h3' block textAlign={'justified'}>
        //         <Label> <Link to="/">
        //         <Icon name='home' size='big' />
        //     </Link></Label>
        //         <Label className={'floatRight'}> <Link to="/cart">
        //             <Icon name='shopping cart' size='big' />{this.state.selectedGames.length}
        //        </Link></Label>
        //     </Header>
        //     </Sticky>
        //     </StickyContainer>

        // )
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