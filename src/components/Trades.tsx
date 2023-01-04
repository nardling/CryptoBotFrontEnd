import { iTrade } from "../interfaces/interfaces";
import { useAppSelector } from "../store/hooks";
import TradesTable from "./TradesTable";

const Trades = () => {
    const trades = useAppSelector(state => state.trades.tradeList)
    return(
        <TradesTable trades={trades}></TradesTable>
    )
}

export default Trades