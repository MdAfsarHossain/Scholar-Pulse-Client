import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { saveUser } from "../../api";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const {
        logInUser,
        registerWithGoogle,
        setUserLoginEmail,
        loading,
        setLoading,
    } = useAuth() || {};

    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        const email = data.email;
        const password = data.password;

        try {
            await logInUser(email, password)
            toast.success("Successfully logged in!");
            navigate(location?.state ? location.state : "/");
        } catch (error) {

            toast.error("Failed to log in. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    const handleGoogleLogin = async () => {

        setLoading(true);
        try {
            //User Registration using google
            const data = await registerWithGoogle()
            // save user info in db if the user is new
            await saveUser(data?.user)
            navigate(location?.state ? location.state : "/");
            toast.success("Logged in with Google successfully!");
        } catch (error) {
            toast.error("Failed to log in with Google. Please try again later.");
        }
        finally {
            setLoading(false);
        }
    };

    const handleForgetPassButton = (e) => {
        e.preventDefault();
        navigate("/forget-password");
    };

    return (
        <div className="px-5 lg:px-0">
            {/* Dynamic Title */}
            <Helmet>
                <title>Scholar Plus | Login</title>
            </Helmet>

            <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-2xl mx-auto mt-20">
                <h1 className="text-4xl font-bold text-center uppercase">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email address"
                            onChange={(e) => setUserLoginEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-100 focus:border-violet-400"
                            {...register("email", { required: true })}
                        />
                    </div>
                    {errors.email && (
                        <span className="text-red-500">This field is required</span>
                    )}

                    {/* Password */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-100  focus:border-violet-400"
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-base">
                                This field is required
                            </span>
                        )}
                        <div className="flex justify-end text-xs text-gray-700">
                            <button>Forgot Password?</button>
                        </div>
                    </div>
                    <button
                        disabled={loading}
                        className="disabled:cursor-not-allowed block w-full px-4 py-3 rounded-lg text-center bg-[#0AB99D] text-white font-bold text-xl border-2 border-[#0AB99D] hover:bg-transparent hover:text-[#0AB99D] transition-all"
                    >
                        {loading ? (
                            <TbFidgetSpinner className="animate-spin m-auto" />
                        ) : (
                            "Log In"
                        )}
                    </button>
                </form>

                <button
                    onClick={handleGoogleLogin}
                    aria-label="Login with Google"
                    type="button"
                    className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="w-5 h-5 fill-current"
                    >
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                    <p>Login with Google</p>
                </button>

                <p className="text-xs text-center sm:px-6 text-gray-700">
                    Don't have an account?
                    <Link to="/register" className="ml-2 underline ">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;