/**
 * Created by ankit on 4/24/17.
 */
import React from 'react'
import {connect} from 'react-redux';
import './index.css'
import { Step , Statistic, Grid, Item, Button ,Icon,  Form, Menu, Image,Header, Modal } from 'semantic-ui-react'
//import {browserHistory} from 'react-router-dom'
const paymentArray = [
    {name:'PayPal',icon:'paypal-curved-64px.png'},
    {name:'American Express',icon:'american-express-curved-64px.png'},
    {name:'Ebay',icon:'ebay-curved-64px.png'},
    {name:'Google Checkout',icon:'google-checkout-curved-64px.png'},
    {name:'VISA',icon:'visa-curved-64px.png'},
    {name:'MasterCard',icon:'mastercard-curved-64px.png'}];
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
           return (<Item key={game.id} >
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
        return (<Grid.Column width={8} centered>
            <Grid.Row><Image src={'https://raw.githubusercontent.com/ankitmehta94/Video-Game-Ecommerce/master/src/assets/'+pay.icon} size={'small'}/></Grid.Row>
            <Grid.Row> </Grid.Row>
                <Modal trigger={<Button animated='vertical'>
                    <Button.Content visible>PAY</Button.Content>
                    <Button.Content hidden>
                        {this.totalAmountToPay()}
                    </Button.Content>
                </Button>}>
                    <Modal.Header>You Have Completed The Game Buying Process</Modal.Header>
                    <Modal.Content image>
                        <Modal.Description>
                            <Header>Sorry! You don't actually get the game(s), but you didn't actually pay either. No harm no foul!!!</Header>
                        </Modal.Description>
                    </Modal.Content>
                </Modal></Grid.Column>
    )
    }

    createPaymentList(){
        return paymentArray.map((pay)=>{
return (<Menu.Item key={pay.name} name={pay.name} active={this.state.activePayType.name === pay.name}  onClick={()=>{this.setState({activePayType:pay})}} />)
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