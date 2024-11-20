  // const BASE_URL="https://api.bigdatacloud.net/data/reverse-geocode-client"
  // https://api.positionstack.com/v1/reverse?access_key=87078d136df4692e5f646941c6461ba8&query=40.7638435,-73.9729691

export async function getCountry(lat,lng) {
   
  console.log(`am checing for errror in ${lat} and ${lng}`);
  
  try {
    // const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
    const res = await fetch(`https://api.positionstack.com/v1/reverse?access_key=87078d136df4692e5f646941c6461ba8&query=${lat},${lng}`);
    const {data} = await res.json();

    const [countryName]=data
    if(!countryName.country){
      // return {type:"error",value:"click on a country!!!"}
      throw new Error("click on a country!!!")
    }
    // console.log(data);
    
    if (!data) throw new Error("there was no country found");

    return data
  } catch (err) {
    console.log("error form the country"+err.message);
  }
}
