import React from 'react';

const PedidoItem = ({ pedido }) => {
  const { fecha, cliente, total } = pedido;
  return (
    <tr>
      <td className="border px-4 py-2">{fecha}</td>
      <td className="border px-4 py-2 text-right">{cliente}</td>
      <td className="border px-4 py-2 text-right">{total}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          onClick={() => console.log('undate')}
          className="flex justify-center items-center  px-4 py-2 w-full rounded shadow border-2 border-green-500 text-green-500 uppercase text-sm font-bold hover:bg-green-500 hover:text-white"
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            ></path>
          </svg>
          Modificar
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
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

export default PedidoItem;
