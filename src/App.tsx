import React, { useState, useEffect, createContext} from 'react';
import logo from './logo.svg';
import './App.css';
import AssetList from './components/AssetList';
import SynthAssetList from './components/SynthAssetList';
import constants from './components/constants';
import FollowAsset from './components/FollowAsset';
import CreateSynthAsset from './components/CreateSynthAsset';
import CreateStrategy from './components/CreateStrategy';
import { BrowserRouter as Router, Route, Switch, Link  } from 'react-router-dom'

export const allAssetContext = createContext<exAsset[]>([])
export const synthAssetContext = createContext<synthAsset[]>([])


export interface exAsset {
  id: number,
  symbol: string,
  descr: string,
  exchange_name: string
}

interface synthAsset {
  id: number,
  descr: string
}

interface synthLeg {
  descr: string,
  weight: number,
  symbol: string,
  exchange_name: string
}

interface synthExchangeAsset {
  symbol: string,
  descr: string,
  id: number
}

function App() {
  const [followedAssets, setFollowedAssets] = useState<exAsset[]>([])
  const [allAssets, setAllAssets] = useState<exAsset[]>([])
  const [synthAssets, setSynthAssets] = useState<synthAsset[]>([])
  useEffect( () => {

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
        console.log(assets)
        const assetsAsSynth: synthAsset[] = assets as synthAsset[]
        setSynthAssets(assetsAsSynth)
        console.log(assetsAsSynth)

        assetsAsSynth.forEach(a => {
          const legsUrl = constants.dbUrl + "syntheticLegs/" + a.id
          fetch(legsUrl).then(res=>res.json()).then(legs=>{
            const legsAsSynth: synthLeg[] = legs
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

  return (
    <Router>
    <div className="App">
      <allAssetContext.Provider value={allAssets}>
        <synthAssetContext.Provider value = {synthAssets}>
          <div>
            <Link to='/followAsset'><button>Add New Follow</button></Link>
            <Link to='/createSynth'><button>Create Synth Asset</button></Link>
            <Link to='/createStrategy'><button>Create Strategy</button></Link>
            {/* <Link to='/'><button>Show Trades</button></Link> */}
          </div>
          <div className='side-by-side'>
            <div className='bordered'>
              <AssetList selectedAssets={followedAssets}/>
              <SynthAssetList synthAssets={synthAssets}/>
            </div>
            <div className='bordered'>
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
              </Switch>
            </div>
          </div>
        </synthAssetContext.Provider>
      </allAssetContext.Provider>
    </div>
    </Router>
  );
}

export default App;
