import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { properties } from "../interfaces/interfaces"

export const propertiesSlice = createSlice(
    {
        name: 'properties',
        initialState: {
            settings: {
                refresh_on: false
            }
        },
        reducers: {
            setRefresh: (state, action: PayloadAction<boolean>) => {
                state.settings.refresh_on = action.payload
            }
        }
    }
)

export const { setRefresh } = propertiesSlice.actions
export default propertiesSlice.reducer