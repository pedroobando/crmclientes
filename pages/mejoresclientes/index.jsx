import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';

const MEJORES_CLIENTES = gql`
  query mejoresClientes {
    mejoresClientes {
      total
      cliente {
        nombreCompleto
      }
    }
  }
`;

const index = () => {
  const {
    loading: mejoresClientesLoading,
    error: mejoresClientesError,
    startPolling,
    stopPolling,
    data,
  } = useQuery(MEJORES_CLIENTES);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (mejoresClientesLoading) return <Spinner />;
  if (mejoresClientesError) return <h1>Problemas la llamada al origen de datos.</h1>;

  const { mejoresClientes } = data;
  const clientesGrafica = [];

  mejoresClientes.map((cliente, idx) => {
    clientesGrafica[idx] = { ...cliente.cliente[0], total: cliente.total };
  });

  return (
    <Layout>
      <div className="flex justify-between">
        <h1 className="text-2xl text-gray-800 font-light">Mejores Clientes</h1>

        <Link href="/">
          <button className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 shadow-md text-white">
            Retornar
          </button>
        </Link>
      </div>

      <ResponsiveContainer className="mt-10" width="100%" height="80%">
        <BarChart
          width={500}
          height={500}
          data={clientesGrafica}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombreCompleto" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#3182CE" />
        </BarChart>
      </ResponsiveContainer>
    </Layout>
  );
};

export default index;
