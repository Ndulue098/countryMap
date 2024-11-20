import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchCountryInfo, fetchCountryName, fetchHistory } from "./countrySlice";
import CountryList from "./CountryList";
import iso from "iso-3166-1";
import Borders from "./Borders";
import Loader from "../../components/Loader";
import Error from "../../components/Error";


function getCountryBordersName(code) {
  const country = iso.whereAlpha3(code);
  return country ? country.country : "Unknown country";
}


 
export default function Country() {
  const dispatch=useDispatch()
  
  const [searchParams] =useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  
  const {countryName,countryValue,borders,countryData,flag,history,status,error}=useSelector(state=>state.country)
  

  
 
  useEffect(function(){
    if(lat&&lng){
      dispatch(fetchCountryName({lat,lng})) 
    }
  },[lat,lng,dispatch])       

  useEffect(function(){
    if(countryName){
      
      dispatch(fetchCountryInfo(getCountryBordersName(countryName)))
      dispatch(fetchHistory(countryName))
    }
  },[dispatch,countryName])



const bord=borders.map((border)=>({name:getCountryBordersName(border),borderName:border})) || []


  

  if(status==="error"){
    return <Error message={error}/> 
  }
  return <div className={`countryinfo ${lat&&lng ?"": "animation"}`}>
        {status==="loading"?<Loader/>:<>
          <div className="countryinfo">
        <h1 className="s-h">
          where in the world?
        <span>
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"><path d="M228.92,49.69a8,8,0,0,0-6.86-1.45L160.93,63.52,99.58,32.84a8,8,0,0,0-5.52-.6l-64,16A8,8,0,0,0,24,56V200a8,8,0,0,0,9.94,7.76l61.13-15.28,61.35,30.68A8.15,8.15,0,0,0,160,224a8,8,0,0,0,1.94-.24l64-16A8,8,0,0,0,232,200V56A8,8,0,0,0,228.92,49.69ZM104,52.94l48,24V203.06l-48-24ZM40,62.25l48-12v127.5l-48,12Zm176,131.5-48,12V78.25l48-12Z"></path></svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#f7f6f1" viewBox="0 0 256 256"><path d="M124,175a8,8,0,0,0,7.94,0c2.45-1.41,60-35,60-94.95A64,64,0,0,0,64,80C64,140,121.58,173.54,124,175ZM128,56a24,24,0,1,1-24,24A24,24,0,0,1,128,56ZM240,184c0,31.18-57.71,48-112,48S16,215.18,16,184c0-14.59,13.22-27.51,37.23-36.37a8,8,0,0,1,5.54,15C42.26,168.74,32,176.92,32,184c0,13.36,36.52,32,96,32s96-18.64,96-32c0-7.08-10.26-15.26-26.77-21.36a8,8,0,0,1,5.54-15C226.78,156.49,240,169.41,240,184Z"></path></svg>
          </span>
        </h1>

        <div className="country-info">
          <h2 className="country-name">{countryValue}</h2>
          <div className="img-con">
            {status==="loading"?"loading":<img
              className="s-img"
              src={`${flag}`}
              alt="flag"
            />}
          </div>

          <ul className="about">
            {countryData.length>0 && countryData.map((data)=><CountryList data={data}  key={data.id}/>)}
          </ul> 

          <div className="history-con">
            <h2>History</h2>
            <div className="country-history">
            <p>{history}</p>
            </div>
          </div>

          <div className="border-con">
           {bord.length>0 ?<>
            <h3>Border Countries:</h3>
            <div className="border">
              {borders.length>0 && bord.map((border,i)=><Borders border={border.name} countrycode={border.borderName} key={i}/>)}
            </div>
           </> :<h3>no border country</h3>} 
          </div>
        </div>
      </div>
        </>}
  </div>;
}


