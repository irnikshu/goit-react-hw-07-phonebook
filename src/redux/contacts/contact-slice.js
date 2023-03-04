import { createSlice } from "@reduxjs/toolkit";

// import { nanoid } from "nanoid";

// import * as actions from "./contacts-actions";
import {
    fetchAllContactsLoading,
    fetchAllContactsSuccess,
    fetchAllContactsError,
    fetchAddContactLoading,
    fetchAddContactSuccess,
    fetchAddContactError,
    fetchDeleteContactLoading,
    fetchDeleteContactSuccess,
    fetchDeleteContactError
} from "./contacts-actions";

const initialState = {
    items: [],
    loading: false,
    error: null,
}

const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        [fetchAllContactsLoading]: (store) => {
            store.loading = true;
        },
        [fetchAllContactsSuccess]: (store, { payload }) => {
            store.loading = false;
            store.items = payload;
        },
        [fetchAllContactsError]: (store, { payload }) => {
            store.loading = false;
            store.error = payload;
        }, 
         [fetchAddContactLoading]: (store) => {
            store.loading = true;
        },
        [fetchAddContactSuccess]: (store, { payload }) => {
            store.loading = false;
            store.items.push(payload);
        },
        [fetchAddContactError]: (store, { payload }) => {
            store.loading = false;
            store.error = payload;
        },
          [fetchDeleteContactLoading]: (store) => {
            store.loading = true;
        },
        [fetchDeleteContactSuccess]: (store, { payload }) => {
            store.loading = false;
            const index = store.items.findIndex(item => item.id === payload);
            store.items.splice(index, 1);
        },
        [fetchDeleteContactError]: (store, { payload }) => {
            store.loading = false;
            store.error = payload;
        }
    }
})

export const { addContact, deleteContact } = contactSlice.actions;
export default contactSlice.reducer;