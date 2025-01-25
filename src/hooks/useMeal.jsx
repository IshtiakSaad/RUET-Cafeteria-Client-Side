import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMeal = () => {
    const axiosPublic = useAxiosPublic();

    const {data: menu = [], isPending: loading, refetch} = useQuery({
        queryKey: ['meals'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/meals');
            return res.data;
        }
    })


    return [menu, loading, refetch]
}

export default useMeal;