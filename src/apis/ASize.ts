import axios from "axios";
import SizeDTO from "../dtos/SizeDTO";
import SLog, {LogType} from "../services/SLog";

export  default  class ASize {
    private static BASE_URL = process.env.REACT_APP_API_BASE_URL + "/sizes"

    public static getAllSizes(
        onNext: (sizes: SizeDTO[]) => void,
        onLoading: (loading:boolean) => void
    ) {
        onLoading(true);
        axios.get(this.BASE_URL, {
            headers: { "Content-Type": "application/json" }
        }).then(response => {
            onLoading(false);
            onNext(response.data);
            console.log(response.data)
        }).catch(err => {
            SLog.log(LogType.Error, "getAllCategories", "Cannot get all Categories", err)
            onLoading(false);
            onNext([]);
        })
    }

}
