import axios from "axios";
import SLog, {LogType} from "../services/SLog";
import Category from "../models/Category";
import CategoryDTO from "../dtos/CategoryDTO";

export default class ACategory {
    private static BASE_URL = process.env.REACT_APP_API_BASE_URL + '/categories'

    public static getAllCategories(onNext: (categories: Array<CategoryDTO>) => void,
                                   onLoading: (loading: boolean) => void,) {
        onLoading(true)
        axios.get(this.BASE_URL, {
            headers: {"Content-Type" : "application/json"}
        }).then(response=> {

            const categoriesJson = response.data;
            const categoriesDTO: Array<CategoryDTO> = [];
            categoriesJson.map(
                (item:any)=> {
                    const categoryParent = item.categoryParent as Category                    
                    const categories = item.categories as Array<Category>
                   categoriesDTO.push(new CategoryDTO(categoryParent, categories))
                }
            )
            onLoading(false)
            onNext(categoriesDTO);
        }).catch(err => {
            onLoading(false)
            SLog.log(LogType.Error, "getAllCategories", "Cannot get all Categories", err)
            onNext([]);
        })
    }
}