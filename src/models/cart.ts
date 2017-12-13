import { Item } from "./item"
import { Postage } from "./postage"

export class Cart {
    public userId: string;
    public date: Date;
    public state: number;
    public items: CartItem[] = [];
    public postage: Postage = <any>{};

    // postage
    // public billingdate: string;
    // public billingammount: number;
    // public name: string;
    // public street: string;
    // public city: string;
    // public postal: string;
    // public ico: string;
    // public dic: string;
    // public contactname: string;
    // public contactphone: string;

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
    }

    public getSubtotal(): number {
        let subtotal = 0;
        this.items.forEach(x => {
            subtotal += (x.quantity * x.item.getPrice()) + (x.item.price_postage ? parseInt(x.item.price_postage) : 0);
        });
        return subtotal;
    }

    public getPostage(): number {
        if (this.postage === undefined || this.postage.price === undefined)
            return 0;
        else
            return parseInt(this.postage.price);
    }

    public getTotal(): number {
        return this.getSubtotal() + this.getPostage();
    }
}

export class CartItem {
    quantity: number;
    item: Item;
}
