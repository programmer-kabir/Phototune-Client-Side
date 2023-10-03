import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
import { UserContext } from "../../../Provider/Authprovider";
const Login = () => {
  const [hide,setHide] = useState(false)
  const { login,googleLogin } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from.pathname || "/";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    login(email, password)
      .then((result) => {
        const user = result.user;
        (user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        navigate(from, { replace: true })
      })
      .catch((err) => {
        (err.message);
        toast.error(err.message);
      });
  };
  const LoginWithGoogle = () => {
    googleLogin()
    .then((result) => {
      const user = result.user;
      const userInfo = {name:user.displayName,email:user?.email,imageUrl:user.photoURL}
      fetch(`https://phototune-server-side-3tfl7h8no-kabi-r.vercel.app/users`,{
        method:"POST",
        headers:{
          'content-type': 'application/json'
        },
        body:JSON.stringify(userInfo)
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          reset()
          navigate(from, { replace: true })
        
      })
      .catch(err => {
        toast.error(err.message)
      })
    })
    .catch((err) => {
      (err.message);
      toast.error(err.message)
    })
  }
  return (
    <>
      <div className="flex justify-center items-center pt-32">
        <div className="w-full max-w-[500px] p-6 rounded-2xl sm:p-10 bg-[#1B1B1B] shadow-lg border border-gray-800">
          <h2 className="text-2xl font-bold text-center py-2">
            Sign in To Phototune
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  {...register("email", { required: true })}
                  className="w-full px-3 py-2 border rounded-full  focus:outline-rose-500 focus:bg-[#1B1B1B] bg-[#1B1B1B] border-gray-800  focus:outline-none"
                />
                {errors.email && (
                  <span className="text-rose-500">Please enter your email</span>
                )}
              </div>
              <div className="relative">
                <label htmlFor="password" className="block mb-2 text-sm">
                  Password
                </label>
                <input
                  type={`${hide ? 'text' : 'password'}`}
                  placeholder="********"
                  {...register("password", { required: true })}
                  className="w-full px-3 py-2 border rounded-full  focus:outline-rose-500 bg-[#1B1B1B] border-gray-800  focus:outline-none"
                />
                <div onClick={()=>setHide(!hide)} className="absolute top-10 right-3 cursor-pointer">
                  {
                    hide? <AiFillEye></AiFillEye>  : <AiFillEyeInvisible></AiFillEyeInvisible>
                  }
                </div>
                {errors.password && (
                  <span className="text-rose-500">
                    Please enter your password
                  </span>
                )}
              </div>
            </div>
            <div className="py-3">
              <button
                type="submit"
                className="hover:bg-teal-500 transition-all duration-500 border font-semibold border-teal-500 w-full rounded-full py-3 text-white"
              >
                Continue
              </button>
            </div>
          </form>
          <div className="flex items-center py-2">
            <div className="w-full h-[1px]  bg-gray-500"></div>
            <div className="mx-3">Or</div>
            <div className="w-full h-[1px] bg-gray-500"></div>
          </div>
          <div onClick={LoginWithGoogle} className="flex justify-center items-center space-x-2 border m-3 p-2 rounded-xl border-gray-500 cursor-pointer">
            <FcGoogle size={32} />

            <p>Continue with Google</p>
          </div>
          <p className="px-6  text-center text-gray-400">
            Do not have an account? <Link
              to="/register"
              className="hover:underline hover:text-rose-500 text-gray-600"
            >
              SignUp
            </Link>

          </p>
        </div>
      </div>
      <Toaster></Toaster>
    </>
  );
};

export default Login;
