import { iStrategy } from "../App"
import { useAppSelector } from "../store/hooks"

const StrategyDetail = () => {
    
    const strategies = useAppSelector(state => state.strategies.value)

    return (
        <h5>StrategyDetail</h5>
    )
}

export default StrategyDetail