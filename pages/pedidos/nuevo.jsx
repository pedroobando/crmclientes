import Layout from '../../components/Layout';
import AsignarCliente from './AsignarCliente';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const nuevo = () => {
  const router = useRouter();
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>
      <hr />
      <AsignarCliente />
    </Layout>
  );
};

export default nuevo;
