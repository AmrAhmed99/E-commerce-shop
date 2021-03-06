import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { commerce } from '../../../lib/commerce';

import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import Conformation from '../Conformation';
import useStyles from './styles';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                setCheckoutToken(token);
            } catch (error) {
                
            }
        }
        generateToken();
    }, []);

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} /> : <PaymentForm />;

    return (
        <React.Fragment>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Conformation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </React.Fragment>
    );
};

export default Checkout;