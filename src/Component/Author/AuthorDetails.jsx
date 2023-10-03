import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../Shared/Container/Container";

const AuthorDetails = () => {
  const { id } = useParams();
  const [authorDetails, setAuthorDetails] = useState({});
  console.log(authorDetails);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`https://phototune-server-side-3tfl7h8no-kabi-r.vercel.app/users/${id}`).then((res) => {
      setAuthorDetails(res.data);
    });
  }, [id]);
  useEffect(() => {
    axios
      .get(`https://phototune-server-side-3tfl7h8no-kabi-r.vercel.app/hostPhotography/${authorDetails?.email}`)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      });
  }, [authorDetails.email]);
  console.log(data);
  return (
    <div className="pt-24">
      <Container>
        <div className="flex justify-center items-center py-16">
          <h3 className="text-3xl font-semibold">Author Details</h3>
        </div>
        <div className="flex flex-col md:flex-row gap-5 p-5">
          <div className="w-full md:w-[40%]">
            {/* <img className="w-full h-96 rounded-xl" src={authorDetails.imageUrl} alt="" /> */}
            <div className="w-full   bg-[#1F1F1F] rounded-2xl space-y-5 cursor-pointer">
              <div className="relative">
                <img
                  className="w-full h-52 rounded-xl mx-auto"
                  src={authorDetails.imageUrl}
                  alt=""
                />
                <img
                  className="absolute -bottom-14 left-36 w-32 h-32  mx-auto border-[6px] border-teal-500"
                  src={authorDetails.imageUrl}
                  alt=""
                />
              </div>
              <div className="pt-14 p-5 space-y-3">
             <div className="flex justify-between">
             <h3 className="text-xl font-semibold">{authorDetails.name}</h3>
             <h2 className="text-xl font-semibold">{authorDetails.email}</h2>
             </div>
              <div className="grid grid-cols-2 gap-5">
              <button className="py-3 px-8 bg-[#1B1B1B] hover:-translate-y-1 transition-all duration-500 font-semibold">3 in stock</button>
                <button className="py-3 px-8 bg-[#1B1B1B] hover:-translate-y-1 transition-all duration-500 font-semibold">0.745 ETH</button>
                <button className="py-3 px-8 bg-[#1B1B1B] hover:-translate-y-1 transition-all duration-500 font-semibold">8.2M Followers</button>
                <button className="py-3 px-8 bg-[#1B1B1B] hover:-translate-y-1 transition-all duration-500 font-semibold">4.2K Following</button>
              </div>
                <div className="flex justify-center items-center py-3">
                  <button className="py-2 px-8 rounded-lg border-none bg-teal-500">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[60%]">
            <h2 className="text-3xl font-semibold">Saurav’s Collection</h2>
            <div>
            <div className="grid grid-cols-1 md:grid-cols-2 pt-5 lg:grid-cols-2 gap-5">
          {data?.map((photo) => (
            <>
              <div className="w-full h-full bg-[#1F1F1F] p-6 rounded-2xl space-y-3 cursor-pointer">
                <img
                  className="w-full h-64 rounded-2xl"
                  src={photo.image}
                  alt=""
                />
                <div className="flex justify-between font-medium">
                  <h2 className="text-xl font-semibold">
                    {photo.photographyName}
                  </h2>
                  <h2 className="flex gap-2 items-center">${photo.price}</h2>
                </div>
                <div className="flex justify-between">
                  <h2>
                    Owner:{" "}
                    <span className="font-semibold">{photo.authorName}</span>
                  </h2>
                  <h2 className="flex gap-2 items-center">
                    {photo.availableStock} in stock
                  </h2>
                </div>
              </div>
            </>
          ))}
        </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AuthorDetails;
