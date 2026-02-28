import {create} from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
const useAuthStore = create((set) => ({
    user: null,
    loading:true,   
    updateUser: (user) => set({user:newUser}),
    fetchUser: async () => {
        try {
            const token = Cookies.get("token");
            if(token){
                const response = await axios.get("http://localhost:3000/auth/me",{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
               console.log("userData from authstore" , response.data.data);
               useAuthStore.setState({user:response.data.data,loading:false});

            }
            else{
            useAuthStore.setState({user:null,loading:false});
            }
        }
        catch (error) {
            console.log(error);
            useAuthStore.setState({user:null,loading:false});
        }
    }
    
}));
export default useAuthStore;
