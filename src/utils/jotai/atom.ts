import { atom } from "jotai";

export const sortProductsAtom = atom<string>("");
export const sideMenuChat = atom<boolean>(false);
export const loadingChat = atom<boolean>(false);
export const limitProducts = atom<number>(10);
export const searchProducts = atom<string>("");
