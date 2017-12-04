import { Action } from '@ngrx/store';
import { Cart } from '../models/cart';

export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const REMOVEQUANTITY = 'REMOVEQUANTITY';
export const CLEAR = 'CLEAR';

let defaultCart = new Cart();

export const cart = (cart: Cart = defaultCart, action: Action) => {
    switch (action.type) {
        case ADD:
            cart.add(action.payload);
            return cart;
        case REMOVE:
            cart.remove(action.payload);
            return cart;
        case REMOVEQUANTITY:
            cart.removeQuantity(action.payload);
            return cart;
        case CLEAR:
            cart.clear();
            return cart;
        default:
            return cart;
    }
};
