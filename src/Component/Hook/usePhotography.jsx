import axios from "axios";
import { useQuery } from "react-query";
const usePhotography = () => {
    const {data: photography, isLoading,refetch} = useQuery({
      queryKey: ['photography'],
      queryFn: async () => {
          const res = await axios.get(`https://phototune-server-side-3tfl7h8no-kabi-r.vercel.app/getAllPhotography`);
          return res.data;
      }
  })
    return [photography,refetch,isLoading]
};

export default usePhotography;