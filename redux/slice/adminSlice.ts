import { createSlice } from '@reduxjs/toolkit';

type AdminState = {
  sideBarIsOpen: boolean;
};

const initialState: AdminState = {
  sideBarIsOpen: true,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
});

export const {} = adminSlice.actions;
export default adminSlice.reducer;
