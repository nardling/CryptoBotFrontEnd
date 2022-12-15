import Asset from "./Asset"

const AssetList = (props:{selectedAssets:{id: number; exchange_id: number; symbol: string; descr: string}[]}) => {//selectedAssets: {id: number; exchange_id: number; symbol: string; descr: string}[]) => {

    console.log("In AssetList ", props.selectedAssets)
    return (
        <>
        <h1>AssetList</h1>
        {props.selectedAssets.map(a => <Asset assetKey = {a.descr}></Asset>)}
        </>
    )
}

export default AssetList