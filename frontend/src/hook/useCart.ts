import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/page";
import { Cart } from "@/types/Products";

async function getCart(): Promise<Cart> {
  const response = await axios.get(`${BASE_URL}cart`, {
    withCredentials: true,
  });
  return response.data.data;
}

async function addToCart(data: { productId: number; quantity: number }) {
  const response = await axios.post(`${BASE_URL}cart`, data, {
    withCredentials: true,
  });
  return response.data;
}

async function updateCartItem(data: { productId: number; quantity: number }) {
  const response = await axios.put(`${BASE_URL}cart`, data, {
    withCredentials: true,
  });
  return response.data;
}

async function removeCartItem(productId: number) {
  const response = await axios.delete(`${BASE_URL}cart/${productId}`, {
    withCredentials: true,
  });
  return response.data;
}

async function clearCart() {
  const response = await axios.delete(`${BASE_URL}cart`, {
    withCredentials: true,
  });
  return response.data;
}

export function useCart() {
  const queryClient = useQueryClient();

  const { data: cart, ...queryRest } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const addItem = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const updateItem = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeItem = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const clear = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return {
    cart,
    ...queryRest,
    addItem,
    updateItem,
    removeItem,
    clear,
  };
}
