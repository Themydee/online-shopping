import { TextField, Typography, List, ListItem, Button } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import useStyles from '../utils/style'
import { Store } from '../utils/Store'
import Cookies from 'js-cookie'
import { Controller, useForm} from 'react-hook-form';
import dynamic from 'next/dynamic'
import CheckoutWizard from '../components/CheckoutWizard'


function Shipping() {
    const { handleSubmit, control, formState: { errors }, setValue} = useForm();
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { userInfo, cart: {shippingAddress} } = state;
    useEffect(() => {
        if(!userInfo){
            router.push('/login?redirect=/shipping');
        }
        setValue('fullName', shippingAddress.fullName);
        setValue('address', shippingAddress.address);
        setValue('city', shippingAddress.city);
        setValue('fullName', shippingAddress.postalCode);
        setValue('fullName', shippingAddress.country);
    }, [router, setValue, shippingAddress.address, shippingAddress.city, shippingAddress.country, shippingAddress.fullName, shippingAddress.postalCode, userInfo]);
  
    const classes = useStyles();
    const submitHandler =  ({fullName, address, city,  postalCode,country}) => {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS', 
            payload: {fullName, address, city,  postalCode, country}
        });
        Cookies.set('shippingAddress', {fullName, address, city,  postalCode, country} )
        router.push('/payment') 
    }
  return (  
    <Layout title="Shipping AAddress">
        <CheckoutWizard activeStep={1}/>
        <form onSubmit={handleSubmit(submitHandler)}className={classes.form}>
            <Typography component="h1" variant="h1">
                Shipping Address
            </Typography>
            <List>
                <ListItem>
                        <Controller
                            name='fullName'
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField 
                                variant='outlined' 
                                fullWidth id='fullName' 
                                label="Full Name" 
                                error={Boolean(errors.fullName)}
                                helperText={errors.fullName? errors.fullName.type === 'minLength' ? 'Full Name Length is more than 1': 'Full Name is required': ''}
                                {...field}>
                                </TextField>
                            )}
                            >
                        </Controller>
                </ListItem>
                <ListItem>
                        <Controller
                            name='address'
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField 
                                variant='outlined' 
                                fullWidth id='address' 
                                label="Address" 
                                error={Boolean(errors.address)}
                                helperText={errors.address? errors.address.type === 'minLength' ? 'Address Length is more than 1': 'Address is required': ''}
                                {...field}>
                                </TextField>
                            )}
                            >
                        </Controller>
                </ListItem>
                <ListItem>
                        <Controller
                            name='city'
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField 
                                variant='outlined' 
                                fullWidth id='city' 
                                label="City"
                                error={Boolean(errors.city)}
                                helperText={errors.city? errors.city.type === 'minLength' ? 'City Length is more than 1': 'City is required': ''}
                                {...field}>
                                </TextField>
                            )}
                            >
                        </Controller>
                </ListItem>
                <ListItem>
                        <Controller
                            name='postalCode'
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField 
                                variant='outlined' 
                                fullWidth id='postalCode' 
                                label="Postal Code"
                                error={Boolean(errors.postalCode)}
                                helperText={errors.postalCode? errors.postalCode.type === 'minLength' ? 'Postal Code Length is more than 1': 'Postal Code is required': ''}
                                {...field}>
                                </TextField>
                            )}
                            >
                        </Controller>
                </ListItem>
                <ListItem>
                        <Controller
                            name='country'
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField 
                                variant='outlined' 
                                fullWidth id='country' 
                                label="Country"
                                error={Boolean(errors.country)}
                                helperText={errors.country? errors.country.type === 'minLength' ? 'Country Length is more than 1': 'Country is required': ''}
                                {...field}>
                                </TextField>
                            )}
                            >
                        </Controller>
                </ListItem>
                <ListItem>
                    <Button variant='contained' type='submit' fullWidth color='primary'>Continue</Button>
                </ListItem>
            </List>
        </form>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Shipping), { ssr: false})