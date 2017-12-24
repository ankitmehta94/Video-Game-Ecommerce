/**
 * Created by ankit on 4/24/17.
 */
import React from 'react'
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
    renderForm(){
        console.log(getRandomArbitrary(0,50));
        let autoFill = ()=>{this.setState({fPeople:this.props.people[getRandomArbitrary(0,50)]});console.log('What the fuck?')}
        if(this.state.activeStep==='address'){
            console.log(this.state.fPeople)
            return (<Grid centered><Grid.Row>
                <Message
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
            </Grid.Row>
            <Grid.Row>
                <Button animated='vertical' onClick={autoFill}>
                    <Button.Content visible>Too Lazy?</Button.Content>
                    <Button.Content hidden>
                        Auto-Fill
                    </Button.Content>
                </Button>
            </Grid.Row>
                <Grid.Row>  <Button animated='vertical' onClick={this.goToPayment}>
                <Button.Content visible>NEXT</Button.Content>
                <Button.Content hidden>
                    <Icon name='chevron right' />
                </Button.Content>
            </Button></Grid.Row></Grid>)
        }
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
                    <Message content={'THERE ARE NO GAMES IN YOUR CART '}/>
                    )

        }
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

            <Grid.Row>{this.howMuchToPay()}</Grid.Row>
            <Grid.Row>  <Button animated='vertical' disabled={this.state.disableItemsButton} onClick={this.goToAddress}>
                <Button.Content visible>NEXT</Button.Content>
                <Button.Content hidden>
                    <Icon name='chevron right' />
                </Button.Content>
            </Button></Grid.Row>

        </Grid>}      {this.renderForm()}
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
        selectedGames:state.cartGames,
        people:state.randomPeople
    }
}
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
export default connect(mapStateToProps)(CartPage)