import { configureStore } from "@reduxjs/toolkit";
import userDetailsSlice from '@/provider/reactRedux/features/useDetailsFeatures'

export const makeStore = () => {
    return configureStore({
        reducer: {
            userDetailsReducer: userDetailsSlice
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']