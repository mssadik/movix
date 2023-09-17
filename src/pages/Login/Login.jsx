import React from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../store/userSlice";

const login = () => {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const naviget = useNavigate();

    const onSubmit = ({ password, email}) => {
        dispatch(signInUser({email, password}))
        console.log( email, password);
        reset();
        naviget('/')
    };

    return (
        
        <div className="sign-up-container">
            {/* <div style={{marginTop: "200px"}}></div> */}
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

export default login;
