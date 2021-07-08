import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const NUEVO_CLIENTE = gql`
  mutation nuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
      id
      nombre
      apellido
      empresa
      email
      telefono
    }
  }
`;

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

const nuevocliente = () => {
  const router = useRouter();
  const [nuevoCliente, { loading: nuevoClienteLoading, error: nuevoClienteError }] =
    useMutation(NUEVO_CLIENTE, {
      update: (cache, { data: { nuevoCliente } }) => {
        const { obtenerClientesVendedor } = cache.readQuery({
          query: OBTENER_CLIENTES_USUARIO,
        });

        cache.writeQuery({
          query: OBTENER_CLIENTES_USUARIO,
          data: {
            obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente],
          },
        });
      },
    });

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      empresa: '',
      email: '',
      telefono: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required('El nombre es requerido')
        .min(5, 'Minimo 5 caracteres'),
      apellido: Yup.string()
        .required('El apellido es requerido')
        .min(5, 'Minimo 5 caracteres'),
      empresa: Yup.string().required('La empresa es requerida'),
      email: Yup.string()
        .email('El email no es valido')
        .required('El email es requerido'),
    }),
    onSubmit: async (values) => {
      const { nombre, apellido, empresa, email, telefono } = values;
      try {
        const { data } = await nuevoCliente({
          variables: {
            'input': {
              nombre,
              apellido,
              empresa,
              email,
              telefono,
            },
          },
        });
        Swal.fire(
          'Ingresado',
          `El cliente ${nombre} ${apellido}, se ingreso correctamente`,
          'success'
        );
        router.push('/');
      } catch (error) {
        const { message } = error;
        Swal.fire('Error', message, 'error');
      }
    },
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg" onSubmit={formik.handleSubmit}>
          <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
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
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.nombre && formik.errors.nombre && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="text-sm">{formik.errors.nombre}</p>
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
                value={formik.values.apellido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.apellido && formik.errors.apellido && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="text-sm">{formik.errors.apellido}</p>
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
                value={formik.values.empresa}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.empresa && formik.errors.empresa && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="text-sm">{formik.errors.empresa}</p>
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
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="text-sm">{formik.errors.email}</p>
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
                value={formik.values.telefono}
                onChange={formik.handleChange}
              />
            </div>

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
              value="Registrar Cliente"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default nuevocliente;
