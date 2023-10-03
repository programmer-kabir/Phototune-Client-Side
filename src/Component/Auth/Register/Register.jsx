import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import Swal from "sweetalert2";
import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "../../../Provider/Authprovider";
import { updateProfile } from "firebase/auth";
const Register = () => {
  const { createNewUser, googleLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    //imagebb website photo Upload
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_KEY
    }`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const imageUrl = imageData.data.display_url;
        const { name, email, password } = data;
        createNewUser(email, password)
          .then((result) => {
            const user = result.user;
            updateProfile(user, {
              displayName: name,
              photoURL: imageUrl,
            });
            const userInfo = { name, email, imageUrl };
            fetch(`https://phototune-server-side-3tfl7h8no-kabi-r.vercel.app/users`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(userInfo),
            })
              .then((res) => res.json())
              .then(() => {
                navigate('/')
                reset();
              })
              .catch((err) => {
                toast.error(err.message);
              });
          })
          .catch((err) => {
            err.message;
            toast.error(err.message);
          });
      });
  };
  const LoginWithGoogle = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user?.email,
          imageUrl: user.photoURL,
        };
        fetch(`https://phototune-server-side-3tfl7h8no-kabi-r.vercel.app/users/${user?.email}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Login Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            reset();
            navigate("/");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <>
      <div className="w-full h-full flex justify-center items-center  pt-32">
        <div className="w-full max-w-[500px] p-6 rounded-2xl sm:p-10 bg-[#1B1B1B] shadow-lg border border-gray-800">
          <h2 className="text-2xl font-bold text-center py-2">
            Create your Phototune account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 ">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  {...register("name", { required: true })}
                  className="w-full px-3 py-2 border rounded-full  focus:outline-rose-500 bg-[#1B1B1B] border-gray-800  focus:outline-none"
                />
                {errors.name && (
                  <span className="text-rose-500">Please enter your name</span>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 ">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter Your Email"
                  className="w-full px-3 py-2 border rounded-full  focus:outline-rose-500 bg-[#1B1B1B] border-gray-800  focus:outline-none "
                />
                {errors.email && (
                  <span className="text-rose-500">Please enter your email</span>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 ">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full px-3 py-2 border rounded-full  focus:outline-rose-500 bg-[#1B1B1B] border-gray-800  focus:outline-none"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 15,
                  })}
                />
                {errors.password?.type === "required" && (
                  <span className="text-rose-500">
                    Please Enter Your Password
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-rose-500">
                    Password must be 6 characters
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-rose-500">
                    Password must be less then 15 characters
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="image" className="block mb-2 ">
                  Photo URL:
                </label>
                <input
                className="py-2 px-3  border border-dotted visible"
                  type="file"
                  name="file"
                  {...register("image", {
                    required: true,
                  })}
                />
                <br />
                 {errors.image&& (
                <span className="text-rose-500">
                   Please Upload Your Photo
                </span>
              )}
              </div>
            </div>
            <div className="py-3">
              <button
                type="submit"
                className="border border-teal-500 hover:bg-teal-500 transition-all duration-500 w-full rounded-full py-3 text-white font-semibold"
              >
                Create Account
              </button>
            </div>
          </form>
          <div className="flex items-center py-2">
            <div className="w-full h-[1px]  bg-gray-500"></div>
            <div className="mx-3">Or</div>
            <div className="w-full h-[1px] bg-gray-500"></div>
          </div>
          <div
            onClick={LoginWithGoogle}
            className="flex justify-center items-center space-x-2 border m-3 p-2 rounded-xl border-gray-800  focus:outline-none cursor-pointer"
          >
            <FcGoogle size={32} />

            <p>Continue with Google</p>
          </div>
          <p className="px-6  text-center text-gray-400">
            Already have an account?
            <Link
              to="/login"
              className="hover:underline hover:text-rose-500 text-gray-600"
            >
              Login
            </Link>
            .
          </p>
        </div>
      </div>
      <Toaster></Toaster>
    </>
  );
};

export default Register;
