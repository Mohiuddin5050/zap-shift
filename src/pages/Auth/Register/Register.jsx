import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegister = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          // create user in the database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoUrl: photoURL,
          };
          axiosSecure.post("/users", userInfo)
          .then(res=>{
            if(res.data.insertedId){
              console.log('user created in the database');
            }
          })


          // update user profile in firebase
          const userProfile = {
            displayName: data.name,
            photoUrl: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile updated done");
              navigate(location?.state || "/");
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit(handleRegister)}>
        <h3 className="text-3xl font-bold pt-5">Create an Account</h3>
        <p className="font-semibold">Register with ZapShift</p>
        <fieldset className="fieldset">
          {/* Name field */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}
          {/* Photo field */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="Your Photo"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500">Photo is required</p>
          )}
          {/* email field */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}

          {/* password field */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 characters or longer
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must contain at least 1 uppercase, 1 lowercase, 1 number,
              and 1 special character.
            </p>
          )}

          <button className="btn btn-primary text-black mt-4">Register</button>
        </fieldset>
        <p>
          Already have an account?{" "}
          <Link
            state={location.state}
            className="text-blue-900 underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>
      <SocialLogin />
    </div>
  );
};

export default Register;
