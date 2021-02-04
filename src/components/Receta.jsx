import React, {useContext,useState} from 'react';
import {ModalContext} from "../context/ModalContext";

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Receta({receta}) {

    //Condiguacion del modal de material ui
    const [ modalStyle ] = useState(getModalStyle())
    const [open, setOpen] = useState(false);
    const clases = useStyles()

    const handleOpen = () => {
        setOpen(true)
    }
    const hanfleClose = () => {
        setOpen(false)
    }

    //Context categorias
    const { setIdReceta, setReceta, modalreceta } = useContext(ModalContext)

    const { idDrink, strDrink, strDrinkThumb } = receta

    //Mostrar ingredientes en modal
    const mostrarIngredientes = (receta) => {
        let ingredientes = []
        for(let i = 1; i<16; i++){
            if(receta[`strIngredient${i}`]){
                ingredientes.push(
                    <li key={i}>
                        {receta[`strIngredient${i}`]} - {receta[`strMeasure${i}`]}
                    </li>
                )
            }
        }
        return ingredientes
    }

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h5 className="card-header">{strDrink}</h5>
                <img className="card-img-top" src={strDrinkThumb} alt={strDrink}/>
                <div className="card-body">
                    <button
                        onClick={()=> {
                            setIdReceta(idDrink)
                            handleOpen()
                        }}
                        type="button"
                        className="btn btn-block btn-primary"
                    >
                        Ver receta
                    </button>

                    {
                        modalreceta ? (
                            <Modal
                                open={open}
                                onClose={()=>{
                                    hanfleClose()
                                    setReceta(null)
                                    setIdReceta(null)

                                }}
                            >
                                <div style={modalStyle} className={clases.paper}>
                                    <h4>{modalreceta.strDrink}</h4>
                                    <h5 className="mt-4">Instrucciones</h5>
                                    <p>
                                        {modalreceta.strInstructions}
                                    </p>
                                    <img src={modalreceta.strDrinkThumb} className="img-fluid my-4" alt=""/>
                                    <h3>Ingredientes y cantidades</h3>
                                    <ul>
                                        {
                                            mostrarIngredientes(modalreceta)
                                        }
                                    </ul>
                                </div>
                            </Modal>
                        ) : null
                    }
                </div>
            </div>
        </div>
    );
}

export default Receta;