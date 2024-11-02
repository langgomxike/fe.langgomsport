import axios from "axios";
import SLog, {LogType} from "../services/SLog";
import Category from "../models/Category";
import CategoryInCategories from "../models/CategoryInCategories";

export default class ACategory {
    private static BASE_URL = process.env.REACT_APP_API_BASE_URL + '/categories'

    public static getAllCategories(onNext: (categories: Array<CategoryInCategories>) => void,
                                   onLoading: (loading: boolean) => void,) {
        onLoading(true)
        axios.get(this.BASE_URL, {
            headers: {"Content-Type" : "application/json"}
        }).then(response=> {

            const categoriesJson = response.data;
            const categoriesDTO: Array<CategoryInCategories> = [];
            categoriesJson.map(
                (item:any)=> {
                    const categoryParent = item.categoryParent as Category                    
                    const categories = item.categories as Array<Category>
                   categoriesDTO.push(new CategoryInCategories(categoryParent, categories))
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

    public static getCategoryById(
        categoryId: number, // Tham số cho category
        onNext: (category: Category) => void,
        onLoading: (loading: boolean) => void
    ) {
        onLoading(true);
        // Thêm categoryId vào URL để lọc theo danh mục
        axios.get(`${this.BASE_URL}/?id=${categoryId}`, {
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {
                onLoading(false);
                onNext(response.data);
                console.log(">>> category a", response.data);
            })
            .catch(err => {
                onLoading(false);
            });
    }
}