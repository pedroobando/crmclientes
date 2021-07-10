import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';

const gqlNuevaCuenta = gql`
  mutation nuevoUsuario($usuario: UsuarioInput) {
    nuevoUsuario(usuario: $usuario) {
      id
      nombre
      apellido
      email
    }
  }
`;

const NuevaCuenta = () => {
  // Mutation para crear nuevo usuarios
  const [nuevoUsuario] = useMutation(gqlNuevaCuenta);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre del usuario es requerido'),
      apellido: Yup.string().required('El apellido del usuario es requerido'),
      email: Yup.string().email('Email no es valido').required('El email es obligatorio'),
      password: Yup.string().required('El password es obligatorio'),
      confirmPassword: Yup.string()
        .required('El password de confirmacion es requerido')
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),
    }),
    onSubmit: async (values) => {
      const { nombre, apellido, email, password } = values;
      try {
        const { data } = await nuevoUsuario({
          variables: {
            usuario: {
              nombre,
              apellido,
              email,
              password,
            },
          },
        });
        Swal.fire(
          'Usuario Creado',
          `Usuario ${nombre} ${apellido}, se ingreso correctamente`,
          'success'
        );
        router.push('/login');
      } catch (error) {
        const { message } = error;
        setMensaje(message);
        Swal.fire('Error', `${message}`, 'error');
      }
    },
  });

  return (
    <Layout>
      <h1 className="text-center text-white text-2xl font-light">Crear Nueva Cuenta</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
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
                placeholder="Nombre del Usuario"
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
                placeholder="Apellido del Usuario"
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
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>

              <input
                className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email del Usuario"
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
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>

              <input
                className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password Usuario"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="text-sm">{formik.errors.password}</p>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Verificacion Password
              </label>

              <input
                className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="Verificacion del password Usuario"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="text-sm">{formik.errors.confirmPassword}</p>
                </div>
              )}
            </div>

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
              value="Crear Cuenta"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevaCuenta;
