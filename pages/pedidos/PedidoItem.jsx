import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import Swal from 'sweetalert2';

const ACTUALIZAR_PEDIDO = gql`
  mutation actualizarPedido($id: ID!, $input: PedidoInput!) {
    actualizarPedido(id: $id, input: $input) {
      id
      estado
    }
  }
`;

const PedidoItem = ({ pedido }) => {
  const {
    id,
    fecha,
    cliente: { nombre, apellido, nombreCompleto, email, telefono },
    cliente,
    total,
    estado,
  } = pedido;
  const [actualizarPedido] = useMutation(ACTUALIZAR_PEDIDO);
  const [estadoPedido, setEstadoPedido] = useState(estado);
  const [clases, setClases] = useState('');

  useEffect(() => {
    if (estadoPedido) {
      // setEstadoPedido(estadoPedido);

      clasePedido(estadoPedido);
    }
  }, [estadoPedido]);

  const clasePedido = () => {
    if (estadoPedido === 'PENDIENTE') {
      setClases('border-yellow-500');
    } else if (estadoPedido === 'COMPLETADO') {
      setClases('border-green-500');
    } else {
      setClases('border-red-800');
    }
    return clases;
  };

  const handleChangeEstadoPedido = async (id, estado, cliente) => {
    setEstadoPedido(estado);
    try {
      const { data } = await actualizarPedido({
        variables: {
          id,
          input: {
            estado,
            cliente,
          },
        },
      });
      Swal.fire('Correcto', `Estado del pedido actualizado`, 'success');
    } catch (error) {
      // console.log(error);
      const { message } = error;
      Swal.fire('Error', message, 'error');
    }
  };

  return (
    <div
      className={`${clases} border-t-4 mt-4 bg-white rounded p-6 shadow-md md:grid md:grid-cols-2 md:gap-4 `}
    >
      <div>
        <p className="font-bold text-gray-800">Cliente: {nombreCompleto}</p>
        {email && (
          <p className="flex items-center my-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            {email}
          </p>
        )}
        {telefono && (
          <p className="flex items-center my-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {telefono}
          </p>
        )}
        <h2 className="text-gray-800 font-bold mt-10">Estado Pedido:</h2>
        <select
          className="mt-2 appearance-none bg-blue-600 border-blue-600 border text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
          value={estadoPedido}
          onChange={(e) => handleChangeEstadoPedido(id, e.target.value, cliente.id)}
        >
          <option value="COMPLETADO">COMPLETADO</option>
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="CANCELADO">CANCELADO</option>
        </select>
      </div>
      <div>
        <h2 className="text-gray-800 font-bold mt-2">Resumen de Pedido</h2>
        {pedido.pedido.map((articulo, idx) => (
          <div className="mt-4" key={idx}>
            <p className="text-sm text-gray-600">Producto: {articulo.nombre}</p>
            <p className="text-sm text-gray-600">Cantidad: {articulo.cantidad}</p>
          </div>
        ))}
        <p className="text-gray-800 mt-3 font-bold">
          Total a pagar: <span className="font-light">$ {total}</span>
        </p>
        <button className="uppercase text-xs font-bold flex items-center mt-4 py-2 bg-red-800 px-5 inline-block text-white rounded leading-tight ">
          Eliminar Pedido
        </button>
      </div>
    </div>
  );
};

export default PedidoItem;
