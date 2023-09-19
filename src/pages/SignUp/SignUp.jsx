import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { createUser, googleSignIn } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const { isLoading, error, isError, email } = useSelector((state) => state.user)

    const onSubmit = async ({ name, password, email }) => {
        try {
            await dispatch(createUser({ email, password }));
            // reset();
        } catch (error) {
            console.error('Sign-up error:', error);
        }
    };

    const handleGoogleSign = async () => {
        try {
            await dispatch(googleSignIn());
            
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    }

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
            <div>
                <h2 className="heading">Sign Up Now</h2>
                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input {...register("name", { required: true })} placeholder=" " />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input {...register("email", { required: true })} placeholder=" " />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" {...register("password", { required: true })} placeholder=" " />
                    </div>

                    <div className="input-group">
                        <label htmlFor="retype">Retype Password</label>
                        <input type="password" {...register("retype", { required: true })} placeholder=" " /> <br />
                    </div>

                    <input className="btn" type="submit" /> <br />
                    <p>Already have an <Link to="/login">Account</Link></p>
                    <div style={{ marginBottom: "12px" }}>

                        -------------------------------------------------------------- <p style={{ textAlign: 'center' }}>Or</p> --------------------------------------------------------------
                    </div>
                    <Link onClick={handleGoogleSign} className="google-btn"><FaGoogle></FaGoogle>Countine with Google</Link>
                </form>
            </div>
        </div>
    );
};

export default SignUp;







