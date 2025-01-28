import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://ruet-hostel.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;