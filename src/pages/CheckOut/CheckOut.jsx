import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../../components/Form/CheckoutForm';
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckOut = () => {

    // Code for Checkout Page goes here...
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetching the selected scholarship details using the id
    const { data: checkOutData, isLoading, refetch } = useQuery({
        queryKey: ['checkOutData', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/single-scholartship/${id}`);
            return data;
        }
    })

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className='mt-24 px-5 lg:px-5'>

            <Helmet>
                <title>Scholar Pulse | Checkout</title>
            </Helmet>

            {/* Heading */}
            <div className="flex flex-col items-center justify-center">
                <h1 className='uppercase font-bold text-3xl md:text-4xl'>Checkout <span className='text-[#0AB99D]'>Page</span></h1>
                <div className="mt-1 h-[2px] bg-[#0AB99D] w-36"></div>
            </div>
            {/* End of Heading */}

            <div className="mt-10 border-2 mx-auto md:w-[450px] lg:w-[450px] p-5 rounded-lg border-[#0AB99D]">
                {/* Total Price Info */}
                <div className="">
                    <div className="flex flex-row gap-2 justify-start items-center">
                        <h1 className="text-xl font-bold">Application Fees: </h1>
                        <p className="text-lg font-semibold">${checkOutData?.applicationFees}</p>
                    </div>
                </div>

                {/* Stripe Process */}
                <div className="mx-auto lg:w-96">
                    <Elements stripe={stripePromise}>
                        {/* Check out form */}
                        <CheckoutForm
                        checkOutData={checkOutData}
                        />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;