import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getCountry } from "../../services/countryFromPosition"
import { countryHistory } from "../../services/CountryHistory"
import { searchCountry } from "../../services/searchCountry"
import { act } from "react"


const initialState={
    countryName:"",
    status:"idle", 
    error:"",  
    countryValue:"",
    countryData:[],
    borders:[],
    flag:"",
    history:"",
    countrylatLng:""
}
export const fetchCountryName=createAsyncThunk("country/getCountry",async ({lat,lng},{getState,rejectWithValue})=>{
    try{
        if(!lat || !lng){
            return
        }
        const data=await getCountry(lat,lng)  
        const [countryName]=data;
       
        if(!countryName.country){
            throw new Error("click on a country!!!")
        }
    
        const countryCode=countryName.country_code 
        const countryValue=countryName.country
        return {countryCode,countryValue}
    
    }catch(err){
        return rejectWithValue(err.message);
    }
})

export const fetchCountryInfo=createAsyncThunk("country/getCountryInfo",async (name,{getState})=>{  
    const [countryInfo]=await searchCountry(name)  
    return countryInfo; 
})

export const fetchHistory=createAsyncThunk("country/getHistory",async(name,_)=>{
   const history=await countryHistory(name)
   return history
})


const countrySlice=createSlice({
    name:"country",
    initialState,
    reducers:{
        setCountryName(curState,action){
            curState.countryName=action.payload
       }
    },
    extraReducers:(builder)=>builder.addCase(fetchCountryName.pending,(curState,action)=>{
        curState.status="loading"
    })
    .addCase(fetchCountryName.fulfilled,(curState,action)=>{
        
        curState.countryName=action.payload.countryCode
        curState.countryValue=action.payload.countryValue
        curState.status="idle"
    })
    .addCase(fetchCountryName.rejected, (curState,action)=>{

        
        curState.status="error";
        // curState.error=action.payload
        curState.error="please click on a country to see its details "
    })
    

    .addCase(fetchCountryInfo.pending,(curState,action)=>{
        curState.status="loading"
    })
    .addCase(fetchCountryInfo.fulfilled,(curState,action)=>{
        
        // curState.countryInfo=curCountry
        const {continents,capital,currencies,languages,population,name,region,subregion,}=action.payload
        const [continent]=continents
        const [capita]=capital
        const [currencie]=Object.values(currencies)
        const [lang]=Object.values(languages)
        const curCountryName=name.common

        curState.countryData=[
                {name:"Native Name",value:curCountryName,id:6}, 
                {name:"continent",value:continent,id:1},
                {name:"Capital",value:capita,id:2},
                {name:"Currencies",value:currencie.name,id:3}, 
                {name:"Language",value:lang,id:4},
                {name:"Population",value:population,id:5},
                {name:"region",value:region,id:7},
                {name:"Sub Region",value:subregion,id:8},
        ]
        curState.countryValue=curCountryName
        curState.flag=action.payload.flags.svg
        curState.borders=action.payload.borders||[]
        curState.countrylatLng=action.payload.latlng;
        
        curState.status="idle"
    })
    .addCase(fetchCountryInfo.rejected, (curState,action)=>{
        curState.status="error";
        // curState.error=action.error.message
        curState.error="there was a problem getting your address. Make sure to fill this field"
    })


    //!this is for the history
    .addCase(fetchHistory.pending,(curState,action)=>{
        curState.status="loading"
    })
    .addCase(fetchHistory.fulfilled,(curState,action)=>{

        curState.history=action.payload.extract
        curState.status="idle"
    })
    .addCase(fetchHistory.rejected, (curState,action)=>{
        curState.status="error";
        // curState.error=action.error.message
        curState.error="there was a problem getting your address. Make sure to fill this field"
    })
})
export const {setCountryName}=countrySlice.actions
export default countrySlice.reducer