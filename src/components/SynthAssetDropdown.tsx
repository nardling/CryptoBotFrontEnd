import { useAppSelector } from '../store/hooks'

const SynthAssetDropdown = (props: any) => {
    const {callback, index, selectedAsset} = props

    const synthAssets = useAppSelector(state => state.synthAssets.assets)

    return (
            <select value={selectedAsset} onChange={(e) => {callback(e, index)}}>
                <option value={-1}>Choose An Asset...</option>
                {synthAssets.map(a =>
                    <option value={a.id}>{a.descr}</option>)}
            </select>
    )
}

export default SynthAssetDropdown