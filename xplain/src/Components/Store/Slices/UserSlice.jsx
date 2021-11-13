import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	email: undefined,
	userId: undefined,
	username: undefined,
	gender: undefined,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		update: (state, action) => {
			state.userId = action.payload["userId"];
			state.username = action.payload["username"];
		},
	},
});

export default userSlice.reducer;
export const { update } = userSlice.actions;
export const userInfo = (state) => state.user;
