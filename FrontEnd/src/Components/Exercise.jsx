export default function Exercise({name , reps, load}){
    return(
        <>
        <div className="exerciseContainer" >
        <h3>{name}</h3>
        <hr />
        <p>Reps : {reps}</p>
        <p>Load : {load}</p>
        </div>
        </>
    )
}