import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iTrade } from "../interfaces/interfaces";

export const tradesSlice = createSlice(
    {
        name: 'trades',
        initialState: {
            tradeList: new Array<iTrade>
        },
        reducers: {
            addTrade: (state, action: PayloadAction<iTrade>) => {
                state.tradeList.push(action.payload)
            },
            clearTrades: (state) => {
                state.tradeList = new Array<iTrade>
            }
        }
    }
)

export const { addTrade, clearTrades } = tradesSlice.actions
export default tradesSlice.reducer