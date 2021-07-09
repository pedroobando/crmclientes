import Layout from '../../components/Layout';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const NUEVO_PRODUCTO = gql`
  mutation nuevoProducto($input: ProductoInput) {
    nuevoProducto(input: $input) {
      id
      nombre
      existencia
      precio
    }
  }
`;

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      existencia
      precio
    }
  }
`;

const nuevo = () => {
  const router = useRouter();
  const [nuevoProducto, { loading: nuevoProductoLoading, error: nuevoProductoError }] =
    useMutation(NUEVO_PRODUCTO, {
      update: (cache, { data: { nuevoProducto } }) => {
        const { obtenerProductos } = cache.readQuery({
          query: OBTENER_PRODUCTOS,
        });
        cache.writeQuery({
          query: OBTENER_PRODUCTOS,
          data: { obtenerProductos: [...obtenerProductos, nuevoProducto] },
        });
      },
    });

  const formik = useFormik({
    initialValues: {
      nombre: '',
      existencia: '',
      precio: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required('El nombre del producto es requerido')
        .min(5, 'Minimo 5 caracteres'),
      existencia: Yup.number()
        .required('La existencia del producto es requerida')
        .integer('La existencia no debe contener valores decimales.'),
      precio: Yup.number()
        .required('El precio del producto es requerido')
        .positive('El precio del producto no debe ser numero negativo'),
    }),
    onSubmit: async (values) => {
      const { nombre, precio, existencia } = values;

      try {
        const { data } = await nuevoProducto({
          variables: {
            'input': {
              nombre,
              precio,
              existencia,
            },
          },
        });
        Swal.fire(
          'Ingresado',
          `El producto ${nombre}, se ingreso correctamente`,
          'success'
        );
        router.push('/productos');
      } catch (error) {
        const { message } = error;
        Swal.fire('Error', message, 'error');
      }
    },
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Producto</h1>
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
                placeholder="Nombre del producto"
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
                htmlFor="existencia"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Existencia
              </label>

              <input
                className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                id="existencia"
                type="number"
                placeholder="Existencia del producto"
                value={formik.values.existencia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.existencia && formik.errors.existencia && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="text-sm">{formik.errors.existencia}</p>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="precio"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Precio
              </label>

              <input
                className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:shadow-outline"
                id="precio"
                type="number"
                placeholder="Precio del producto"
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.precio && formik.errors.precio && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="text-sm">{formik.errors.precio}</p>
                </div>
              )}
            </div>

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
              value="Registrar Producto"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default nuevo;
