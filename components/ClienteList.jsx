import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';

const ELIMINAR_CLIENTE = gql`
  mutation eliminarCliente($id: ID!) {
    eliminarCliente(id: $id)
  }
`;

const OBTENER_CLIENTES_USUARIO = gql`
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

const ClienteList = ({ cliente }) => {
  const { nombre, apellido, empresa, email, id } = cliente;

  const [eliminarCliente, { loading: clienteLoading, error: clienteError }] = useMutation(
    ELIMINAR_CLIENTE,
    {
      update(cache) {
        const { obtenerClientesVendedor } = cache.readQuery({
          query: OBTENER_CLIENTES_USUARIO,
        });
        cache.writeQuery({
          query: OBTENER_CLIENTES_USUARIO,
          data: {
            obtenerClientesVendedor: obtenerClientesVendedor.filter(
              (clienteActual) => clienteActual.id !== id
            ),
          },
        });
      },
    }
  );
  // , {
  //   update: (cache, { data: { nuevoCliente } }) => {
  //     const { obtenerClientesVendedor } = cache.readQuery({
  //       query: OBTENER_CLIENTES_USUARIO,
  //     });

  //     cache.writeQuery({
  //       query: OBTENER_CLIENTES_USUARIO,
  //       data: {
  //         obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente],
  //       },
  //     });
  //   },
  // });

  const handleEliminarCliente = (id) => {
    Swal.fire({
      title: 'Deseas eliminar este cliente.?',
      text: 'Esta accion no podra revertirse..!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await eliminarCliente({
            variables: {
              id,
            },
          });

          Swal.fire(
            `${data.eliminarCliente}`,
            `El cliente  ${nombre} ${apellido} ha sido eliminado`,
            'success'
          );
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <tr>
      <td className="border px-4 py-2">
        {nombre} {apellido}
      </td>
      <td className="border px-4 py-2">{empresa}</td>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          onClick={() => handleEliminarCliente(id)}
          className="flex justify-center items-center  px-4 py-2 w-full rounded shadow border-2 border-red-500 text-red-500 uppercase text-sm font-bold hover:bg-red-500 hover:text-white"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default ClienteList;
