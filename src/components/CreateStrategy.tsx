import React, {useState} from "react"
import AllAssetDropdown from "./AllAssetDropdown"
import constants from "./constants"
import SynthAssetDropdown from "./SynthAssetDropdown"

const CreateStrategy = () => {
    const addUrl = constants.dbUrl + "createStrategy"
    const [target, setTarget] = useState("")
    const [condition, setCondition] = useState("")
    const [value, setValue] = useState(0)
    const [action, setAction] = useState("")
    const [maxExposure, setMaxExposure] = useState(0)
    const [maxTradeNotional, setMaxTradeNotional] = useState(0)
    const [timeDelay, setTimeDelay] = useState(0)
    const [assetId, setAssetId] = useState(0)
    const [name, setName] = useState("")

    const addStrategy = () => {
        const newStrategy = {
            "synthetic_asset_id": assetId,
            "user_id": constants.userId,
            "target": target,
            "condition": condition,
            "value": value,
            "action": action,
            "max_exposure": maxExposure,
            "max_trade_notional": maxTradeNotional,
            "time_delay": timeDelay
        }

        fetch(addUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newStrategy)
        })
    }

    const assetChanged = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {

    }

    return (
        <>
        <label>Strategy Name: </label>
        <input type="text" onChange={(e) => {setName(e.target.value)}}/>
        <label>Asset: </label>
        <SynthAssetDropdown callback={assetChanged} index={0} selectedAsset={-1}/>
        <label>Name: </label>
        <input type="text" onChange={(e)=>{setName(e.target.value)}}/>
        <label>Target: </label>
        <select onChange={(e) => setTarget(e.target.value)}>
            <option>Bid</option>
            <option>Offer</option>
            <option>Spread</option>
        </select>
        <label>Condition: </label>
        <select onChange={(e) => setAction(e.target.value)}>
            <option>Less Than</option>
            <option>Greater Than</option>
        </select>
        <label>Value: </label>
        <input type="number" onChange={(e)=>{setValue(parseFloat(e.target.value))}}/>
        <label>Max Exposure: </label>
        <input type="number" onChange={(e) => {setMaxExposure(parseFloat(e.target.value))}}/>
        <label>Max Trade: </label>
        <input type="number" onChange={(e) => {setMaxTradeNotional(parseFloat(e.target.value))}}/>
        <label>Time Delay: </label>
        <input type="number" onChange={(e) => {setTimeDelay(parseFloat(e.target.value))}}/>
        <button onClick={addStrategy}>Save</button>
        </>
    )
}

export default CreateStrategy