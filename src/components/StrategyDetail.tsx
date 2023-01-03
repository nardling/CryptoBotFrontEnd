import { iStrategy } from "../interfaces/interfaces";
import { useAppSelector } from "../store/hooks"
import { useState } from "react";
import { useParams } from "react-router-dom";

interface stratDetailProperties {
    strategyId: string
}

const StrategyDetail = () => {
    const {strategyId} = useParams<stratDetailProperties>();
    const strategies = useAppSelector(state => state.strategies.value)
    const thisStrategy = strategies.find(s => s.id == parseInt(strategyId))!
    const trades = useAppSelector(state => state.trades.tradeList)
    const [value, setValue] = useState<number>(thisStrategy.value)
    
    return (
        <>
        <h5>Strategy: {thisStrategy.strategy_name}</h5>
        <h5>Target: {thisStrategy.target}</h5>
        <h5>Condition: {thisStrategy.condition}</h5>
        <input type="number" onChange={(e)=>{setValue(parseFloat(e.target.value))}} value={value}></input>
        <table>
            <tr>
                <th> Strategy Name </th>
                <th> Trade Time </th>
                <th> Asset Name </th>
                <th> Trade Action </th>
                <th> Price </th>
                <th> Qty </th>
            </tr>
            {trades.filter(t=>t.strategy_name==thisStrategy.strategy_name).map(t =>
                <tr>
                    <td>{t.strategy_name}</td>
                    <td>{t.trade_time_display}</td>
                    <td>{t.asset_name}</td>
                    <td>{t.trade_action}</td>
                    <td>{t.exec_price.toFixed(3)}</td>
                    <td>{t.exec_qty.toFixed(6)}</td>
                </tr>)}
        </table>
        </>
    )
}

export default StrategyDetail