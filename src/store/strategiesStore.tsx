import { bindActionCreators, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { forEachChild } from "typescript";
import { iStrategy } from "../interfaces/interfaces";

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
            setActive: (state, action: PayloadAction<number>) => {
                state.value.forEach(s => {
                    if (s.id == action.payload)
                        s.active = true
                    else
                        s.active = false
                })
            },
            addStrategy: (state, action: PayloadAction<iStrategy>) => {
                state.value.push(action.payload)
            },
            removeStrategy: (state, action: PayloadAction<number>) => {
                state.value = state.value.filter(s => s.id != action.payload)
            }
        }
    }
)

export const { setStrategies, setActive, addStrategy, removeStrategy } = strategySlice.actions

export default strategySlice.reducer