/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from "react";
export const CartContext = createContext(null);



export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);


    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.product.id === product.id
            );

            if (existingItem) {

                return prevItems.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }


            return [...prevItems, { product, quantity: 1 }];
        });
    };


    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.product.id !== productId)
        );
    };


    const clearCart = () => {
        setCartItems([]);
    };




    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
