import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../Shared/Container/Container";
import SetctionTitle from "../Shared/SetctionTitle/SetctionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";
import { AiFillHeart } from "react-icons/ai";
import usePhotography from "../Hook/usePhotography";
const PhotographyDetails = () => {
  const { id } = useParams();
  const [photography] = usePhotography()
  const [singleData, setSingleData] = useState({});
  useEffect(() => {
    axios.get(`https://phototune-server-side-3tfl7h8no-kabi-r.vercel.app/singlePhotography/${id}`).then((res) => {
      setSingleData(res.data);
    });
  }, [id]);
  console.log(singleData);
  return (
    <div className="pt-28">
      <Container>
        <div className="flex justify-center items-center py-16">
            <h3 className="text-3xl font-semibold">Photography Details</h3>
        </div>
        <div className="flex flex-col md:flex-row gap-5 p-5">
          <div className="w-full md:w-[50%]">
            <img className="w-full h-96 rounded-xl" src={singleData.image} alt="" />
          </div>
          <div className="w-full md:w-[50%] space-y-4">
            <h1 className="text-3xl font-semibold">
              {singleData.photographyName}
            </h1>
            <h2 className="text-xl">{`The winner of this auction will receive the edition #2/5 copy of "Did you ever really love me?" by Mad Dog Jones. The edition of 1 is shown only for auction purposes.`}</h2>
            <h2 className="text-xl font-semibold">
              Author Name : {singleData.authorName}
            </h2>
            <h2 className="text-xl font-semibold">
              Author Email : {singleData.authorEmail}
            </h2>
            <h2 className="text-xl font-semibold">Highest bid : 0.238 ETH</h2>
            <h2 className="text-xl font-semibold">
              Image Size : 1400px X 1400px
            </h2>
            <h2 className="text-xl font-semibold">
              Price : {singleData.price}
            </h2>
            <button className="py-3 px-8 bg-teal-500 hover:-translate-y-1 rounded-full hover:bg-white hover:text-black transition-all duration-500 font-semibold">Buy Now</button>
          </div>
        </div>
        <div className="py-5">
            <SetctionTitle name={"Simler Creation You May Like"}></SetctionTitle>
            <div className="pt-10">
          <Swiper
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              // When window width is >= 480px
              480: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              // When window width is >= 768px
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {
              photography?.map(photo=><>     <SwiperSlide>
                <div className="w-full h-full bg-[#1F1F1F] p-6 rounded-2xl space-y-3 cursor-pointer">
                  <img
                    className="w-full h-64 rounded-2xl"
                    src={photo.image}
                    alt=""
                  />
                  <h3 className="text-3xl font-semibold">
                  {photo.photographyName}
                  </h3>
                  <div className="flex justify-between font-medium">
                    <h2>Price:${photo.price}</h2>
                    <h2 className="flex gap-2 items-center">
                      <AiFillHeart className="cursor-pointer text-rose-700"></AiFillHeart> 50
                    </h2>
                  </div>
                  <Link to={`/singlePhotography/${photo._id}`}>
                  <button className="w-full py-3 px-8 bg-teal-500 hover:-translate-y-1 hover:bg-white rounded-full  hover:text-black transition-all duration-500 font-semibold">
                    View Details
                  </button>
                  </Link>
                 
                </div>
              </SwiperSlide></>)
            }
          </Swiper>
        </div>
        </div>
      </Container>
    </div>
  );
};

export default PhotographyDetails;
