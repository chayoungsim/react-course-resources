import { create } from "zustand";

const usePhoneBookStore = create((set) => ({
    phoneBook :[],
    addContact : (name, phoneNumber) => set((state) => ({
        phoneBook:[...state.phoneBook,{id:Date.now(), name, phoneNumber}]
    }))
}))

export default usePhoneBookStore;