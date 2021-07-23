import React, { useEffect, useState, useContext } from 'react';
import Spinner from '../../components/Spinner';
import { gql, useQuery } from '@apollo/client';
import Select from 'react-select';
import PedidoContext from '../../context/pedidos/PedidoContext';

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      existencia
      precio
    }
  }
`;

const AsignarProducto = () => {
  const [producto, setProducto] = useState([]);

  const pedidoContext = useContext(PedidoContext);
  const { asignarProductos, actualizarTotal } = pedidoContext;

  const {
    data,
    loading: obtenerProductosLoading,
    error: obtenerProductosError,
  } = useQuery(OBTENER_PRODUCTOS);

  useEffect(() => {
    asignarProductos(producto);
    actualizarTotal();
    // console.log(producto);
  }, [producto]);

  if (obtenerProductosLoading) return <Spinner loading={obtenerProductosLoading} />;
  if (obtenerProductosError) return <h1>Problemas la llamada al origen de datos</h1>;
  // console.log(data);
  // console.log(obtenerClientesLoading);
  // console.log(obtenerClientesError);

  // if (!data.obtenerClientesVendedor) return router.push('/login');

  const handleSelectProducto = (producto) => {
    setProducto(producto);
  };

  const { obtenerProductos } = data;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        2.- Seleccionar o buscar un producto.
      </p>
      <Select
        className="mt-2"
        options={obtenerProductos}
        isMulti={true}
        onChange={(option) => handleSelectProducto(option)}
        getOptionValue={(productos) => productos.id}
        getOptionLabel={(productos) =>
          `${productos.nombre}   |   ${productos.existencia} Disponibles`
        }
        placeholder="Selecciones productos"
        noOptionsMessage={() => 'No hay resultados'}
      />
    </>
  );
};

export default AsignarProducto;
