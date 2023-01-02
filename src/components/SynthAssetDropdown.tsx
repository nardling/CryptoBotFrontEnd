import { synthAssetContext } from "../App"

const SynthAssetDropdown = (props: any) => {
    const {callback, index, selectedAsset} = props

    return (
        <synthAssetContext.Consumer>
            {
                value => <select value={selectedAsset} onChange={(e) => {callback(e, index)}}>
                    <option value={-1}>Choose An Asset...</option>
                    {value.map((a, ai) =>
                        <option value={a.id}>{a.descr}</option>)}
                </select>
            }
        </synthAssetContext.Consumer>
    )
}

export default SynthAssetDropdown