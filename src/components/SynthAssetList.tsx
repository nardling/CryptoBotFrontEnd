import { useAppSelector } from "../store/hooks"
import SynthAsset from "./SynthAsset"

const SynthAssetList = () => {
    const synthAssets = useAppSelector(state => state.synthAssets.assets)

    return (
        <>
        {synthAssets.map(sa => <SynthAsset assetId = {sa.id} assetKey={sa.descr}/>)}
        </>
    )
}

export default SynthAssetList