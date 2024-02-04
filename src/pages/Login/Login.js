import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import loginImg from "../../utilities/img/login.png"
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import googleLogo from "../../utilities/img/Google.png";
import Loading from '../Shared/Loading';
const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, GUser, GLoading, GError] = useSignInWithGoogle(auth);
  const navigate = useNavigate();
  if (user || GUser) {
    console.log(user, GUser);
    navigate("/home")
  }
  if (loading || GLoading) {
    return <Loading></Loading>;
  }
  const onSubmit = data => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div className="mx-auto px-2 md:px-5 lg:px-20 grid grid-cols-1 md:grid-cols-2 items-center content-center py-12 bg-[#F1F3F8] min-h-screen">
      <div className=" hidden md:flex justify-center items-center">
        <img className="w-[470px]" src={loginImg} alt="" />
      </div>
      <div className="flex justify-center">
        <div className="w-[400px] p-5 border border-secondary rounded-lg shadow-sm shadow-secondary bg-base-100">
          <div>
            <div className="text-primary text-center">
              <p className="text-3xl font-bold">Login</p>
              <p className="mt-2">Enter your info below to login.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="form-control">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border-b border-b-primary mt-4 p-2 text-1xl focus:outline-none focus:border-b-secondary"
                // defaultValue="admin@gmail.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: 'Email is required'
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: 'Provide a valid Email'
                  }
                })}
              />
              <label className="label">
                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}

              </label>

              <input
                type="Password"
                placeholder="Password"
                className=" w-full border-b border-b-primary mt-4 p-2 text-1xl focus:outline-none focus:border-b-secondary"
                // defaultValue="123456"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 characters or longer",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
              <p className="text-error text-sm">
                {(error || GError) && (error?.message || GError?.message)}
              </p>
              <input
                type="submit"
                className="rounded-full text-white hover:bg-[#3825b1] bg-secondary shadow-lg  duration-300 cursor-pointer mt-6 p-2 text-1xl"
                value="Login"
              />
            </form>
            <div className="text-current mt-8 block">
              New in Common room?{" "}
              <Link to="/register" className="text-primary font-bold">
                {" "}
                <span className="hover:text-secondary duration-300">
                  Create an account
                </span>
              </Link>
            </div>

            <div className="divider">OR</div>
            <button
              onClick={() => signInWithGoogle()}
              className="w-full flex justify-center items-center gap-3 text-primary border border-primary hover:border-secondary hover:text-secondary p-2 rounded-full hover:shadow duration-300"
            >
              Continue With Google
              <img className="w-[25px]" src={googleLogo} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;