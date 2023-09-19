import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { googleSignIn, signInUser } from "../../store/userSlice";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const onSubmit = async ({ password, email }) => {
        try {
            await dispatch(signInUser({ email, password }));
            // reset();
        } catch (error) {
            // console.error('Login error:', error);
        }
    };

    const handleGoogleSign = async () => {
        try {
            await dispatch(googleSignIn());
            navigate('/'); // Navigate to the home page after successful Google sign-in
        } catch (error) {
            console.error('Google sign-in error:', error);
            // Handle Google sign-in error, e.g., display an error message to the user
        }
    }

    const { isLoading, error, isError, email } = useSelector((state) => state.user);

    useEffect(() => {
        if (isError && error) {
            toast.error(error)
        }
    }, [error, isError])

    useEffect(() => {
        if (!isLoading && email) {
            navigate('/')
        }
    }, [isLoading, email])

    return (
        <div className="sign-up-container">
            <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                />
            <div>
                <h2 className="heading">Login Up Now</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input {...register("email", { required: true })} placeholder=" " />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" {...register("password", { required: true })} placeholder=" " />
                    </div>

                    <input className="btn" type="submit" /> <br />
                    <p>New here create <Link to="/signUp">Account</Link></p>
                    <div style={{ marginBottom: "12px" }}>
                        --------------------------------------------------------------
                        <p style={{ textAlign: 'center' }}>Or</p>
                        --------------------------------------------------------------
                    </div>
                    <Link onClick={handleGoogleSign} className="google-btn">
                        <FaGoogle /> Countine with Google
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
