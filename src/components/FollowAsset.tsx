import React, { useState, useEffect, ButtonHTMLAttributes } from "react"
import constants from "./constants"
import { allAssetContext } from "../App"

const FollowAsset = () => {
    const [selectedAsset, setSelectedAsset] = useState<number>(-1)
    
    const submitFollow = (e: React.MouseEvent) => {
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
        console.log(e)
        console.log("Selected Asset Id ", selectedAsset)
    }

    const updateSelectedAsset = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e)
        setSelectedAsset(Number(e.target.value))
    }

    return (
        <allAssetContext.Consumer>
            {value => 
            <form>
                <select onChange={(e) => {updateSelectedAsset(e)}}>
                    {value.map(a =><option value={a.id}>{a.exchange.name} : {a.symbol}</option>)}
                </select>
                <button onClick={submitFollow}>Follow Asset</button>
            </form> }
        </allAssetContext.Consumer>
    )
}

export default FollowAsset