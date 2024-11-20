export default function CountryList({data}){
    return <li>
    <strong>{data.name}:</strong>
    <p>{data.value}</p>
  </li>
}

