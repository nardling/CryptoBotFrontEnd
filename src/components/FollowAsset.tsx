import React, { useState, useEffect, ButtonHTMLAttributes } from "react"
import constants from "./constants"

interface ex {
    id: number,
    name: string
}

interface exAsset {
    id: number,
    symbol: string,
    descr: string,
    exchange: ex
}

const FollowAsset = () => {
    const [allAssets, setAllAssets] = useState<{[key: string]: exAsset}>({})
    const [selectedAsset, setSelectedAsset] = useState<number>(-1)

    const url = constants.dbUrl + "allExchAssets"
    useEffect(
        () => {
            fetch(url).then(res=>res.json()).then(
                assets=>{
                    setAllAssets(assets)
                }
            )
        }, []
    )

    console.log(allAssets)
    
    const submitFollow = (e: React.MouseEvent) => {
        e.preventDefault()
        console.log(e)
        console.log("Selected Asset Id ", selectedAsset)
    }

    const updateSelectedAsset = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e)
        setSelectedAsset(Number(e.target.value))
    }

    return (
        <form>
            <select onChange={(e) => {updateSelectedAsset(e)}}>
                {Object.values(allAssets).map(a =><option value={a.id}>{a.exchange.name} : {a.symbol}</option>)}
            </select>
            <button onClick={submitFollow}>Follow Asset</button>
        </form>
    )
}

export default FollowAsset