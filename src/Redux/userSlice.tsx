import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ItemData {
  id: number;
  name: string;
}

export interface UserState {
  currentUser: string | null;
  data: ItemData[];
  editItem: ItemData | null;
}

const initialState: UserState = {
  currentUser: null,
  data: [],
  editItem: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    addData: (state, action: PayloadAction<string>) => {
      const newItemData: ItemData = {
        id: Date.now(),
        name: action.payload,
      };
      state.data.push(newItemData);
    },
    editData: (state, action: PayloadAction<{ id: number; name: string }>) => {
      const { id, name } = action.payload;
      const itemToEdit = state.data.find((item) => item.id === id);
      if (itemToEdit) {
        itemToEdit.name = name;
        state.editItem = null;
      }
    },
    deleteData: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.data = state.data.filter((item) => item.id !== id);
    },
    setEditItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.editItem = state.data.find((item) => item.id === id) || null;
    },
    clearEditItem: (state) => {
      state.editItem = null;
    },
  },
});

export const {
  setCurrentUser,
  clearCurrentUser,
  addData,
  editData,
  deleteData,
  setEditItem,
  clearEditItem,

} = userSlice.actions;

export default userSlice.reducer;
