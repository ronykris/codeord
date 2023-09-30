import InscriptionCard from "./InscriptionCard"

const Inscriptions = ({results}) => {
    console.log(results)
    return (
        <div className="grid auto-rows-auto grid-cols-3 gap-12 mx-auto">
            {results.map((result: any) => {                
                <InscriptionCard inscriptionData={result} />
            })}            
        </div>
    )
}

export default Inscriptions