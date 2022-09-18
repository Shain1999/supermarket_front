import { ShoppingCartItem } from "./ShoppingCartItem";

export interface OrderData {
    orderItemsArray: ShoppingCartItem[];
    totalOrderSum: number;
}