import { useContext, useEffect } from 'react';
import Layout from '../../components/Layout';
import AsignarCliente from './AsignarCliente';
import AsignarProducto from './AsignarProducto';
import ResumenPedido from './ResumenPedido';
import PedidoTotal from './PedidoTotal';

import PedidoContext from '../../context/pedidos/PedidoContext';

import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import Swal from 'sweetalert2';

const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput!) {
    nuevoPedido(input: $input) {
      id
    }
  }
`;

const OBTENER_PEDIDOS = gql`
  query obtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
      total
      estado
      vendedor
      cliente {
        id
        email
        telefono
        nombreCompleto
      }
      pedido {
        id
        cantidad
        nombre
        precio
      }
    }
  }
`;

const nuevo = () => {
  const router = useRouter();

  const pedidoContext = useContext(PedidoContext);
  const { cliente, total, productos } = pedidoContext;

  const [nuevoPedido, { loading: nuevoPedidoLoading, error: nuevoPedidoError }] =
    useMutation(NUEVO_PEDIDO, {
      update: (cache, { data: { nuevoPedido } }) => {
        const { obtenerPedidosVendedor } = cache.readQuery({
          query: OBTENER_PEDIDOS,
        });
        cache.writeQuery({
          query: OBTENER_PEDIDOS,
          data: { obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido] },
        });
      },
    });

  const validadPedido = () => {
    return !productos.every((producto) => producto.cantidad > 0) ||
      total === 0 ||
      cliente.length === 0
      ? ' opacity-50 cursor-not-allowed '
      : '';
  };

  const crearNuevoPedido = async () => {
    const pedido = productos.map((item) => ({
      producto: item.id,
      cantidad: item.cantidad,
      nombre: item.nombre,
      precio: item.precio,
    }));

    // const pedido = productos.map(({ __typename, existencia, ...producto }) => producto);
    // console.log(pedido);
    const { id } = cliente;

    try {
      const { data, errors } = await nuevoPedido({
        variables: {
          input: {
            cliente: id,
            pedido,
          },
        },
      });

      router.push('/pedidos');
      Swal.fire('Correcto', `El pedido se registro correctamente`, 'success');
    } catch (error) {
      // console.log(error);
      const { message } = error;
      Swal.fire('Error', message, 'error');
    }
  };

  if (nuevoPedidoError) {
    <h1>Error</h1>;
  }

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
            onClick={() => crearNuevoPedido()}
          >
            Registrar Pedido
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default nuevo;
