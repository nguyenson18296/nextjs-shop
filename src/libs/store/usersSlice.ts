import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUserProfile {
    id: number;
    username: string;
    avatar: string;
}

interface IUserState {
    userProfile: IUserProfile;
}

const initialState: IUserState = {
    userProfile: {
        id: 0,
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
                id: action.payload.id,
                username: action.payload.username,
                avatar: action.payload.avatar ?? 'http://res.cloudinary.com/dou7jklnk/image/upload/v1708606501/qxayjksgqntvriiuprvh.webp'
            }
        }
    }
})

export const { getUsersProfile } = usersSlice.actions;

export default usersSlice.reducer;
