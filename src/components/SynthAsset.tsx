import React, { useEffect, useState } from "react"
import constants from "./constants"

const SynthAsset = (props: any) => {
    const [priceInfo, setPriceInfo] = useState<{[key: string]: string}>({})
    const [callCount, setCallCount] = useState<number>(0)
    const [assetRegistered, setAssetRegistered] = useState<boolean>(false)

    const {assetKey, assetId} = props
    
    useEffect ( () => {
        const url = constants.mdUrl + "latestPrice/" + assetKey
        console.log("try ", url)
        fetch(url).then(res => res.json()).then(j => { console.log(j); setPriceInfo(j)}).catch(e=>{console.log("Error in get price: ", e)})

        const timerId = setInterval(() => {
            setCallCount(callCount + 1)
          }, 5000);

        return function cleanup() {
            clearInterval(timerId);
        };
    }, [callCount])

    const removeAsset = () => {
        const url: string = constants.dbUrl + "removeSynthAsset"
        const payload: {} = {
            "id": assetId
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    }

    return (
        <>
        <h4>{assetKey}</h4>
        <h4>Bid:{priceInfo["bidSize"]} @ {priceInfo["bestBid"]}</h4>
        <h4>Ask:{priceInfo["offerSize"]} @ {priceInfo["bestOffer"]}</h4>
        <button onClick={removeAsset}>Remove</button>
        </>
    )
}

export default SynthAsset