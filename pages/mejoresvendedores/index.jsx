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

const MEJORES_VENDEDORES = gql`
  query mejoresVendedores {
    mejoresVendedores {
      total
      vendedor {
        id
        nombre
        apellido
      }
    }
  }
`;

const index = () => {
  const {
    loading: mejoresVendedoresLoading,
    error: mejoresVendedoresError,
    startPolling,
    stopPolling,
    data,
  } = useQuery(MEJORES_VENDEDORES);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (mejoresVendedoresLoading) return <Spinner />;
  if (mejoresVendedoresError) return <h1>Problemas la llamada al origen de datos</h1>;

  const { mejoresVendedores } = data;
  const vendedorsGrafica = [];

  mejoresVendedores.map((vende, idx) => {
    vendedorsGrafica[idx] = { ...vende.vendedor[0], total: vende.total };
  });

  return (
    <Layout>
      <div className="flex justify-between">
        <h1 className="text-2xl text-gray-800 font-light">Mejores Vendedores</h1>

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
          data={vendedorsGrafica}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
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
