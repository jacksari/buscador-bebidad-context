import React, {useContext} from 'react';
import {RecetasContext} from "../context/RecetasContext";
import Receta from "./Receta";

function ListaRecetas() {

    //Recetas context
    const { recetas } = useContext(RecetasContext)
    //console.log(recetas)

    return (
        <div className="mt-5 text-center ">
            <h3 className="mb-5">Se encontraron {recetas.length} recetas</h3>
            <div className="row">
                {
                    recetas.length !== 0 ? (

                        recetas.map((receta,index)=>(
                            <Receta key={index} receta={receta}/>
                        ))

                    ): (
                        <h3 className=" text-danger">Sin recetas por mostrar</h3>
                    )
                }
            </div>

        </div>
    );
}

export default ListaRecetas;