import { useContext } from 'react';
import Layout from '../../components/Layout';
import AsignarCliente from './AsignarCliente';
import AsignarProducto from './AsignarProducto';
import ResumenPedido from './ResumenPedido';
import PedidoTotal from './PedidoTotal';

import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

// Context Pedidos
import PedidoContext from '../../context/pedidos/PedidoContext';

const nuevo = () => {
  const router = useRouter();

  const pedidoContext = useContext(PedidoContext);
  const { cliente, total, productos } = pedidoContext;

  const validadPedido = () => {
    return !productos.every((producto) => producto.cantidad > 0) ||
      total === 0 ||
      cliente.length === 0
      ? ' opacity-50 cursor-not-allowed '
      : '';
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProducto />
          <ResumenPedido />
          <PedidoTotal />

          <button
            type="button"
            className={`bg-gray-700 w-full mt-5 p-2 text-white uppercase font-bold rounded hover:bg-gray-900 ${validadPedido()}`}
          >
            Registrar Pedido
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default nuevo;
