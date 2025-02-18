import { useState } from "react";
import toast from "react-hot-toast";

const NewLetter = () => {

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // alert(`Thank you for subscribing, ${email}!`);
        toast.success(`Thanks for subscribing, ${email}!`);
        setEmail("");
    };
    return (
        <div className="bg-blue-600 py-12 rounded-md m-5 lg:m-0">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                    Stay Updated on Scholarships
                </h2>
                <p className="text-gray-200 mb-8">
                    Subscribe to our newsletter to get the latest scholarship opportunities.
                </p>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full md:w-auto bg-white text-blue-600 py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300"
                        >
                            Subscribe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewLetter;