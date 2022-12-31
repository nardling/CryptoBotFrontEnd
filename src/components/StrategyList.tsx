import { useEffect } from 'react'
import { iStrategy } from '../App'
import constants from './constants'
import StrategyTile from './StrategyTile'

const StrategyList = (props: any) => {
    const {strategies} = props

    console.log("Strategies", strategies)

    const lclStrats: iStrategy[] = strategies as iStrategy[]

    return (
        <>
        {lclStrats.map(s => {return <StrategyTile strategy={s}></StrategyTile>})}
        </>
    )
}

export default StrategyList