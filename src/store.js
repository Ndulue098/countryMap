import {configureStore} from "@reduxjs/toolkit"
import mapReducer from "./features/map/mapSlice"
import countryReducer from "./features/country/countrySlice"
 
const store =configureStore({
    reducer:{
        map:mapReducer,
        country:countryReducer,
    }
})

export default store