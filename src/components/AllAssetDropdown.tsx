import { allAssetContext } from "../App"

const AllAssetDropdown = (props: any) => {
    const {callback, index, selectedAsset} = props

    return (
        <allAssetContext.Consumer>
            {
                value => <select value={selectedAsset} onChange={(e) => {callback(e, index)}}>
                    {value.map((a, ai) =>
                        <option value={a.id}>{a.exchange.name} : {a.symbol}</option>)}
                </select>
            }
        </allAssetContext.Consumer>
    )
}

export default AllAssetDropdown