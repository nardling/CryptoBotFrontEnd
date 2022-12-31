import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iStrategy } from "../App";

export const strategySlice = createSlice(
    {
        name: 'strategies',
        initialState: {
            value: new Array<iStrategy>
        },
        reducers: {
            setStrategies: (state, action: PayloadAction<iStrategy[]>)=>{
                state.value = action.payload
            },
            setActive: (state, strategyId) => {

            },
            addStrategy: (state, action: PayloadAction<iStrategy>) => {
                state.value.push(action.payload)
            }
        }
    }
)

export const { setStrategies, setActive, addStrategy } = strategySlice.actions

export default strategySlice.reducer