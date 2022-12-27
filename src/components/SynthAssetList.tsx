import SynthAsset from "./SynthAsset"

const SynthAssetList = (props:{synthAssets:{
    id: number,
    descr: string}[]
}) => {
    return (
        <>
        {props.synthAssets.map(sa => <SynthAsset assetId = {sa.id} assetKey={sa.descr}/>)}
        </>
    )
}

export default SynthAssetList