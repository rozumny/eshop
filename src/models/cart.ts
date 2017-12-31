import { Item } from "./item"
import { Postage } from "./postage"
import { Payment } from "./payment"

export class Cart {
    public userId: string;
    public adminId: string;
    public date: string;
    public state: number;
    public items: CartItem[] = [];
    public postage: Postage = <any>{};
    public payment: Payment = <any>{};
    public billingaddress: any;
    public mailingaddress: any;

    public add(item: any) {
        let i = this.items.find(x => x.item.key === item.key);
        if (i) {
            if (i.quantity < parseInt(item.amount)) {
                i.quantity++;
            }
        } else {
            let newItem = new CartItem();
            newItem.quantity = 1;
            newItem.item = item;
            this.items.push(newItem);
        }
    }

    public remove(item: any) {
        let it = this.items.find(x => x.item.key === item.key);
        if (it) {
            let i = this.items.indexOf(it);
            this.items.splice(i, 1);
        }
    }

    public removeQuantity(item: any) {
        let it = this.items.find(x => x.item.key === item.key);
        if (it && it.quantity > 1) {
            it.quantity--;
        }
    }

    public clear() {
        this.items = [];
        this.postage = <any>{};
        this.payment = <any>{};
        this.userId = null;
        this.adminId = null;
        this.date = null;
        this.state = null;

    }

    public getSubtotal(): number {
        let subtotal = 0;
        this.items.forEach(x => {
            subtotal += (x.quantity * x.item.getPrice());
        });
        return subtotal;
    }

    public getExtraPostage() {
        let subtotal = 0;
        this.items.forEach(x => {
            subtotal += (x.item.price_postage ? parseInt(x.item.price_postage) * x.quantity : 0);
        });
        return subtotal;
    }

    public getPostage(): number {
        if (this.postage === undefined || this.postage.price === undefined)
            return 0;
        else
            return parseInt(this.postage.price);
    }

    public getPayment(): number {
        if (this.payment === undefined || this.payment.price === undefined)
            return 0;
        else
            return parseInt(this.payment.price);
    }

    public getTotal(): number {
        return this.getSubtotal() + this.getPostage() + this.getPayment();
    }
}

export class CartItem {
    quantity: number;
    item: Item;
}
