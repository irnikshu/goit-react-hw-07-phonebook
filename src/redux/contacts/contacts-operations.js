import * as api from "../../shared/contacts";


 import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAllContacts = createAsyncThunk(
    "contacts/fetchAll",
    async(_, rejectWithValue) => {
        try {
            const data = await api.getAllContacts();
            return data;
        }
        catch({response}) {
            return rejectWithValue(response.data);
        }
    }
)

export const fetchAddContact = createAsyncThunk(
    "contacts/add",
    async (data, { rejectWithValue }) => {
        try {
            const result = await api.addContact(data);
            return result;
        }
        catch ({ response }) {
            return rejectWithValue(response.data);
        }
    },
    {
        condition: ({name, number}, { getState }) => {
            const { contacts } = getState();
            const normalizedName = name.toLowerCase()?.trim();
            const normalizedNumber = number.toString()?.trim();
            const result = contacts.items.find(({ name, number}) => {
            return (name.toLowerCase() === normalizedName || number === normalizedNumber);
        })
            if (result) {
                alert(`${name} is already in contacts`)
                 return false;
            }
           
        }
    }
)
 


export const fetchDeleteContact = createAsyncThunk(
    "contacts/delete",
    async(id, {thunkAPI}) => {
        try {
            await api.deleteContact(id);
            return id;
        }
        catch({response}) {
            return thunkAPI.rejectWithValue(response.data);
        }
    }
)




