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

function App() {
  const [followedAssets, setFollowedAssets] = useState<{id: number; exchange_id: number; symbol: string; descr: string; exchange:{name: string}}[]>([])
  const [allAssets, setAllAssets] = useState<exAsset[]>([])

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
