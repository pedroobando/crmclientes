import Layout from '../components/Layout';
import { gql, useQuery } from '@apollo/client';

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      nombre
      apellido
      email
      empresa
      telefono
    }
  }
`;

const index = () => {
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

  // console.log(data);
  // console.log(loading);
  // console.log(error);

  if (loading) return <h1>Cargando...</h1>;

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">Empresa</th>
            <th className="w-1/5 py-2">Email</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.obtenerClientesVendedor.map((cliente, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">
                {cliente.nombre} {cliente.apellido}
              </td>
              <td className="border px-4 py-2">{cliente.empresa}</td>
              <td className="border px-4 py-2">{cliente.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default index;
