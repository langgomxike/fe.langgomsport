import axios from "axios";
import Banner from "../models/Banner";

export default class {
    public static BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/banners`;

    public static getAllBanners(
        onNext: (banners: Banner[]) => void, 
        onLoading: (loading: boolean) => void) {
            onLoading(true);
            axios.get(this.BASE_URL, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
           .then((response) => {
                onNext(response.data);
           })
           .catch((error) => {
            console.log("getAllBanners error: ", error);
            
           })
    
     }
}