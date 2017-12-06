export class Item {
    public title: string;
    public description: string;
    public price: string;
    public price_discount: string;
    public price_postage: string;
    public key: string;

    public getPrice() {
        return parseInt(this.price_discount ? this.price_discount : this.price);
    }
}