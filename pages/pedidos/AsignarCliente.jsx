import React, { useEffect, useState, useContext } from 'react';
import Spinner from '../../components/Spinner';
import { gql, useQuery } from '@apollo/client';
import Select from 'react-select';
import PedidoContext from '../../context/pedidos/PedidoContext';

const OBTENER_CLIENTES = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      email
      empresa
      telefono
    }
  }
`;

const AsignarCliente = () => {
  const [cliente, setCliente] = useState([]);

  const pedidoContext = useContext(PedidoContext);
  // console.log(pedidoContext);
  const { asignarCliente } = pedidoContext;

  const {
    data,
    loading: obtenerClientesLoading,
    error: obtenerClientesError,
  } = useQuery(OBTENER_CLIENTES);

  useEffect(() => {
    //console.log(cliente);
    asignarCliente(cliente);
  }, [cliente]);

  if (obtenerClientesLoading) return <Spinner loading={obtenerClientesLoading} />;
  if (obtenerClientesError) return <h1>Problemas la llamada al origen de datos</h1>;
  // console.log(data);
  // console.log(obtenerClientesLoading);
  // console.log(obtenerClientesError);

  // if (!data.obtenerClientesVendedor) return router.push('/login');

  const handleSelectCliente = (sabor) => {
    setCliente(sabor);
  };

  const { obtenerClientesVendedor } = data;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        Asignar un cliente al pedido
      </p>
      <Select
        className="mt-2"
        options={obtenerClientesVendedor}
        isMulti={false}
        onChange={(option) => handleSelectCliente(option)}
        getOptionValue={(clientes) => clientes.id}
        getOptionLabel={(clientes) => `${clientes.nombre} ${clientes.apellido}`}
        placeholder="Selecciones el cliente"
        noOptionsMessage={() => 'No hay resultados'}
      />
    </>
  );
};

export default AsignarCliente;
