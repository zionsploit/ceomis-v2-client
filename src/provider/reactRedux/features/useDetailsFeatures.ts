import { UserDetails } from "@/types/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LoadingState } from "../utils/response";

export const fetchAuthUserDetails = createAsyncThunk(
    'api/auth/get-user-detials',
    async () => {
        const response = await axios('/api/auth/get-user-details')
        return response.data
    }
)

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState: {
        userDetails: {
            data: null as UserDetails | null,
            loading: "idle" as LoadingState
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAuthUserDetails.pending, (state) => {
            state.userDetails.loading = "pending"
        })
        builder.addCase(fetchAuthUserDetails.rejected, (state) => {
            state.userDetails.loading = "failed"
        })
        builder.addCase(fetchAuthUserDetails.fulfilled, (state, action) => {
            state.userDetails.loading = "succeeded"
            state.userDetails.data = action.payload
        })
    }
})
export default userDetailsSlice.reducer