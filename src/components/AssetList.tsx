import Asset from "./Asset"

const AssetList = (props:{selectedAssets:{id: number; exchange_name: string; symbol: string; descr: string}[], assetRemovedCallback: any}) => {
    return (
        <>
        {props.selectedAssets.map(a => <Asset key={a.id} exchName={a.exchange_name} assetKey = {a.descr} assetId = {a.id} symbol = {a.symbol} removeCallback={props.assetRemovedCallback}></Asset>)}
        </>
    )
}

export default AssetList