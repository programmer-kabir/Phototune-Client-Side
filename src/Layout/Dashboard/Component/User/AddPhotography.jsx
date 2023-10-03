
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../../Provider/Authprovider";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment/moment";
const AddPhotography = () => {
  const date =  moment().format('MMMM DD, YYYY');
  console.log(date);
    const {user} = useContext(UserContext)
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const image = data.Photography[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_KEY
        }`;
        axios.post(url, formData)
        .then(res=>{
          const imageUrl = res.data.data.display_url;
          const {PhotographyName,AuthorName,AuthorEmail,price,Stock} = data;
          const PhotoInfo = { photographyName:PhotographyName,authorName:AuthorName,image:imageUrl,price:parseInt(price),publishedDate:date,availableStock:parseInt(Stock),authorEmail:AuthorEmail,status:'Pending'};
          axios.post(`https://phototune-server-side-3tfl7h8no-kabi-r.vercel.app/hostPhotography`, PhotoInfo)
          .then(res=>{
            if(res.data.insertedId){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Add Photo Successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  reset()
            }
          })
          .catch(err=>{
            console.log(err.message);
          })
        })
        
    }
    return (
        <div className="w-full md:w-[75%] h-full py-10 mx-auto px-5">
        <h2 className="text-center text-3xl font-semibold py-2">Add Photography</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full border  px-8 py-3 rounded-2xl"
      >
        <div className="">
          <div className="w-full form-control">
            <label className="label">
              <span>Photography Name*</span>
            </label>
            <input
              type="text"
              placeholder="Photography Name"
              className="input border-gray-600 border   focus:border-rose-600"
              {...register("PhotographyName", { required: true })}
            />
            {errors.PhotographyName && (
              <span className="text-rose-500">Please Enter Photography Name</span>
            )}
          </div>
          <div className="w-full form-control">
            <label className="label">
              <span className="">Author Name*</span>
            </label>
            <input
              type="text"
              placeholder="Author Name"
              className="input border-gray-600 border   focus:border-rose-600"
              {...register("AuthorName", { required: true })}
              defaultValue={user?.displayName}
              readOnly
            />
            {errors.AuthorName && (
              <span className="text-rose-500">Please Enter Author Name</span>
            )}
          </div>
        </div>
        <div className="w-full form-control">
            <label className="label">
              <span className="">Author Email*</span>
            </label>
            <input
              type="text"
              placeholder="Author email"
              className="input border-gray-600 border   focus:border-rose-600"
              {...register("AuthorEmail", { required: true })}
              defaultValue={user?.email}
              readOnly
            />
            {errors.AuthorEmail && (
              <span className="text-rose-500">
                Please Enter Author email
              </span>
            )}
          </div>
        <div className="md:flex justify-between gap-5">
        <div className="w-full form-control">
            <label className="label">
              <span className="">Price*</span>
            </label>
            <input
              type="text"
              placeholder="Price"
              className="input border-gray-600 border   focus:border-rose-600"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="text-rose-500">
                Please Enter Price
              </span>
            )}
          </div>
          <div className="w-full form-control">
            <label className="label">
              <span className="">Stock</span>
            </label>
            <input
              type="number"
              placeholder="Stock"
              className="input border-gray-600 border   focus:border-rose-600"
              {...register("Stock", { required: true })}
            />
            {errors.Stock && (
              <span className="text-rose-500">Please Enter Available Stock</span>
            )}
          </div>
        </div>

        <div className="form-control py-2">
        <label className="label">
              <span className="">Photography</span>
            </label>
          <input
            type="file"
            name=""
            {...register("Photography", { required: true })}
          />
          {errors.Photography && (
            <span className="text-rose-500">Please Enter Photography</span>
          )}
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-teal-500 hover:-translate-y-1 transition-all duration-300 text-white hover:text-black border-none rounded-3xl ">Host Your Photo</button>
        </div>
      </form>
    </div>
    );
};

export default AddPhotography;