import axios from "axios";
import Size from "../models/Size";
import SLog, { LogType } from "../services/SLog";

export default class ASize {
    private static BASE_URL = process.env.REACT_APP_API_BASE_URL + "/sizes";

    // Thêm tham số categoryId vào phương thức
    public static getSizesByCategory(
        categoryId: number, // Tham số cho category
        onNext: (sizes: Size[]) => void,
        onLoading: (loading: boolean) => void
    ) {
        onLoading(true);
        // Thêm categoryId vào URL để lọc theo danh mục
        axios.get(`${this.BASE_URL}?categoryId=${categoryId}`, {
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {
                onLoading(false);
                onNext(response.data);
                console.log(response.data);
            })
            .catch(err => {
                SLog.log(LogType.Error, "getSizesByCategory", "Cannot get sizes by category", err);
                onLoading(false);
                onNext([]); // Trả về danh sách rỗng nếu có lỗi
            });
    }
}
