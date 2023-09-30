const InscriptionCard = ({inscriptionData}) => {
    console.log(inscriptionData)
    return (
        <div className="flex flex-col items-center justify-center rounded bg-white aspect-square opacity-60 p-10 shadow-2xl">
            <h1 className="text-6xl text-black opacity-60 font-bold capitalize">{inscriptionData.number}</h1>  

        </div>
    )
}

export default InscriptionCard