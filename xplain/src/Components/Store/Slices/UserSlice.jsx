import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	// email: undefined,
	userId: undefined,
	username: undefined,
	profilePhoto: undefined,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addUserInfo: (state, action) => {
			state.userId = action.payload["userId"];
			state.username = action.payload["username"];
			state.profilePhoto = action.payload["profilePhoto"];
		},
		removeUserInfo: (state) => {
			state.userId = undefined;
			state.username = undefined;
			state.profilePhoto = undefined;
		},
		updateUserInfo: (state, action) => {
			state.username = action.payload["username"];
			state.profilePhoto = action.payload["profilePhoto"];
		},
	},
});

export default userSlice.reducer;
export const { addUserInfo, removeUserInfo, updateUserInfo } =
	userSlice.actions;
export const userInfo = (state) => state.user;
