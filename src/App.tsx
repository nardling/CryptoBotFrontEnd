import React, { useState, useEffect, createContext} from 'react';
import logo from './logo.svg';
import './App.css';
import AssetList from './components/AssetList';
import SynthAssetList from './components/SynthAssetList';
import constants from './components/constants';
import FollowAsset from './components/FollowAsset';
import CreateSynthAsset from './components/CreateSynthAsset';

export const allAssetContext = createContext<exAsset[]>([])

interface ex {
  id: number,
  name: string
}

interface exAsset {
  id: number,
  symbol: string,
  descr: string,
  exchange: ex
}

interface synthAsset {
  id: number,
  descr: string
  synth_legs: synthLeg[],
  exch_asset: synthAsset[]
}

interface synthLeg {
  exch_asset_id: number,
  weight: number
}

interface synthAsset {
  symbol: string,
  descr: string,
  id: number
}

function App() {
  const [followedAssets, setFollowedAssets] = useState<{id: number; exchange_id: number; symbol: string; descr: string; exchange:{name: string}}[]>([])
  const [allAssets, setAllAssets] = useState<exAsset[]>([])
  const [synthAssets, setSynthAssets] = useState<synthAsset[]>([])
  useEffect( () => {

    const dbUrl = constants.dbUrl + "followedAssets/" + constants.userId
    fetch(dbUrl).then(res=>res.json()).then(assets=>
    {
      setFollowedAssets(assets)
      followedAssets.forEach(a => {
          const url = `${constants.mdUrl}addAsset/${a.exchange.name}/${a.descr}`
          fetch(url,
            {
              method: 'POST'
            }).then(res=>res.json()).then(r=>console.log(r)).catch(e=>console.log(e))
        })
    })

    const synthAssetsUrl = constants.dbUrl + "syntheticAssets/" + constants.userId
    fetch(synthAssetsUrl).then(res => res.json()).then(assets =>
      {
        setSynthAssets(synthAssets)
        synthAssets.forEach(a => {
          const regSynthAssetUrl = `${constants.mdUrl}registerSynthAsset/${constants.userId}/${a.descr}`
          fetch(regSynthAssetUrl,
            {
              method: 'POST'
            }).then(res=>res.json()).then(res => {
              a.synth_legs.forEach(l => {
                const exAsset = a.exch_assets.
                const regSynthAssetUrl = `${constants.mdUrl}registerSynthLeg/${constants.userId}/${a.descr}/${l.exch_asset_id}/${l.weight}`
                fetch(regSynthAssetUrl,
                  {
                    method: 'POST'
                  }).then(res=>res.json())
              })
            }).catch(e=>console.log(e))
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

  return (
    <div className="App">
      <allAssetContext.Provider value={allAssets}>
        {/* <AssetList selectedAssets={followedAssets}/> */}
        {/* <SynthAssetList></SynthAssetList> */}
        {/* Done 12-15 <FollowAsset></FollowAsset> */}
        <CreateSynthAsset></CreateSynthAsset>
      </allAssetContext.Provider>
      
    </div>
  );
}

export default App;
