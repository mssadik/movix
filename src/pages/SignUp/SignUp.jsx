import React from "react";
import { useForm } from "react-hook-form";
import "./style.scss"; // Import your SCSS file
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { createUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, reset } = useForm();
    const naviget = useNavigate();

    const onSubmit = ({ name, password, email }) => {
        dispatch(createUser({ email, password }))
        console.log(name, email);
        reset();
        naviget('/')
    };

    return (

        <div className="sign-up-container">
            {/* <div style={{marginTop: "200px"}}></div> */}
            <div>

                <h2 className="heading">Sign Up Now</h2>
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

                    <input className="btn" type="submit" />
                    <div style={{ marginBottom: "12px" }}>

                        -------------------------------------------------------------- <p style={{ textAlign: 'center' }}>Or</p> --------------------------------------------------------------
                    </div>
                    <Link className="google-btn"><FaGoogle></FaGoogle>Countine with Google</Link>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
