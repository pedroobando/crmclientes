import { useRouter } from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { gql, useQuery, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

import Layout from '../../components/Layout';

const OBTENER_CLIENTE = gql`
  query obtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
      id
      nombre
      apellido
      email
      empresa
      telefono
    }
  }
`;

const ACTUALIZAR_CLIENTE = gql`
  mutation actualizarCliente($id: ID!, $input: ClienteInput) {
    actualizarCliente(id: $id, input: $input) {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const EditarCliente = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const {
    data,
    loading: obtenerClienteLoading,
    error: obtenerClienteError,
  } = useQuery(OBTENER_CLIENTE, { variables: { id } });

  const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE);

  const schemaValidacion = Yup.object({
    nombre: Yup.string().required('El nombre es requerido').min(5, 'Minimo 5 caracteres'),
    apellido: Yup.string()
      .required('El apellido es requerido')
      .min(5, 'Minimo 5 caracteres'),
    empresa: Yup.string().required('La empresa es requerida'),
    email: Yup.string().email('El email no es valido').required('El email es requerido'),
  });

  const handleSubmit = async (values) => {
    const { nombre, apellido, empresa, email, telefono } = values;

    try {
      const { data } = await actualizarCliente({
        variables: {
          id,
          input: {
            nombre,
            apellido,
            empresa,
            email,
            telefono,
          },
        },
      });

      // console.log(data);

      Swal.fire('Actualizado', 'El cliente se actualizo correctamente', 'success');

      router.push('/');
    } catch (error) {
      const { message } = error;
      Swal.fire('Error', message, 'error');
    }
  };

  if (obtenerClienteLoading) return <h1>Loading...</h1>;

  const { obtenerCliente } = data;

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidacion}
            enableReinitialize
            initialValues={obtenerCliente}
            onSubmit={handleSubmit}
          >
            {(props) => {
              // console.log(props);
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
                >
                  <div className="mb-6">
                    <label
                      htmlFor="nombre"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Nombre
                    </label>

                    <input
                      className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                      id="nombre"
                      type="text"
                      placeholder="Nombre del cliente"
                      value={props.values.nombre}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.touched.nombre && props.errors.nombre && (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="text-sm">{props.errors.nombre}</p>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="apellido"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Apellido
                    </label>

                    <input
                      className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                      id="apellido"
                      type="text"
                      placeholder="Apellido del cliente"
                      value={props.values.apellido}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.touched.apellido && props.errors.apellido && (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="text-sm">{props.errors.apellido}</p>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="empresa"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Empresa
                    </label>

                    <input
                      className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                      id="empresa"
                      type="text"
                      placeholder="Empresa laborable"
                      value={props.values.empresa}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.touched.empresa && props.errors.empresa && (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="text-sm">{props.errors.empresa}</p>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Email
                    </label>

                    <input
                      className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email Usuario"
                      value={props.values.email}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.touched.email && props.errors.email && (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="text-sm">{props.errors.email}</p>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="telefono"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Telefono
                    </label>

                    <input
                      className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                      id="telefono"
                      type="text"
                      placeholder="(000)-0000000"
                      value={props.values.telefono}
                      onChange={props.handleChange}
                    />
                  </div>

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                    value="Editar Cliente"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditarCliente;
