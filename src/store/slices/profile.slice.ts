import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  profile: {
    id: string;
    name: string;
    email: string;
    role: string;
    is_verified: boolean
  } | null;
}

const initialState: ProfileState = {
  profile: null,
};

const ProfileStateSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<{ 
      id: string; 
      name: string; 
      email: string; 
      role: string, 
      is_verified: boolean 
    }>) => {
      state.profile = action.payload;
    },
  },
});

export const { setProfile } = ProfileStateSlice.actions;
export default ProfileStateSlice.reducer;