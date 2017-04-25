/**
 * Created by ankit on 4/24/17.
 */
import React from 'react'
import {connect} from 'react-redux';
import './index.css'
import { Step , Statistic, Grid, Item, Button ,Icon,  Form, Menu, Image } from 'semantic-ui-react'
//import {browserHistory} from 'react-router-dom'
const paymentArray = [
    {name:'PayPal',icon:'https://dl.dropboxusercontent.com/content_link/4Cr49gkHxtuOBAGfOwa8OMMBHcRt5keU3CSfVzupqM77fVRcq3zl7sWKrRJcCsHh/file'},
    {name:'American Express',icon:'https://dl.dropboxusercontent.com/content_link/k9hxZrqOrXol75KMvKxD1ZRfXRFWUAdDpm225hKFJqE4KuujrG2ChpJaEAo2codP/file'},
    {name:'Ebay',icon:'https://dl.dropboxusercontent.com/content_link/94Ph3XcJDUzPP2Sqg9xVoVDFaQbOI4EHWm31yqXq60CZPFiv1bzhm11PiMtglqXY/file'},
    {name:'Google Checkout',icon:'zhttps://dl.dropboxusercontent.com/content_link/iJmcClg5OBidxOFT7OhNqtr2gPTBk5Ty26ysDRY8tyRdsqAz2AN1JFHmj5hcPnsq/file'},
    {name:'VISA',icon:'https://dl.dropboxusercontent.com/content_link/JxC9i1DlIkS0r5tsF0VgcjjQut017nGK8jrAw4q0eZqQOPjsObK2YymKCKFRhdp9/file'},
    {name:'MasterCard',icon:'https://dl.dropboxusercontent.com/content_link/N3Jkz0HEloSWRKlTBb66vXBtU1QxrzAUYgG0hBXEuqqpuKo9FEqQztQfhT98WwQw/file'}];
class CartPage extends  React.Component {
    state = {
        selectedGames:[],
        activeStep:'totalling',
        totallingDone:false,
        addressDone:false,
        paymentDone:false,
        activePayType:paymentArray[0]
    }
    componentWillReceiveProps = (nextProps) =>{
        this.setState({selectedGames:nextProps.selectedGames})
    }
    componentDidMount () {
        this.setState({selectedGames:this.props.selectedGames})
    }
    createItemList(){
        return(  <Item.Group>{this.createItems(this.state.selectedGames)}</Item.Group>)
    }
    createItems(games){
        console.log(games)
       return games.map((game=>{
           return (<Item key={game.id}>
                <Item.Image size='tiny' src={'https:' + game.cover.url} />
                <Item.Content verticalAlign='middle'>
                    <Item.Header >{game.name}</Item.Header>
                    <Item.Meta >
                        <span className='price'>{game.aggregated_rating?'$'+Math.round(game.aggregated_rating):'FREE'}</span>
                    </Item.Meta>
                </Item.Content>
            </Item>)
        }))

    }
    renderPayment(pay) {
        return (<Grid.Column width={8}>
            <Grid.Row><Image src={pay.icon} size={'small'}/></Grid.Row>
            <Grid.Row> <Button animated='vertical' onClick={this.goToAddress}>
                <Button.Content visible>PAY</Button.Content>
                <Button.Content hidden>
                    {this.totalAmountToPay()}
                </Button.Content>
            </Button></Grid.Row></Grid.Column>
    )
    }
    createPaymentList(){
        return paymentArray.map((pay)=>{
return (<Menu.Item key={pay.name} name={pay.name} active={this.state.activePayType.name === pay.name} />)
        })
    }
    goToAddress=()=>{this.setState({activeStep:'address',addressDone:false,totallingDone:true});console.log('BC')}
    goToPayment=()=>{this.setState({activeStep:'payment',addressDone:true,totallingDone:true})}
    totalAmountToPay(){
        let pay = 0;
        this.props.selectedGames.map((game=>{
            if(game.aggregated_rating){
                pay += Math.round(game.aggregated_rating)}
        }));

        return pay
    }
    render(){
        return (
            <Grid centered>
                <Grid.Row>
        <Step.Group>
            <Step disabled={this.state.activeStep!=='totalling'}>
                <Step.Title>GAMES</Step.Title>
                <Step.Description>Your Selected Games</Step.Description>
            </Step>
            <Step disabled={this.state.activeStep!=='address'}>
                <Step.Title>ADDRESS</Step.Title>
                <Step.Description>Choose your shipping address</Step.Description>
            </Step>
            <Step disabled={this.state.activeStep!=='payment'}>
                <Step.Title>PAYMENT</Step.Title>
                <Step.Description>Choose your shipping options</Step.Description>
            </Step>
        </Step.Group>
                </Grid.Row>
                {this.state.activeStep==='totalling'&&<Grid centered>
            <Grid.Row>{this.createItemList()}</Grid.Row>
            <Grid.Row><Statistic horizontal value={this.totalAmountToPay()} label='Dollars' /></Grid.Row>
            <Grid.Row>  <Button animated='vertical' onClick={this.goToAddress}>
                <Button.Content visible>NEXT</Button.Content>
                <Button.Content hidden>
                    <Icon name='chevron right' />
                </Button.Content>
            </Button></Grid.Row>

        </Grid>}      {this.state.activeStep==='address'&&<Grid centered><Grid.Row>
                <Form size={'big'}>
                    <Form.Group >
                        <Form.Input label='First name' placeholder='First name'  width={8} />
                        <Form.Input label='Last name' placeholder='Last name'  width={8}   />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label='Address' placeholder='Flat No, Locality' width={12} />
                        <Form.Input label='City' placeholder='City' width={4}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input label='State' placeholder='State'  />
                        <Form.Input label='Country' placeholder='Country' />
                    </Form.Group>
                </Form>
            </Grid.Row> <Grid.Row>  <Button animated='vertical' onClick={this.goToPayment}>
                <Button.Content visible>NEXT</Button.Content>
                <Button.Content hidden>
                <Icon name='chevron right' />
                </Button.Content>
            </Button></Grid.Row></Grid>}
                {this.state.activeStep==='payment'&&<Grid centered><Grid.Column width={8}>
                    <Menu fluid vertical tabular>
                        {this.createPaymentList()}
                    </Menu>
                </Grid.Column>
                    {this.renderPayment(this.state.activePayType)}
                </Grid>}
            </Grid>)


    }
}
function mapStateToProps(state,props) {
    console.log(props);
    console.log(state);
    return {
        selectedGames:state.cartGames
    }
}
export default connect(mapStateToProps)(CartPage)