import React, { useState, useEffect, ButtonHTMLAttributes } from "react"
import constants from "./constants"
import { allAssetContext } from "../App"
import { exAsset } from "../App"
import AllAssetDropdown from "./AllAssetDropdown"

// id: number,
// symbol: string,
// descr: string,
// exchange_name: string

const FollowAsset = (props: any) => {
    const [selectedAsset, setSelectedAsset] = useState<number>(-1)
    
    const {addFollowCallback} = props

    const submitFollow = (assets: exAsset[], e: React.MouseEvent) => {
        if (selectedAsset >= 0) {
            const url: string = constants.dbUrl + "addFollowedAsset"
            e.preventDefault()
            const payload: {} = {
                "user_id": 1,
                "exch_asset_id": selectedAsset
            }
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const newFollow = assets.filter(a=>{return a.id == selectedAsset})[0]
            addFollowCallback(newFollow)
        }
    }

    const updateSelectedAsset = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e)
        setSelectedAsset(Number(e.target.value))
    }

    return (
        <allAssetContext.Consumer>
            {value => 
            <form>
                <AllAssetDropdown callback={updateSelectedAsset} index={0} selectedAsset={-1}></AllAssetDropdown>
                <button onClick={(e) => {submitFollow(value, e)}}>Follow Asset</button>
            </form> }
        </allAssetContext.Consumer>
    )
}

export default FollowAsset