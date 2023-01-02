import React, { useEffect, useState } from "react"
import constants from "./constants"
import { useAppSelector } from '../store/hooks'

const Asset = (props: any) => {
    const [priceInfo, setPriceInfo] = useState<{[key: string]: string}>({})
    const [callCount, setCallCount] = useState<number>(0)
    const [assetRegistered, setAssetRegistered] = useState<boolean>(false)

    const {exchName, assetKey, assetId, symbol, removeCallback} = props

    const autoRefresh: boolean = useAppSelector(state => state.properties.settings.refresh_on)

    useEffect ( () => {
        if (autoRefresh) {
            const url = constants.mdUrl + "latestPrice/" + exchName + "/" + assetKey
            fetch(url).then(res => res.json()).then(j => {setPriceInfo(j)}).catch(e=>{console.log("Error in get price: ", e)})

            const timerId = setInterval(() => {
                setCallCount(callCount + 1)
            }, 1000);

            return function cleanup() {
                clearInterval(timerId);
            };
        }
    }, [callCount, autoRefresh])

    const removeAsset = () => {
        const url: string = constants.dbUrl + "removeFollowedAsset"
        const payload: {} = {
            "user_id": constants.userId,
            "exch_asset_id": assetId
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(removeCallback(assetId))
    }

    return (
        <>
        <h5>{exchName}:{symbol}</h5>
        <h5>Bid:{priceInfo["bidSize"]} @ {priceInfo["bestBid"]}</h5>
        <h5>Ask:{priceInfo["offerSize"]} @ {priceInfo["bestOffer"]}</h5>
        <button onClick={removeAsset}>Remove</button>
        </>
    )
}

export default Asset