import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BsPencilSquare, BsTrash3 } from "react-icons/bs";
import Lottie from "lottie-react";
import loader from "../../../../assets/lottie/loading.json";
import { UserContext } from "../../../../Provider/Authprovider";
const MyPhotography = () => {
  const {user} = useContext(UserContext)
  const [data, setData] = useState([]);
  const [isLoading,setLoading] = useState(true)
  useEffect(() => {
    axios
      .get(
        `https://phototune-server-side-3tfl7h8no-kabi-r.vercel.app/hostPhotography/${user?.email}`
      )
      .then((res) => {
        setLoading(false)
        setData(res.data);
      });
  }, [user]);
  return (
    <>
    {
     isLoading ? <div className="w-full h-screen flex justify-center items-center"><Lottie className="w-52" animationData={loader} loop={true} /></div> : data.length ===0 ? <div className="w-full h-screen flex justify-center items-center"><h2 className="font-semibold">No Data Available</h2></div>: <div className="w-full h-full p-8 text-black">
      <h2 className="text-2xl  text-center teb">My Photography</h2>
      <div className="overflow-x-auto py-5">
        <table className="table">
          <thead>
            <tr className="text-[14px] text-black">
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {data.map((photo) => (
              <>
                <tr>
                  <td>
                    <img
                      className="w-16 h-16 rounded-full"
                      src={photo.image}
                      alt=""
                    />
                  </td>
                  <td>
                    <h1 className=" text-[16px]">{photo.photographyName}</h1>
                  </td>
                  <td>
                    <h1 className=" text-[16px]">${photo.price}</h1>
                  </td>
                  <td>
                    <h1 className=" text-[16px]">{photo.availableStock}</h1>
                  </td>
                  <td>
                    <h1 className=" text-[16px]">
                      {photo.status ? photo.status : "Pending"}
                    </h1>
                  </td>
                  <th>
                    <button className="p-3 bg-rose-500 rounded">
                      <BsPencilSquare className="w-5 h-5 text-white"></BsPencilSquare>
                    </button>
                  </th>
                  <th>
                    <button className="p-3 bg-rose-500 rounded">
                      <BsTrash3 className="w-5 h-5 text-white"></BsTrash3>
                    </button>
                  </th>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    }
    </>
    
  );
};

export default MyPhotography;
