import { useEffect,useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const DrugDetailsPage = () => {
    const {drugName} = useParams();
    const [drugDetails, setDrugDetails] = useState(null);
    const [ndcs,setNdcs] =  useState([]);
    const [error,setError] = useState('');

useEffect(() => {
    const fetchDrugDetails = async () => {
        try{
            const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${drugName}`);
            const conceptGroup = response.data.drugGroup.conceptGroup;
            if(conceptGroup && conceptGroup.length > 0 && conceptGroup[0].conceptProperties && conceptGroup[0].conceptProperties.length > 0){
                const drugData = conceptGroup[0].conceptProperties[0];
                setDrugDetails(drugData);
                const ndcResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${drugData.rxcui}/ndcs.json`);
                setNdcs(ndcResponse.data.ndcGroup.ndcList.ndc);

            }else {
                setError("No Drug Details Found");
            }
        }catch (error){
            console.log(error);
            setError("An error Occured while fetching drug details");
            
        }
    };

    fetchDrugDetails();



}, [drugName]);


if(error){
    return <p>{error}</p>;
}
if(!drugDetails){
    return <p>Loading...</p>;
}


    return (
        <div style={{border: '1px solid black', padding: "10px"}}>
            <h1>{drugDetails.name}</h1>
            <p>ID: {drugDetails.rxcui}</p>
            <p>Synonym: {drugDetails.synonym}</p>
            <h2>Associated NDCs:</h2>
            <ul>
                {ndcs.map((ndc,index) => (
                    <li key={index}>{ndc}</li>
                ))}
            </ul>
        </div>
    )
}

export default DrugDetailsPage;