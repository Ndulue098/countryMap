import { useDispatch } from "react-redux"
import { setCountryName } from "./countrySlice"

export default function Borders({border,countrycode}) {
    const dispatch=useDispatch()
    function handleClick(name){ 
     
        
        dispatch(setCountryName(countrycode))
    }
    return <p onClick={()=>handleClick(border)}>{border}</p>
}

