import React,{createContext,useEffect,useState} from 'react';
import axios from "axios";

export const ModalContext = createContext()

function ModalProvider({children}) {

    const [idReceta, setIdReceta] = useState(null);

    const [receta, setReceta] = useState({});

    //Una vez que tenemos un id
    useEffect(() => {
        const obtenerReceta = async () => {
            if(!idReceta) return

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`
            const receta = await axios.get(url)
            setReceta(receta.data.drinks[0])
        }
        obtenerReceta()
    }, [idReceta]);


    return (
        <ModalContext.Provider
        value={{
            setIdReceta,
            setReceta,
            modalreceta:receta
        }}
        >
            {children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;