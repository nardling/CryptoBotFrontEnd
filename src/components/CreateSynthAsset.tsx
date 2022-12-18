import constants from "./constants"
import React, { useEffect, useState } from "react"
import AllAssetDropdown from "./AllAssetDropdown"

interface leg {
    assetId: number,
    weight: number
}

// interface savedLeg {
//     exch_asset_id : number,
//     weight: number
// }

const newLeg = {
    assetId: -1,
    weight: 0
}

const CreateSynthAsset = () => {
    const [assetList, setAssetList] = useState<leg[]>([newLeg])
    const [assetName, setAssetName] = useState<String>("")

    const saveAsset = () => {
        const legs = assetList.map(a => {
            const payload: {} = {
                "weight": a.weight,
                "exch_asset_id": a.assetId
            }
            return payload
        })
        const newSynthAsset: {} = {
            "user_id" : constants.userId,
            "descr" : assetName,
            "synth_legs_attributes" : legs
        }
        const url = constants.dbUrl + "createSynthAsset/"
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newSynthAsset)
        })
    }

    const addLeg = () => {
        const newLeg = {
            assetId: -1,
            weight: 0
        }
        setAssetList([...assetList, newLeg])
    }

    const removeLeg = (index: number) => {
        let curList = [...assetList]
        curList.splice(index, 1)
        setAssetList(curList)
    }

    const dropDownChanged = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        console.log(e, index)
        let curAssetList=[...assetList]
        curAssetList[index].assetId = parseInt(e.target.value)
        setAssetList(curAssetList)
    }

    const setWeight = (e: any, index: number) => {
        let curAssetList=[...assetList]
        curAssetList[index].weight = e.target.value
        setAssetList(curAssetList)
    }

    const assetNameChanged = (e: any) => {
        setAssetName(e.target.value)
    }

    return (
        <>
            <label>SynthAssetName: </label>
            <input type="text" name="synthName" list="exitingSynths" onChange={assetNameChanged}/>
            <br/>
            <table>
            {
            assetList.map((a, index) =>
            <tr>
            <td>
                <label>Asset: </label>
                <AllAssetDropdown callback={dropDownChanged} index={index} selectedAsset={a.assetId}></AllAssetDropdown>
                <label>Weight: </label>
                <input value={a.weight} type="text" name="assetWeight" onChange={(e) => setWeight(e, index)}></input>
                <button onClick={addLeg}>+</button>
                <button onClick={() => removeLeg(index)}>-</button>
                </td>
                </tr>
            )}
            </table>
            <button onClick={saveAsset}>Save</button>
        </>
    )
}

export default CreateSynthAsset