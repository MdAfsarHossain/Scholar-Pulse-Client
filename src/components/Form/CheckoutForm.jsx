// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import { useEffect, useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ApplicantModal from '../Modal/ApplicantModal';
import './CheckoutForm.css';

// class CheckoutForm extends React.Component {
const CheckoutForm = ({ checkOutData }) => {

    const stripe = useStripe()
    const elements = useElements()
    const [clientSecret, setClientSecret] = useState();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [cardError, setCardError] = useState('')
    const [processing, setProcessing] = useState(false)

    // Application Information
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [scholarShipData, setScholarShipData] = useState(checkOutData);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleUpdateOpenModal = () => {
        setUpdateModalIsOpen(true);
    }

    const handleUpdateCloseModal = () => {
        setUpdateModalIsOpen(false);
    }


    useEffect(() => {
        let totalPrice = parseFloat(checkOutData?.applicationFees);
        // fetch client secret
        if (totalPrice > 1) {
            getClientSecret({ price: totalPrice })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkOutData?.applicationFees, updateModalIsOpen])

    //   get clientSecret
    const getClientSecret = async price => {
        const { data } = await axiosSecure.post(`/create-payment-intent`, price)
        // console.log('clientSecret from server--->', data)
        setClientSecret(data.clientSecret)
    }

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        setProcessing(true)

        // const { stripe, elements } = this.props;

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            // console.log('[error]', error);
            setCardError(error.message);
            setProcessing(false);
            return;
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
            setCardError("");
        }


        // confirm payment
        const { error: confirmError, paymentIntent } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email,
                        name: user?.displayName,
                    },
                },
            })

        if (confirmError) {
            // console.log(confirmError)
            setCardError(confirmError.message)
            setProcessing(false)
            return
        }

        if (paymentIntent.status === 'succeeded') {

            toast.success("Payment was successfully done!");

            // 1. Create payment info object
            const paymentInfo = {
                ...checkOutData,
                scholarshipId: checkOutData._id,
                transactionId: paymentIntent.id,
                date: new Date(),
            }
            delete paymentInfo._id
            // console.log(paymentInfo)
            setProcessing(false);
            handleUpdateOpenModal()
            return;
        }

        setProcessing(false)
    };

    // return ()
    // const { stripe } = this.props;
    return (
        <>
            <form onSubmit={handleSubmit} >
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />

                {/* Pay Button */}
                <div className="" >
                    <button
                        type="submit"
                        disabled={!stripe || !clientSecret || processing}
                        className='disabled:cursor-not-allowed bg-[#0AB99D] text-white font-bold w-full py-3 rounded-md border-2 border-[#0AB99D] uppercase hover:bg-transparent hover:text-[#0AB99D] transition-all'
                    >{processing ? (
                        <TbFidgetSpinner className="animate-spin m-auto" />
                    ) : (
                        "Pay Now"
                    )}</button>
                </div >
            </form >
            {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}


            <ApplicantModal
                isOpen={updateModalIsOpen}
                closeModal={handleUpdateCloseModal}
                applicationFees={checkOutData?.applicationFees}
                scholarShipData={scholarShipData}
                setScholarShipData={setScholarShipData}
            />
        </>
    );
}


export default CheckoutForm;