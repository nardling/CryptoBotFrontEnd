import { iStrategy } from "../interfaces/interfaces";
import constants from './constants'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

const StrategyTile = (props: {strategy: iStrategy}) => {

    const [registered, setRegistered] = useState(false)
    const [running, setRunning] = useState(false)
    const strategy = props.strategy
    const history = useHistory()

    useEffect (
        () => {
            const url = constants.mdUrl + "getStrategyState/" + constants.userId + "/" + strategy.strategy_name
            fetch(url).then(res=>res.json()).then(status=>{
                    console.log("Strategy Status", status)
                    setRegistered(status.isRegistered)
                    if (status.isRegistered)
                        setRunning(status.isRunning)
                    else
                        setRunning(false)
                }
            ).catch(data=>{
                setRegistered(false)
                setRunning(false)
            })
        }, []
    )

    const registerStrategy = () => {
        const url = constants.mdUrl + "registerStrategy/" + constants.userId + "/" + strategy.synth_asset_name + "/" + 
            strategy.target + "/" + strategy.condition + "/" + strategy.value + "/" + strategy.action + "/" + strategy.max_exposure +
            "/" + strategy.max_trade_notional + "/" + strategy.time_delay + "/" + strategy.strategy_name
        setRegistered(true)
        console.log(url)
        fetch(url, {
            method: 'POST'
        })
    }

    const startStrategy = () => {
        const url = constants.mdUrl + "startStopStrategy/" + constants.userId + "/" + strategy.strategy_name + "/" + "START"
        fetch(url, {
            method: 'POST'
        }).then(res=>res.json).then(()=>{setRunning(true)})
    }

    const stopStrategy = () => {
        const url = constants.mdUrl + "startStopStrategy/" + constants.userId + "/" + strategy.strategy_name + "/" + "STOP"
        fetch(url, {
            method: 'POST'
        }).then(res=>res.json).then(()=>{setRunning(false)})
    }

    const UnRegisterStrategy = () => {
        const url = constants.mdUrl + "startStopStrategy/" + constants.userId + "/" + strategy.strategy_name + "/" + "STOP"
        fetch(url, {
            method: 'POST'
        })
    }

    const displayStartStop = () => {
        if (registered) {
            if (running) {
                return <button onClick={stopStrategy}>Stop</button>
            }
            else {
                return <button onClick={startStrategy}>Start</button>
            }
        }
        else {
            return <></>
        }
    }

    const selectStrategy = () => {
        const url=`/showStrategy/${strategy.strategy_name}`
        history.push(url)
    }

    // <button onClick={registerStrategy}>UnRegister</button>

    return (
        <div onClick={selectStrategy}>
            <h5>{strategy.strategy_name}</h5>
            {registered ? <></> : <button onClick={registerStrategy}>Register</button>}
            {displayStartStop()}
        </div>
    )
}

export default StrategyTile