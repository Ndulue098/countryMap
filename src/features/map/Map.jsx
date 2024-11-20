import React, {useEffect, useState } from "react";
import { MapContainer, useMapEvent, useMap, Marker, Popup, TileLayer} from "react-leaflet";
import {useDispatch, useSelector} from "react-redux"
import { addPosition } from "./mapSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import Country from "../country/Country";
import styles from './Map.module.css' 
import Search from "../../components/Search";


export default function Map() {
  const {position}=useSelector(state=>state.map)
  const {countrylatLng,flag}=useSelector(state=>state.country);
  const dispatch=useDispatch();

  return <div className="mapcontainer">
     <Country/>
     {/* {[51.505, -0.09]&&<Country/>} */}

     <MapContainer className="map"
      center={position}
      // center={[51.505, -0.09]}
      minZoom={3}
      maxZoom={9}
      zoom={5}
      scrollWheelZoom={true}
      worldCopyJump={true}
      >
        
         <TileLayer 
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    /> 
        
       <Markers  flag={flag} curPosition={countrylatLng} />
       <DetectClick dispatch={dispatch}/>
       <ChangeCenter position={position}/>
     </MapContainer>
     <Search/>
  </div>
}


function Markers({curPosition,country,flag}){
  return <Marker position={curPosition||[0,0]} className="bg-red-50" >
  <Popup className="custom-popup" style={{margin:"1px"}}>
        <div className="popup-flag-container">
          <img src={flag} alt={`flag`} className="popup-image" />
        </div> 
  </Popup>
</Marker>
}



function DetectClick({dispatch}){
  const navigate=useNavigate()
  useMapEvent({click:(e)=>{    
    navigate(`/map/?lat=${e.latlng.lat||0}&lng=${e.latlng.lng||0}`)
    dispatch(addPosition([e.latlng.lat||0,e.latlng.lng||0]))
    // dispatch(fetchCountry())
  }})
}

function ChangeCenter({position}){
  const map=useMap();
  map.setView(position);
  return null
}