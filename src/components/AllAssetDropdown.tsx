import { allAssetContext } from "../App"

const AllAssetDropdown = (props: any) => {
    const {callback, index, selectedAsset} = props

    return (
        <allAssetContext.Consumer>
            {
                value => <select value={selectedAsset} onChange={(e) => {callback(e, index)}}>
                    <option value={-1}>Choose An Asset...</option>
                    {value.map((a, ai) =>
                        <option value={a.id}>{a.exchange_name} : {a.symbol}</option>)}
                </select>
            }
        </allAssetContext.Consumer>
    )
}

export default AllAssetDropdown