import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUserProfile {
    username: string;
    avatar: string;
}

interface IUserState {
    userProfile: IUserProfile;
}

const initialState: IUserState = {
    userProfile: {
        username: '',
        avatar: ''
    }
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsersProfile(state, action: PayloadAction<IUserProfile>) {
            state.userProfile = {
                username: action.payload.username,
                avatar: action.payload.avatar ?? 'http://res.cloudinary.com/dou7jklnk/image/upload/v1708606501/qxayjksgqntvriiuprvh.webp'
            }
        }
    }
})

export const { getUsersProfile } = usersSlice.actions;

export default usersSlice.reducer;
