import { iStrategy } from "../interfaces/interfaces";
import { useAppSelector } from "../store/hooks"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TradesTable from "./TradesTable";
import { Prompt } from "react-router-dom";
import constants from './constants'

interface stratDetailProperties {
    strategyId: string
}

const StrategyDetail = () => {
    const {strategyId} = useParams<stratDetailProperties>();
    const strategies = useAppSelector(state => state.strategies.value)
    const thisStrategy = strategies.find(s => s.id == parseInt(strategyId))!
    const synthAssets = useAppSelector(state => state.synthAssets.assets)
    const thisAsset = synthAssets.find(a => a.descr == thisStrategy.synth_asset_name)!
    const trades = useAppSelector(state => state.trades.tradeList)
    const [value, setValue] = useState<number>(thisStrategy.value)

    const sendModify = () => {
        const url = constants.mdUrl + "modifyStrategyThreshold/" + constants.userId + "/" + thisStrategy.strategy_name + "/" + value
        fetch(url).then(res=>res.json()).then(data => {
            if (data.valueChanged == "False") {
                setValue(thisStrategy.value)
            } else {
                const dbChange = constants.dbUrl + "updateStrategyThreshold"
                const payload = {
                    "strategyId" : thisStrategy.id,
                    "new_value" : value
                }
                fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    }
                )
            }
        })
    }

    const getFormulaString = () => {
        var formulaString = ""
        var first = true
        if (thisAsset.legs) {
            thisAsset.legs.forEach(l => {
                if (!first && l.weight > 0) {
                    formulaString += "+ "
                }
                formulaString += `${l.weight} X ${l.exchange_name}:${l.symbol} `
                first = false
            })
            return formulaString.substring(0, formulaString.length - 2)
        }
    }

    return (
        <>
        <h5>Strategy: {thisStrategy.strategy_name}</h5>
        <h5>{getFormulaString()}</h5>
        <label>{`${thisStrategy.action} when ${thisStrategy.target} is ${thisStrategy.condition}  `}</label>
        <input type="number" onChange={(e)=>{setValue(parseFloat(e.target.value))}} value={value}></input>
        <br/><br/>
        <button onClick={sendModify}>Modify Threshold</button>
        <br/><br/>
        <TradesTable trades={trades.filter(t=>t.strategy_name==thisStrategy.strategy_name)}></TradesTable>
        </>
    )
}

export default StrategyDetail