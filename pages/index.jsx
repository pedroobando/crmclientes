import Layout from '../components/Layout';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ClienteItem from '../components/ClienteItem';
import Spinner from '../components/Spinner';

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

const index = () => {
  const router = useRouter();
  const {
    data,
    loading: obtenerClientesLoading,
    error: obtenerClientesError,
  } = useQuery(OBTENER_CLIENTES_USUARIO);

  if (obtenerClientesLoading) return <Spinner loading={obtenerClientesLoading} />;
  if (obtenerClientesError) return <h1>Problemas la llamada al origen de datos</h1>;
  // console.log(data);
  // console.log(obtenerClientesLoading);
  // console.log(obtenerClientesError);

  if (!data.obtenerClientesVendedor) return router.push('/login');

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
      <Link href="/nuevocliente">
        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase text-bold">
          Nuevo Cliente
        </a>
      </Link>
      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Nombre y Apellido</th>
            <th className="w-1/5 py-2">Empresa</th>
            <th className="w-1/5 py-2">Email</th>
            <th className="w-1/5 py-2"></th>
            <th className="w-1/5 py-2"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.obtenerClientesVendedor.map((cliente, idx) => (
            <ClienteItem cliente={cliente} key={idx} />
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default index;
