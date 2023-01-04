import React, { useState, useEffect, createContext} from 'react';
import logo from './logo.svg';
import './App.css';
import AssetList from './components/AssetList';
import SynthAssetList from './components/SynthAssetList';
import constants from './components/constants';
import FollowAsset from './components/FollowAsset';
import CreateSynthAsset from './components/CreateSynthAsset';
import CreateStrategy from './components/CreateStrategy';
import StrategyDetail from './components/StrategyDetail';
import Trades from './components/Trades';
import { BrowserRouter as Router, Route, Switch, Link  } from 'react-router-dom'
import Strategy from './components/StrategyTile';
import StrategyList from './components/StrategyList';
import { setStrategies } from './store/strategiesStore';
import { addTrade } from './store/tradesStore';
import { setRefresh } from './store/propertiesStore';
import { useAppDispatch } from './store/hooks'
import { RootState } from './store/store';
import { iTrade, exAsset, synthAsset, synthLeg } from './interfaces/interfaces';
import { setSynthAssets, setSynthLegs } from './store/synthAssetStore';

export const allAssetContext = createContext<exAsset[]>([])

interface synthExchangeAsset {
  symbol: string,
  descr: string,
  id: number
}

function App() {
  const [followedAssets, setFollowedAssets] = useState<exAsset[]>([])
  const [allAssets, setAllAssets] = useState<exAsset[]>([])

  const dispatch = useAppDispatch()
  let tradesReceiver: WebSocket

  useEffect( () => {

    if (!tradesReceiver) {
      tradesReceiver = new WebSocket(constants.tradeSock)

      tradesReceiver.onmessage = (msg) => {
        const obj = JSON.parse(msg.data)
        const dt = new Date(0)
        dt.setUTCSeconds(obj.trade_time)
        const newTrade: iTrade = {
          trade_time:obj.trade_time,
          trade_time_display:`${String(dt.getUTCHours()).padStart(2, '0')}:${String(dt.getUTCMinutes()).padStart(2,'0')}:${String(dt.getUTCSeconds()).padStart(2, '0')}`,
          strategy_name:obj.strategy_name,
          asset_name:obj.asset_name,
          trade_action:obj.trade_action,
          exec_price:obj.exec_price,
          exec_qty:obj.exec_qty,
          target_ask:0,
          target_bid:0
         }
        dispatch(addTrade(newTrade))
        return false;
      }
    
      tradesReceiver.onerror = (e) => {
      }
    
      tradesReceiver.onclose = () => {
        tradesReceiver.send("close")
      }
    
      tradesReceiver.onopen = (msg) => {
        tradesReceiver.send("subscribe")
      }
      
    }
    
    const dbUrl = constants.dbUrl + "followedAssets/" + constants.userId
    fetch(dbUrl).then(res=>res.json()).then(assets=>
    {
      const assetsCast: exAsset[] = assets
      setFollowedAssets(assets)
      assetsCast.forEach(a => {
          const url = `${constants.mdUrl}addAsset/${a.exchange_name}/${a.descr}`
          fetch(url,
            {
              method: 'POST'
            }).then(res=>res.json()).then(r=>{}).catch(e=>console.log(e))
        })
    })

    const synthAssetsUrl = constants.dbUrl + "syntheticAssets/" + constants.userId
    fetch(synthAssetsUrl).then(res => res.json()).then(assets =>
      {
        const assetsAsSynth: synthAsset[] = assets as synthAsset[]
        dispatch(setSynthAssets(assetsAsSynth))

        assetsAsSynth.forEach(a => {
          const legsUrl = constants.dbUrl + "syntheticLegs/" + a.id
          fetch(legsUrl).then(res=>res.json()).then(legs=>{
            const legsAsSynth: synthLeg[] = legs
            dispatch(setSynthLegs({id: a.id, legs: legs}))
            const regSynthAssetUrl = `${constants.mdUrl}registerSynthAsset/${constants.userId}/${a.descr}`
            fetch(regSynthAssetUrl,
              {
                method: 'POST'
              }).then(res=>res.json()).then(res => {
                legsAsSynth.forEach(l => {
                  const regSynthAssetUrl = `${constants.mdUrl}registerSynthLeg/${constants.userId}/${a.descr}/${l.exchange_name}/${l.descr}/${l.weight}`
                  fetch(regSynthAssetUrl,
                    {
                      method: 'POST'
                    }).then(res=>res.json())
                })
              }).catch(e=>console.log(e))
          })
        })
      }
      )

    const allAssetsUrl = constants.dbUrl + "allExchAssets"
    fetch(allAssetsUrl).then(res=>res.json()).then(
      assets=>{
          setAllAssets(assets)
      }
    )

    const strategiesUrl = constants.dbUrl + "getStrategiesForUser/" + constants.userId
    fetch(strategiesUrl).then(res=>res.json()).then(
      strategies => {
        dispatch(setStrategies(strategies))
      }
    )
  }, [])

  const newAssetFollowed = (newAsset: exAsset) => {
    const newAssetList = [...followedAssets]
    newAssetList.push(newAsset)
    setFollowedAssets(newAssetList)
    const url = `${constants.mdUrl}addAsset/${newAsset.exchange_name}/${newAsset.descr}`
    fetch(url,
      {
        method: 'POST'
      }).then(res=>res.json()).then(r=>{}).catch(e=>console.log(e))
  }

  const followedAssetRemoved = (assetId:number) => {
    const newAssetList = followedAssets.filter(a => a.id != assetId)
    setFollowedAssets(newAssetList)
  }

  return (
    <Router>
    <div className="App">
      <allAssetContext.Provider value={allAssets}>
          <div className='side-by-side'>
            <div className='bordered25'>
              <label htmlFor="refresh_on_off">Auto-Refresh Asset Prices: </label>
              <input type="checkbox" id="refresh_on_off" value="ON" onChange={(e) => {
                dispatch(setRefresh(e.target.checked))
              }}></input>
              <AssetList selectedAssets={followedAssets} assetRemovedCallback={followedAssetRemoved}/>
              <SynthAssetList/>
            </div>
            <div className='bordered25'>
              <StrategyList/>
            </div>
            <div className='bordered50'>
              <div>
                <Link to='/followAsset'><button>Add New Follow</button></Link>
                <Link to='/createSynth'><button>Create Synth Asset</button></Link>
                <Link to='/createStrategy'><button>Create Strategy</button></Link>
                {/* <Link to='/showStrategy'><button>Show Strategy</button></Link> */}
                <Link to='/trades'><button>Show Trades</button></Link>
              </div>
              <Switch>
                <Route path="/followAsset">
                  <FollowAsset addFollowCallback = {newAssetFollowed}></FollowAsset>
                </Route>
                <Route path="/createSynth">
                  <CreateSynthAsset></CreateSynthAsset>
                </Route>
                <Route path="/createStrategy">
                  <CreateStrategy></CreateStrategy>
                </Route>
                <Route path="/showStrategy/:strategyId">
                  <StrategyDetail></StrategyDetail>
                </Route>
                <Route path="/trades">
                  <Trades></Trades>
                </Route>
              </Switch>
            </div>
          </div>
      </allAssetContext.Provider>
    </div>
    </Router>
  );
}

export default App;
