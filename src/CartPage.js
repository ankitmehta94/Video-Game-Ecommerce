/**
 * Created by ankit on 4/24/17.
 */
import React from 'react'
import {removeGameFromCart} from './actions'
import {connect} from 'react-redux';
import './index.css'
import { Step , Statistic, Grid, Item, Button ,Icon,  Form, Menu, Image,Header, Modal,Message } from 'semantic-ui-react'
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
        activePayType:paymentArray[0],
        fPeople:{first_name:'',last_name:'',email:''},
        disableItemsButton:false
    }
    componentWillReceiveProps = (nextProps) =>{
        console.log(nextProps.selectedGames.length);
        if(nextProps.selectedGames.length===0){
            window.location = '/';
        }else{
            this.setState({selectedGames:nextProps.selectedGames})
        }

    }
    componentDidMount () {
           console.log(this.props.selectedGames.length);
        if(this.props.selectedGames.length===0){
            window.location = '/';
        }else{
            this.setState({selectedGames:this.props.selectedGames})
        }
        //this.setState({selectedGames:this.props.selectedGames})
    }
    createItemList(){
        return(  <Item.Group className="full-width">{this.createItems(this.state.selectedGames)}</Item.Group>)
    }
    createItems(games){
        console.log(games)
       return games.map((game=>{
           return (<Item key={game.id} >
                <Item.Image size='small' src={game.cover.url} />
                <Item.Content verticalAlign='middle'>
                    <Item.Header >{game.name}</Item.Header>
                    <Item.Meta >
                        <span className='price'>{game.aggregated_rating?'$'+Math.round(game.aggregated_rating):'FREE'}</span>
                    </Item.Meta>
                    <Icon name='cross' />
                </Item.Content>
            </Item>)
        }))

    }
    renderForm(){
        console.log(getRandomArbitrary(0,50));
        let autoFill = ()=>{this.setState({fPeople:this.props.people[getRandomArbitrary(0,50)]});console.log('What the fuck?')}
        if(this.state.activeStep==='address'){
            console.log(this.state.fPeople)
            return (<div className="full-width flex-col-start">
                <div className="full-width flex-col-start padding-bottom-2cent">
                <Message
                    className="full-width flex-row-center"
                    attached
                    floating={true}
                    compact={false}
                    header='Hey we need your details to send you the games!'
                    content='Fill out the form below to complete your first mission'
                />
                <Form className='attached fluid segment'>
                    <Form.Group widths='equal'>
                        <Form.Input label='First Name' placeholder='First Name' value={this.state.fPeople.first_name} type='text' />
                        <Form.Input label='Last Name' placeholder='Last Name'  value={this.state.fPeople.last_name} type='text' />
                    </Form.Group>
                    <Form.Input label='Email' placeholder='Email' type='text'  value={this.state.fPeople.email} />
                    <Form.Checkbox inline label='I agree to the terms and conditions which are to play these kickass games' />
                </Form>
            </div>
            <div className="full-width flex-row-center padding-bottom-2cent">
                <Button animated='vertical' onClick={autoFill}>
                    <Button.Content visible>Too Lazy?</Button.Content>
                    <Button.Content hidden>
                        Auto-Fill
                    </Button.Content>
                </Button>
            </div>
            <div className="full-width flex-row-end padding-bottom-2cent" >  <Button animated='vertical' disabled={this.state.disableItemsButton} onClick={this.goToPayment}>
                <Button.Content visible>NEXT</Button.Content>
                <Button.Content hidden>
                    <Icon name='chevron right' />
                </Button.Content>
            </Button></div>

                </div>)
        }
    }
    renderPayment(pay) {
        return (<div width={12} className="flex-col-space-around full-height full-width">
            <div className="full-width flex-row-center align-items-center"> 
                <Image src={'https://raw.githubusercontent.com/ankitmehta94/Video-Game-Ecommerce/master/src/assets/'+pay.icon} size={'small'}/>
            </div>
            <div className="full-width flex-row-center align-items-center"> 
                <Modal trigger={<Button  animated='vertical'>
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
                </Modal>
                </div>
                </div>
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
        this.props.selectedGames.forEach((game=>{
            if(game.aggregated_rating){
                pay += Math.round(game.aggregated_rating)}
        }));

        return pay
    }
    howMuchToPay(){
        if(this.props.selectedGames.length>0){
            return(<Statistic horizontal value={this.totalAmountToPay()} label='Dollars' />)
        }else{
            this.setState({disableItemsButton:true})
                return(
                    <div className="flex-row-center full-width">
                        <Message content={'THERE ARE NO GAMES IN YOUR CART '}/>
                    </div>
                    )

        }
    }

    render(){
        return (
            <div centered className="full-width flex-col-start">
        <Step.Group className="full-width noMargin">
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
                {this.state.activeStep==='totalling'&&
                <div className="full-width padding1cent flex-col-start">
            <div className="full-width flex-row-start padding-bottom-2cent">{this.createItemList()}</div>

            <div className="full-width flex-row-end padding-bottom-2cent" >{this.howMuchToPay()}</div>
            <div className="full-width flex-row-end padding-bottom-2cent" >  <Button animated='vertical' disabled={this.state.disableItemsButton} onClick={this.goToAddress}>
                <Button.Content visible>NEXT</Button.Content>
                <Button.Content hidden>
                    <Icon name='chevron right' />
                </Button.Content>
            </Button></div>

        </div>}      {this.renderForm()}
                {this.state.activeStep==='payment'&&
                <div className="full-width flex-row-start full-height" centered>
                <div className="width25cent flex-col-center">
                    <Menu fluid vertical tabular>
                        {this.createPaymentList()}
                    </Menu>
                </div>
                    {this.renderPayment(this.state.activePayType)}
                </div>}

            </div>)


    }
}
function mapStateToProps(state,props) {
    console.log(props);
    console.log(state);
    return {
        selectedGames:state.cartGames,
        people:state.randomPeople
    }
}
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
export default connect(mapStateToProps)(CartPage)