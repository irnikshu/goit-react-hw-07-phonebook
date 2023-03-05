import * as api from "../../shared/contacts";

// import * as actions from "./contacts-actions";
 import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllContacts = createAsyncThunk(
    "contacts/fetch-all",
    async (_, thunkAPI) => {
        try {
            const data = await api.getAllContacts();
            return data;
        }
        catch ({ response }) {
            return thunkAPI.rejectWithValue(response.data);
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
            }
            return false;
        }
    }
)
 
export const fetchDeleteContact = createAsyncThunk(
    "contacts/delete", 
    async (id, { rejectWithValue }) => {
        try {
            await api.deleteContact(id);
            return id;
        }
        catch ({ response }) {
            return rejectWithValue(response.data);
        }
    }
)


// const isDublicate = (name, number) => {
//     const normalizedName = name.toLowerCase().trim();
//     const normalizedNumber = number.toString().trim();
    
//     const result = contacts.find(({ name, number }) => {
//       return (
//         name.toLowerCase() === normalizedName || number === normalizedNumber
//       );
//     });
//     return result;
//   };

// export const fetchAddContact = (data) => {
//     const func = async (dispatch, getState) => {
//         try { 
//             const { name, number } = getState();
//             if (isDublicate( name, number )) {
//       alert(name + ' is already in contacts');
//       return false;
//     }
//             dispatch(actions.fetchAddContactLoading());
//             const result = await api.addContact(data);
//             dispatch(actions.fetchAddContactSuccess(result));
//         }
//         catch ({ response }) {
//             dispatch(actions.fetchAddContactError(response.data.message))
//         }
//     }
//     return func;
// }

// export const fetchDeleteContact = (id) => {
//     const func = async (dispatch) => {
//         try { 
//             dispatch(actions.fetchDeleteContactLoading());
//             await api.deleteContact(id);
//             dispatch(actions.fetchDeleteContactSuccess(id))
//         }
//         catch ({ response }) {
//             dispatch(actions.fetchDeleteContactError(response.data.message));
//         }
//      }
//     return func;
// }

