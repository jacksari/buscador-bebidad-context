import React,{ useContext, useState } from 'react';
import {CategoriasContext} from "../context/CategoriasContext";
import {RecetasContext} from "../context/RecetasContext";

function Formulario() {

    //Context categorias
    const { categorias } = useContext(CategoriasContext)

    //Recetas context
    const { guardarBusqueda, setConsultar } = useContext(RecetasContext)

    const [busqueda, setBusqueda] = useState({
        nombre: '',
        categoria: ''
    });
    

    //funcion para leer los contenidos
    const obtenerDatosReceta = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }
    const mensaje = () =>(
        <span className="bg-danger px-0 px-md-5 py-0  py-md-2 text-white rounded font-weight-normal">Debe completar el formulario</span>
    )


    return (
        <form
            className="col-12"
            onSubmit={e => {
                e.preventDefault()
                if(busqueda.nombre && busqueda.categoria){
                    guardarBusqueda(busqueda)
                    setConsultar(true)
                }

            }}
        >
            <fieldset className="text-center">
                {
                    busqueda.nombre && busqueda.categoria ? null:(
                        mensaje()
                    )
                }
                <legend>Bebidas por categoría</legend>
                <div className="row mt-4">
                    <div className="col-md-4">
                        <input
                            type="text"
                            name="nombre"
                            className="form-control"
                            placeholder="Buscar por ingrediente"
                            onChange={obtenerDatosReceta}
                        />
                    </div>
                    <div className="col-md-4">
                        <select
                            name="categoria"
                            id="categoria"
                            className="form-control"
                            onChange={obtenerDatosReceta}
                        >
                            <option value="">-- Seleccionar categoría --</option>
                            {
                                categorias.map((categoria,index) => (
                                    <option key={index} value={categoria.strCategory}>{categoria.strCategory}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="col-md-4">
                        <input
                            type="submit"
                            className="btn btn-block btn-primary"
                            value="Busca Bebidas"
                        />
                    </div>
                </div>

            </fieldset>
        </form>
    );
}

export default Formulario;