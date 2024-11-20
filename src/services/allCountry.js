export async function allCountry() {
    try{
        const req=await fetch(`https://restcountries.com/v3.1/all`)
        const data=await req.json();
        if (!data) throw new Error("there was no country found");
        return data
    }catch(err){
        throw new Error(err.message)
    }

}
