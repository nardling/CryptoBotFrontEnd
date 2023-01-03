import { iTrade } from "../interfaces/interfaces";
import { useAppSelector } from "../store/hooks";

const Trades = () => {
    const trades = useAppSelector(state => state.trades.tradeList)
    return(
        <table>
            <tr>
                <th> Strategy Name </th>
                <th> Trade Time </th>
                <th> Asset Name </th>
                <th> Trade Action </th>
                <th> Price </th>
                <th> Qty </th>
            </tr>
            {trades.map(t =>
                <tr>
                    <td>{t.strategy_name}</td>
                    <td>{t.trade_time_display}</td>
                    <td>{t.asset_name}</td>
                    <td>{t.trade_action}</td>
                    <td>{t.exec_price.toFixed(3)}</td>
                    <td>{t.exec_qty.toFixed(6)}</td>
                </tr>)}
        </table>
    )
}

export default Trades