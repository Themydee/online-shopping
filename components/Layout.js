import React, { useContext, useState } from 'react'
import Head from 'next/head'
import { AppBar, Toolbar, Typography, Container, Link, ThemeProvider, CssBaseline, Button,  Badge, Menu, MenuItem} from '@material-ui/core';
import useStyles from '../utils/style';
import NextLink from 'next/Link'
import { createTheme } from '@material-ui/core/styles'
import dynamic from 'next/dynamic'
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';



function Layout({title, description, children}) {
    const { state, dispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const theme = createTheme({
        typography: {
            h1: {
                fontSize: '2.0rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
            h2: {
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
            palette:{
                type: 'light',
                primary: {
                    main: '#000000',
                },
                secondary: {
                    main: '#000000'
                },
            },

        }
    })
    const classes = useStyles();
    const router = useRouter();
    const [ anchorEl, setAnchorEl] =useState(null) 
    const loginClickHandler = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const loginMenuCloseHandler = () => {
        setAnchorEl(null);
    };
    const logoutClickHandler = () => {
        setAnchorEl(null);
        dispatch({type: 'USER_LOGOUT'});
        Cookies.remove('userInfo');
        Cookies.remove('cartItems');
        router.push('/')
    }
    

  return (
    <div>
        <Head>
            <title>{title? `${title} - AEDH`: 'AEDH'}</title>
            {description && <meta name="description" content={description}></meta>}
        </Head>
        <ThemeProvider theme={theme}> 
        <CssBaseline />
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <NextLink href='/' passHref>
                        <Link>
                            <Typography className={classes.brand}>AEDH</Typography>
                        </Link>
                        
                    </NextLink>
                    
                    <div className={classes.grow}></div>
                    <div>
                        <NextLink href="/cart" passHref>
                            <Link>
                            {cart.cartItems.length > 0 ? <Badge color='secondary' badgeContent={cart.cartItems.length}>Cart</Badge>: "Cart"}
                            </Link>
                        </NextLink>
                        {userInfo ?  ( 
                            <>
                        <Button 
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={loginClickHandler}
                        className={classes.navbarButton}>
                            {userInfo.name}
                        </Button>
                        <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={loginMenuCloseHandler}
                        >
                            <MenuItem onClick={loginMenuCloseHandler}>Profile</MenuItem>
                            <MenuItem onClick={loginMenuCloseHandler}>My Account</MenuItem>
                            <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                        </Menu>
                            </>
                         ) : (
                            <NextLink href="/login" passHref>
                                <Link>Login</Link>
                            </NextLink>
                        )}
                        
                    </div>
                </Toolbar>
            </AppBar>
            <Container className={classes.main}>
                {children}
            </Container>
            <footer className={classes.footer}>
                <Typography>
                    All rights reserved. AEDH
                </Typography>
            </footer>
        </ThemeProvider>
       
    </div>
  );
}


export default dynamic(() => Promise.resolve(Layout), { ssr: false})