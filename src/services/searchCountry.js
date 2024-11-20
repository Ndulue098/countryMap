export async function searchCountry(search){
    const controller=new AbortController();
    try{
        const req=await fetch(`https://restcountries.com/v3.1/name/${search}`,{signal:controller.signal})
        const data=await req.json();
        if (!data) throw new Error("there was no country found");
        return data 
    }catch(err){
        throw new Error(err.message)
    }

}

