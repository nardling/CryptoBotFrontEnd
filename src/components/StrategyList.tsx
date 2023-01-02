import { useEffect } from 'react'
import { iStrategy } from "../interfaces/interfaces";
import constants from './constants'
import StrategyTile from './StrategyTile'
import { useAppSelector } from '../store/hooks'

const StrategyList = () => {
    const strategies = useAppSelector(state => state.strategies.value)

    const lclStrats: iStrategy[] = strategies as iStrategy[]

    return (
        <>
        {lclStrats.map(s => {return <StrategyTile strategy={s}></StrategyTile>})}
        </>
    )
}

export default StrategyList