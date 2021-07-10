import { useContext } from 'react';
import Layout from '../../components/Layout';
import AsignarCliente from './AsignarCliente';
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

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>
      <hr />
      <AsignarCliente />
    </Layout>
  );
};

export default nuevo;
