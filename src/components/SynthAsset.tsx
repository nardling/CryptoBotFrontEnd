import React, { useEffect, useState } from "react"
import constants from "./constants"
import { useAppSelector } from '../store/hooks'

const SynthAsset = (props: any) => {
    const [priceInfo, setPriceInfo] = useState<{[key: string]: string}>({})
    const [callCount, setCallCount] = useState<number>(0)
    const [assetRegistered, setAssetRegistered] = useState<boolean>(false)

    const {assetKey, assetId} = props
    const autoRefresh: boolean = useAppSelector(state => state.properties.settings.refresh_on)
    
    useEffect ( () => {
        if (autoRefresh) {
            const url = constants.mdUrl + "getLatestSynthPrice/" + constants.userId + "/" + assetKey
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
        const url: string = constants.dbUrl + "removeSynthAsset"
        const payload: {} = {
            "assetId": assetId
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })/*.then( remove from list) */
    }

    return (
        <>
        <h5>{assetKey}</h5>
        <h5>Bid:{priceInfo["bidSize"]} @ {priceInfo["bestBid"]}</h5>
        <h5>Ask:{priceInfo["offerSize"]} @ {priceInfo["bestOffer"]}</h5>
        <button onClick={removeAsset}>Remove Synth Asset</button>
        </>
    )
}

export default SynthAsset