export class Item {
    public price: string;
    public price_discount: string;
    public key: string;

    public getPrice() {
        return parseInt(this.price_discount ? this.price_discount : this.price);
    }
}