import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {getCountry} from "../../services/countryFromPosition"
import { allCountry } from "../../services/allCountry"


const initialState={
    position:[0,0],
    data:{},
    status:"idle",
    error:"",
    countries:[],
}   


// export const fetchCountry=createAsyncThunk("map/getCountry",async (_,{getState})=>{
//     const {position}=getState().map
//     const [lat,lng]=position
//     const data=await getCountry(lat,lng) 
//     return data
// })

// export const fetchAllCounties=createAsyncThunk("map/allCountries",async ()=>{
//    const countries=allCountry();
//    return countries
// })






const mapSlice=createSlice({
    name:"map",
    initialState,
    reducers:{
        addPosition(curState,action){
          console.log(action.payload);
            curState.position=action.payload
        }
    },
    // extraReducers:(builder)=>builder.addCase(fetchCountry.pending,(curState,action)=>{
    //     curState.status="loading"
    //   })
    //   .addCase(fetchCountry.fulfilled,(curState,action)=>{
    //     curState.data=action.payload
    //     curState.status="idle"
    //   })
    //   .addCase(fetchCountry.rejected, (curState,action)=>{
    //     curState.status="error";
    //     // curState.error=action.error.message
    //     curState.error="there was a problem getting your address. Make sure to fill this field"
    //   })

    //   .addCase(fetchAllCounties.pending,(curState,action)=>{
    //     curState.status="loading"
    //   })
    //   .addCase(fetchAllCounties.fulfilled,(curState,action)=>{
    //     curState.countries=action.payload
    //     curState.status="idle"
    //   })
    //   .addCase(fetchAllCounties.rejected, (curState,action)=>{
    //     curState.status="error";
    //     // curState.error=action.error.message
    //     curState.error="there was a problem getting your address. Make sure to fill this field"
    //   }),
})

export const {addPosition}= mapSlice.actions;
 
export default mapSlice.reducer


