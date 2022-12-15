import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import AssetList from './components/AssetList';
import SynthAssetList from './components/SynthAssetList';
import constants from './components/constants';
import FollowAsset from './components/FollowAsset';

function App() {
  const [exchAssets, setExchAssets] = useState<{id: number; exchange_id: number; symbol: string; descr: string; exchange:{name: string}}[]>([])

  useEffect( () => {

    const dbUrl = constants.dbUrl + "followedAssets/1"
    fetch(dbUrl).then(res=>res.json()).then(assets=>
    {
      console.log("Assets in App: ", assets)
      setExchAssets(assets)
      exchAssets.forEach(a => {
          console.log(a)
          const url = `${constants.mdUrl}addAsset/${a.exchange.name}/${a.descr}`
          fetch(url,
            {
              method: 'POST'
            }).then(res=>res.json()).then(r=>console.log(r)).catch(e=>console.log(e))
        })
    })

    console.log(exchAssets)
  }, [])

  return (
    <div className="App">
      <AssetList selectedAssets={exchAssets}/>
      <SynthAssetList></SynthAssetList>
      <FollowAsset></FollowAsset>
    </div>
  );
}

export default App;
