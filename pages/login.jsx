import { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const Login = () => {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(null);
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El email no es valido')
        .required('El email es requerido'),
      password: Yup.string().required('El password es obligatorio'),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email,
              password,
            },
          },
        });

        setShowMessage('Autendicando...');
        const { token } = data.autenticarUsuario;
        localStorage.setItem('token', token);
        router.push('/');

        // console.log(data.autenticarUsuario.token);
      } catch (error) {
        const { message } = error;
        setShowMessage(message);
        setTimeout(() => {
          setShowMessage(null);
        }, 3000);
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto rounded">
        <p>{showMessage}</p>
      </div>
    );
  };

  return (
    <Layout>
      {showMessage && mostrarMensaje()}
      <h1 className="text-center text-white text-2xl font-light">Login</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
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

            <input
              type="submit"
              className="bg-gray-800 w-full rounded mt-5 p-2 text-white uppercase hover:bg-gray-900"
              value="Iniciar Sesion"
            />
            <button
              onClick={() => routes.push('/nuevacuenta')}
              className="bg-transparent border-2 border-gray-800 rounded w-full mt-5 p-2 text-gray-800 uppercase shadows-md hover:bg-gray-900 hover:text-white"
            >
              Crear Usuario
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
