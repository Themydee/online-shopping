import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/Store';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import useStyles from '../utils/style';
import { Typography, List, ListItem, FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';


export default function Payment() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const classes = useStyles();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState('');
    const { state, dispatch } = useContext(Store);
    const {
        cart: {shippingAddress}, 
    } = state;

    useEffect(() => {
        closeSnackbar();
        if(!shippingAddress.address) {
            enqueueSnackbar('Payment method is required', {variant: 'error'})
        }else{
            setPaymentMethod(Cookies.get('paymentMethod') || '');
        }
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        if(!paymentMethod){
            router.push('/payment')
        }else{
            dispatch({type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod});
            Cookies.set('paymentMethod', paymentMethod);
            router.push('/placeorder');
        }
        
    }
   return <Layout title="Payment Method">
    <CheckoutWizard activeStep={2}></CheckoutWizard>
    <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
            Payment Method
        </Typography>
        <List>
            <ListItem>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="Payment Method" name="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <FormControlLabel label="Paypal" value="Paypal" control={<Radio />}></FormControlLabel>                   
                        <FormControlLabel label="Stripe" value="Stripe" control={<Radio />}></FormControlLabel>                   
                        <FormControlLabel label="Cash" value="Cash" control={<Radio />}></FormControlLabel>                   
                    </RadioGroup>
                </FormControl>
            </ListItem>

            <ListItem>
                <Button variant='contained' type='submit' fullWidth color='primary'>Continue</Button>
            </ListItem>

            <ListItem>
                <Button variant='contained' type='button' fullWidth onClick={() => router.push('/shipping')}>Go Back</Button>
            </ListItem>
        </List>
    </form>
   </Layout>;
}
