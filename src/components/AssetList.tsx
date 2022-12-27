import Asset from "./Asset"

const AssetList = (props:{selectedAssets:{id: number; exchange_name: string; symbol: string; descr: string}[]}) => {

    return (
        <>
        {props.selectedAssets.map(a => <Asset key={a.id} exchName={a.exchange_name} assetKey = {a.descr} assetId = {a.id}></Asset>)}
        </>
    )
}

export default AssetList