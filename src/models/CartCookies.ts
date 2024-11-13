export default class CartCookie {
    public variantId: number;
    public quantity: number;

    constructor(variantId: number = 0, quantity = 0){
        this.variantId = variantId;
        this.quantity = quantity;
    }
}