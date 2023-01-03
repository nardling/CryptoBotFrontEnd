import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { synthAsset } from "../interfaces/interfaces";

export const synthAssetSlice = createSlice(
    {
        name: 'synthAssets',
        initialState: {
            assets: new Array<synthAsset>
        },
        reducers: {
            addSynthAsset: (state, action: PayloadAction<synthAsset>) => {
                state.assets.push(action.payload)
            },
            setSynthAssets: (state, action: PayloadAction<synthAsset[]>) => {
                state.assets = action.payload
            },
            removeSynthAsset: (state, action: PayloadAction<number>) => {
                state.assets = state.assets.filter(a => a.id != action.payload)
            }
        }
    }
)

export const { addSynthAsset, setSynthAssets, removeSynthAsset } = synthAssetSlice.actions
export default synthAssetSlice.reducer