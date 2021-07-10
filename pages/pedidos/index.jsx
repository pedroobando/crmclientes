import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
import PedidoItem from './PedidoItem';

const OBTENER_PEDIDOS = gql`
  query obtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
      total
      cliente
      vendedor
      fecha
      estado
    }
  }
`;

const index = () => {
  const {
    loading: obtenerPedidosLoading,
    error: obtenerPedidosError,
    data,
  } = useQuery(OBTENER_PEDIDOS);

  if (obtenerPedidosLoading) return <Spinner />;
  if (obtenerPedidosError) return <h1>Problemas la llamada al origen de datos</h1>;

  // console.log(data);
  // console.log(obtenerPedidosLoading);
  // console.log(obtenerPedidosError);

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>
      <Link href="/pedidos/nuevo">
        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase text-bold">
          Nuevo pedido
        </a>
      </Link>

      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Fecha</th>
            <th className="w-1/5 py-2">Cliente</th>
            <th className="w-1/5 py-2">Total</th>
            <th className="w-1/5 py-2"></th>
            <th className="w-1/5 py-2"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.obtenerPedidosVendedor.map((pedido, idx) => (
            <PedidoItem pedido={pedido} key={idx} />
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default index;
