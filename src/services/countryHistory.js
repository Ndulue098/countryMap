export async function countryHistory(name) {
    try{
        const res = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${name}`
        );
        const data = await res.json();
        if (!data) throw new Error("No History about this country found");
        return data
    }catch(err){
        throw new Error(err.message)
    }

}



