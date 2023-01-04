import { iStrategy } from "../interfaces/interfaces";
import constants from './constants'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAppDispatch } from "../store/hooks";
import { setActive, removeStrategy, strategySlice } from "../store/strategiesStore";

const StrategyTile = (props: {strategy: iStrategy}) => {

    const [registered, setRegistered] = useState(false)
    const [running, setRunning] = useState(false)
    const strategy = props.strategy
    const history = useHistory()
    const dispatch = useAppDispatch()

    useEffect (
        () => {
            const url = constants.mdUrl + "getStrategyState/" + constants.userId + "/" + strategy.strategy_name
            fetch(url).then(res=>res.json()).then(status=>{
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
        fetch(url, {
            method: 'POST'
        }).then(r=>setRegistered(true))
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
        dispatch(setActive(strategy.id))
        const url=`/showStrategy/${strategy.id}`
        history.push(url)
    }

    const removeStrategy = () => {
        stopStrategy()
        const dbUrl = constants.dbUrl + "removeStrategy"
        const payload = {
            "strategyId" : strategy.id
        }
        fetch(dbUrl, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        )
        dispatch(strategySlice.actions.removeStrategy(strategy.id))
        const url="/";
        history.push(url)
    }

    return (
        <div className={strategy.active ? "activeStrat" : "inactiveStrat"}>
            <h5>{strategy.strategy_name}</h5>
            {registered ? <></> : <button onClick={registerStrategy}>Register</button>}
            {displayStartStop()}
            <button onClick={removeStrategy}>Remove</button>
            <button onClick={selectStrategy}>Show</button>
        </div>
    )
}

export default StrategyTile