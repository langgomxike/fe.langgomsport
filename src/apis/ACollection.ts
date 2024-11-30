import axios from "axios";
import SLog, { LogType } from "../services/SLog";
import Collection from "../models/Collection";

export default class ACollection {
  private static BASE_URL = process.env.REACT_APP_API_BASE_URL + "/collections";

  // Hàm lấy tất cả Collections
  public static getAllCollections(
    onNext: (collections: Array<Collection>) => void,
    onLoading: (loading: boolean) => void
  ) {
    onLoading(true);
    axios
      .get(this.BASE_URL, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        const collectionsJson = response.data;
        const collections: Array<Collection> = [];

        collectionsJson.map((item: any) => {
          const collection = item as Collection;
        //   collection.products = item.products.map((item: any) => ({
        //     ...item.product,
        //     images: item.images || [],
        //   }));
          collections.push(collection);
          console.log(collection);
        });

        onNext(collections);
        onLoading(false);
      })
      .catch((err) => {
        SLog.log(
          LogType.Error,
          "getAllCollections",
          "Cannot get all Collections",
          err
        );
        onLoading(false);
      });
  }
}
