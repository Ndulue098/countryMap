import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { searchCountry } from "../services/searchCountry";

import iso from "iso-3166-1";
import { fetchCountryInfo } from "../features/country/countrySlice";
import { useNavigate } from "react-router-dom";
// import { latLng } from "leaflet";
function getCountryBordersName(code) {
    const country = iso.whereAlpha3(code);
    return country ? country.country : "Unknown country";
}

export default function Search() {
    const [fakeName,setFakeName]=useState("")
    const [searchedVal,setSearchedVal]=useState("");
    const [searchedArr,setSearchedArr]=useState([])
    // const [position,setPosition]=useState([])

    const dispatch=useDispatch()
    const navigate=useNavigate()

    // useEffect( function(){ 
    //     const controller=new AbortController();
    //     async function fetchMovies(){
    //       try{
    //         setIsLoading(true)
    //         setError("")
    //         const res= await fetch(`http://www.omdbapi.com/?apikey=${kEY}&s=${query}`,{signal:controller.signal});
            
    //         if(!res.ok){
    //           throw new Error("something went wrong with fetching movies")
    //           //? note this error also breakes the function 
    //         }
        
    //         const data=await res.json()
  
    //         if(data.Response==="False"){
    //           throw new Error("movies not found")
    //         }
  
  
    //         setMovies(data.Search)
    //         setError("");
    //       }catch(err){
    //         if(err.name !=="AbortError"){
    //           setError(err.message)
    //         }
    //       }finally{
    //         setIsLoading(false)
    //       }
    //     }
    //     if(query.length<3){
    //       setMovies([]);
    //       setError("");
    //       return
    //     }
    //     handleCloseMovie()
    //     fetchMovies()  
  
    // },[query])  
    
    useEffect(function(){
        async function search() {
           const data= await searchCountry(searchedVal)
            
        if(data.length>0){
            const dataName=data.map((CountryName)=>({searchedName:CountryName.name.common,code:CountryName.cca3,latLng:CountryName.latlng}))
            setSearchedArr(dataName)
        }
    
        }
        if(searchedVal){
            search()
        } 
    },[searchedVal])


    function handleSearchedVal(e){
        e.preventDefault();
        setSearchedVal(e.target.value)
        setFakeName(e.target.value)        
    }
    function handlehover(name){
        setFakeName(name)        
    }
    
    function handleClear(){
        setFakeName("")
    }

    
    function handleClick(name,code,latLng){
        const [lat,lng]=latLng
        setSearchedVal("")
        setSearchedArr([]) 
        dispatch(fetchCountryInfo(getCountryBordersName(code)))
        navigate(`/map/?lat=${lat||0}&lng=${lng||0}`)
    }
    
    function handleReset(){
        setSearchedVal("")
        setSearchedArr([]) 
    }
    

    return <div className="search">
    <div className="search-con">
      <svg className="search-icon" onClick={handleReset} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#054141" viewBox="0 0 256 256"><path d="M231.38,46.54a12,12,0,0,0-10.29-2.18L161.4,59.28l-60-30a12,12,0,0,0-8.28-.91l-64,16A12,12,0,0,0,20,56V200a12,12,0,0,0,14.91,11.64L94.6,196.72l60,30a12,12,0,0,0,8.28.91l64-16A12,12,0,0,0,236,200V56A12,12,0,0,0,231.38,46.54ZM108,59.42l40,20V196.58l-40-20Zm-64,6,40-10V174.63l-40,10ZM212,190.63l-40,10V81.37l40-10Z"></path></svg>
      <input type="text" value={searchedVal?searchedVal:fakeName} className="search-field" placeholder="search" onChange={(e)=>handleSearchedVal(e)} />
    </div>
    {searchedArr.length>0 &&<div className="founds">
      { searchedArr.map((countryName,i)=><p key={i} onClick={()=>handleClick(countryName.searchedName,countryName.code,countryName.latLng)} onMouseEnter={()=>handlehover(countryName.searchedName)} onMouseLeave={handleClear}>{countryName.searchedName}</p>)}

    </div>}
  </div>
}

