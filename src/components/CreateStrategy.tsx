import React, {useState} from "react"
import AllAssetDropdown from "./AllAssetDropdown"
import constants from "./constants"
import SynthAssetDropdown from "./SynthAssetDropdown"
import { iStrategy } from "../interfaces/interfaces"
import { stringify } from "querystring"

const CreateStrategy = () => {
    const addUrl = constants.dbUrl + "createStrategy"
    const [target, setTarget] = useState(constants.Bid)
    const [condition, setCondition] = useState("LT")
    const [value, setValue] = useState(0)
    const [action, setAction] = useState("Buy")
    const [maxExposure, setMaxExposure] = useState(0.5)
    const [maxTradeNotional, setMaxTradeNotional] = useState(0.1)
    const [timeDelay, setTimeDelay] = useState(1)
    const [assetId, setAssetId] = useState(-1)
    const [name, setName] = useState("")

    const addStrategy = () => {
        const newStrategy: iStrategy = {
            "synthetic_asset_id": assetId,
            "user_id": constants.userId,
            "target": target,
            "condition": condition,
            "value": value,
            "action": action,
            "max_exposure": maxExposure,
            "max_trade_notional": maxTradeNotional,
            "time_delay": timeDelay,
            "strategy_name" : name,
            "synth_asset_name": "",
            "id": -1
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
        setAssetId(parseInt(e.target.value))
    }

    return (
        <>
        <label>Strategy Name: </label>
        <input type="text" onChange={(e) => {setName(e.target.value)}}/>
        <br/>
        <br/>
        <label>Asset: </label>
        <SynthAssetDropdown callback={assetChanged} index={0} selectedAsset={assetId}/>
        <br/>
        <br/>
        <label>Target: </label>
        <select onChange={(e) => setTarget(e.target.value)} value={target} >
            <option>{constants.Bid}</option>
            <option>{constants.Offer}</option>
            {/* <option>Spread</option> */}
        </select>
        <label>Condition: </label>
        <select onChange={(e) => setCondition(e.target.value)} value={condition} >
            <option>Less Than</option>
            <option>Greater Than</option>
        </select>
        <label>Value: </label>
        <input type="number" onChange={(e)=>{setValue(parseFloat(e.target.value))}} value={value}/>
        <br/>
        <br/>
        <label>Action: </label>
        <select onChange={(e) => setAction(e.target.value)} value={action}>
            <option>{constants.Buy}</option>
            <option>{constants.Sell}</option>
        </select>
        <br/>
        <br/>
        <label>Max Exposure: </label>
        <input type="number" onChange={(e) => {setMaxExposure(parseFloat(e.target.value))}} value={maxExposure}/>
        <br/>
        <label>Max Trade: </label>
        <input type="number" onChange={(e) => {setMaxTradeNotional(parseFloat(e.target.value))}} value={maxTradeNotional}/>
        <br/>
        <label>Time Delay: </label>
        <input type="number" onChange={(e) => {setTimeDelay(parseFloat(e.target.value))}} value={timeDelay}/>
        <br/>
        <br/>
        <button onClick={addStrategy}>Save</button>
        </>
    )
}

export default CreateStrategy