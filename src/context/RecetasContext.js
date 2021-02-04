import React, {createContext, useEffect, useState} from 'react'
import axios from "axios";

export const RecetasContext = createContext()

const RecetasProvider = ({children}) =>{

    const [busqueda, guardarBusqueda] = useState({
        nombre: '',
        categoria: ''
    });
    const [recetas, setRecetas] = useState([]);

    const [consultar, setConsultar] = useState(false);

    useEffect(() => {
        if(consultar){
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${busqueda.nombre}&c=${busqueda.categoria}`
                const recetas = await axios.get(url)
                //console.log(recetas)
                setRecetas(recetas.data.drinks)
            }
            obtenerRecetas()
        }

    }, [busqueda,consultar]);

    return(
        <RecetasContext.Provider
            value={{
                guardarBusqueda,
                setConsultar,
                recetas
            }}
        >
            {children}
        </RecetasContext.Provider>
    )
}

export default RecetasProvider
