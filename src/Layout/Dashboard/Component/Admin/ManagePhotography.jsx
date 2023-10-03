import { BsTrash3 } from "react-icons/bs";
import usePhotography from "../../../../Component/Hook/usePhotography";

import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import Lottie from "lottie-react";
import loader from "../../../../assets/lottie/loading.json";
const ManagePhotography = () => {
  const [photography,refetch,isLoading] = usePhotography();
  const removePhoto = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be deleted this photo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://phototune-server-side-3tfl7h8no-kabi-r.vercel.app/deleteSinglePhotography/${id}`)
          .then((res) => {
            refetch()
            if (res.data.deletedCount>0) {
                Swal.fire(
                    'Deleted!',
                    'Your photo deleted succesfully',
                    'success'
                  )
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };
  const approved = (id)=>{
    axios
      .put(`https://phototune-server-side-3tfl7h8no-kabi-r.vercel.app/approved/${id}`)
      .then((res) => {
        refetch()
        if(res.data.modifiedCount>0){
          toast.success("Approved Successfully")
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (
    <>
    {
     isLoading ? <div className="w-full h-screen flex justify-center items-center"><Lottie className="w-52" animationData={loader} loop={true} /></div> : photography?.length ===0 ? <div className="w-full h-screen flex justify-center items-center"><h2 className="font-semibold">No Data Available</h2></div>: <div className="w-full h-full p-8">
      <h2 className="text-2xl text-center">Manage photo</h2>
      <div className="overflow-x-auto py-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className=" text-black">
              <th>Photo</th>
              <th>Name</th>
              <th>Author</th>
              <th>Status</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {photography?.map((photo) => (
              <>
                <tr>
                  <td>
                    <img
                      className="w-10 md:w-14 h-10 md:h-14 rounded-full"
                      src={photo.image}
                      alt=""
                    />
                  </td>
                  <td>
                    <h1 className="text-[16px]">{photo.photographyName}</h1>
                  </td>
                  <td>
                    <h1 className="text-[16px]">{photo.authorName}</h1>
                  </td>
                  <td>
                    {
                      photo.status ==="approved" ? <button disabled className="btn btn-sm bg-teal-500">
                      {photo.status ? photo.status : "Pending"}
                    </button> :<button onClick={()=>approved(photo._id)} className="btn btn-sm bg-teal-500">
                      {photo.status ? photo.status : "Pending"}
                    </button>  
                    }
                    
                  </td>
                  <th>
                    <button
                      onClick={() => removePhoto(photo._id)}
                      className="p-3 bg-rose-500 rounded"
                    >
                      <BsTrash3 className="w-6 h-6 text-white"></BsTrash3>
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

export default ManagePhotography;
