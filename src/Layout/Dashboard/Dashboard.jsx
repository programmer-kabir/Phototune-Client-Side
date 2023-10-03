import axios from "axios";
import { useContext } from "react";
import { AiFillCamera, AiOutlineHome, AiOutlineUserAdd } from "react-icons/ai";
import { BiImageAdd, BiSolidSelectMultiple } from "react-icons/bi";
import { FaBuyNLarge } from "react-icons/fa";
import { MdOutlineAddAPhoto, MdPayment } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../Provider/Authprovider";
import useHost from "../../Component/Hook/useHost";
import { Toaster, toast } from "react-hot-toast";
import useAdmin from "../../Component/Hook/useAdmin";
import Lottie from "lottie-react";
import loader from "../../assets/lottie/loading.json";
const Dashboard = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  const [isAdmin,isLoading2] = useAdmin();
  const [isHost,isLoading,refetch] = useHost();
  const makeHost = () => {
    axios
      .put(`https://phototune-server-side-3tfl7h8no-kabi-r.vercel.app/setHost/${user?.email}`)
      .then((res) => {
        refetch()
        if(res.data.modifiedCount>0){
          toast.success("Make Host Successfully")
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
      
  };
  return (
    <>
    {
      isLoading || isLoading2 ? <div className="w-full h-screen flex justify-center items-center"><Lottie className="w-52" animationData={loader} loop={true} /></div> :<div className="w-full md:flex justify-between">
      <div className="w-full md:fixed md:w-[18%]  bg-[#1B1B1B]">
        <nav className="w-full  md:h-screen text-white flex flex-col  items-center gap-20 px-5 py-5 border-e-2 border-gray-800">
          <div className="text-center">
            <Link to="home">
              <img
                className="w-32 h-32 rounded-full cursor-pointer"
                src={user?.photoURL}
                alt=""
              />
            </Link>
          </div>
          {isAdmin ? (
            <ul className="flex flex-col gap-3 font-semibold">
              <li>
                <Link
                  to="/dashboard/adminHome"
                  className="flex gap-2 items-center hover:text-teal-500 duration-200 cursor-pointer"
                >
                  <AiOutlineHome className="w-5 h-5"></AiOutlineHome>Admin Home
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/manageUsers"
                  className="flex gap-2 items-center hover:text-teal-500 duration-200 cursor-pointer"
                >
                  <AiOutlineUserAdd className="w-5 h-5"></AiOutlineUserAdd>
                  Manage Users
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/managePhotography"
                  className="flex gap-2 items-center hover:text-teal-500 duration-200 cursor-pointer"
                >
                  <AiFillCamera className="w-5 h-5"></AiFillCamera>Manage
                  Photography
                </Link>
              </li>
              <li>
                <Link to={"/"}>
                  <button className="py-2 mt-2 px-6 bg-gradient-to-r from-teal-500 to-blue-500 rounded-3xl flex items-center gap-1">
                    Back to home
                  </button>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col gap-3 font-semibold">
              <li>
                <Link
                  to="/dashboard/userHome"
                  className="flex gap-2 items-center hover:text-teal-500 duration-200 cursor-pointer"
                >
                  <AiOutlineHome className="w-5 h-5"></AiOutlineHome>Home
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/selectedPhoto"
                  className="flex gap-2 items-center hover:text-teal-500 duration-200 cursor-pointer"
                >
                  <BiSolidSelectMultiple className="w-5 h-5"></BiSolidSelectMultiple>{" "}
                  Selected Photo
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/selectedPhoto"
                  className="flex gap-2 items-center hover:text-teal-500 duration-200 cursor-pointer"
                >
                  <FaBuyNLarge className="w-5 h-5"></FaBuyNLarge>Payment
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/paymentHistory"
                  className="flex gap-2 items-center hover:text-teal-500 duration-200 cursor-pointer"
                >
                  <MdPayment className="w-5 h-5"></MdPayment>Payment History
                </Link>
              </li>
              {isHost && (
                <>
                  <li>
                    <Link
                      to="/dashboard/addPhotography"
                      className="flex gap-2 items-center hover:text-teal-500 duration-200 cursor-pointer"
                    >
                      <BiImageAdd className="w-5 h-5"></BiImageAdd>Add
                      Photography
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/myPhoto"
                      className="flex gap-2 items-center hover:text-teal-500 duration-200 cursor-pointer"
                    >
                      <MdOutlineAddAPhoto className="w-5 h-5"></MdOutlineAddAPhoto>
                      My Photography
                    </Link>
                  </li>
                </>
              )}
              {
                !isHost && <li className="flex items-centerj justify-center">
                <button
                  onClick={() => makeHost()}
                  className="py-2 mt-2 px-8 bg-gradient-to-r from-purple-500 to-rose-500 rounded gap-1"
                >
                  Host
                </button>
              </li>
              }
              <li>
                <Link to={"/"}>
                  <button className="py-2 mt-2 px-6 bg-gradient-to-r from-teal-500 to-blue-500 rounded-3xl flex items-center gap-1">
                    Back to home
                  </button>
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
      <div className="lg:ml-[18%] h-full w-full ">
        <Outlet></Outlet>
      </div>
      <Toaster></Toaster>
    </div>
    }
    </>
    
  );
};

export default Dashboard;
