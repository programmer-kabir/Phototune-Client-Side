import { useContext} from "react";
import { UserContext } from "../../Provider/Authprovider";
import axios from "axios";
import { useQuery } from "react-query";

const useHost = () => {
    const {user} = useContext(UserContext);
    const {data: isHost, isLoading: isHostLoading,refetch} = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            const res = await axios.get(`https://phototune-server-side-3tfl7h8no-kabi-r.vercel.app/isHost/${user?.email}`);
            return res.data.host;
        }
    })
    return [isHost, isHostLoading,refetch]
};

export default useHost;