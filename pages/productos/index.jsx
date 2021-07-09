import { gql, useQuery } from '@apollo/client';

import Link from 'next/link';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
import ProductoItem from './ProductoItem';

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

const index = () => {
  const {
    loading: obtenerProductosLoading,
    error: obtenerProductosError,
    data,
  } = useQuery(OBTENER_PRODUCTOS);

  if (obtenerProductosLoading) return <Spinner />;
  if (obtenerProductosError) return <h1>Problemas la llamada al origen de datos</h1>;
  // console.log(data);
  // console.log(obtenerProductosLoading);
  // console.log(obtenerProductosError);

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Productos</h1>
      <Link href="/productos/nuevo">
        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase text-bold">
          Nuevo producto
        </a>
      </Link>

      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">Existencia</th>
            <th className="w-1/5 py-2">Precio</th>
            <th className="w-1/5 py-2"></th>
            <th className="w-1/5 py-2"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.obtenerProductos.map((producto, idx) => (
            <ProductoItem producto={producto} key={idx} />
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default index;
