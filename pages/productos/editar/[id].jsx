import { useRouter } from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import Layout from '../../../components/Layout';
import Spinner from '../../../components/Spinner';
import { gql, useQuery, useMutation } from '@apollo/client';

const OBTENER_PRODUCTO = gql`
  query obtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
      id
      nombre
      precio
      existencia
    }
  }
`;

const ACTUALIZAR_PRODUCTO = gql`
  mutation actualizarProducto($id: ID!, $input: ProductoInput) {
    actualizarProducto(id: $id, input: $input) {
      id
      nombre
      precio
      existencia
    }
  }
`;

const EditarProducto = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const {
    data,
    loading: obtenerProductoLoading,
    error: obtenerProductoError,
  } = useQuery(OBTENER_PRODUCTO, { variables: { id } });

  const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO);

  // , {
  //   update: (cache, { data: { productoActual } }) => {
  //     let { obtenerProductos } = cache.readQuery({
  //       query: OBTENER_PRODUCTOS,
  //     });
  //     obtenerProductos = obtenerProductos.filter((elProducto) => elProducto.id !== id);
  //     cache.writeQuery({
  //       query: OBTENER_PRODUCTOS,
  //       data: { obtenerProductos: [...obtenerProductos, productoActual] },
  //     });
  //   },
  // });

  const schemaValidacion = Yup.object({
    nombre: Yup.string()
      .required('El nombre del producto es requerido')
      .min(5, 'Minimo 5 caracteres'),
    existencia: Yup.number()
      .required('La existencia del producto es requerida')
      .integer('La existencia no debe contener valores decimales.'),
    precio: Yup.number()
      .required('El precio del producto es requerido')
      .positive('El precio del producto no debe ser numero negativo'),
  });

  const handleSubmit = async (values) => {
    try {
      const { nombre, precio, existencia } = values;
      const { data } = await actualizarProducto({
        variables: {
          id,
          input: {
            nombre,
            precio,
            existencia,
          },
        },
      });

      Swal.fire(
        'Actualizado',
        `El producto ${nombre} se actualizo correctamente`,
        'success'
      );
      router.push('/productos');
    } catch (error) {
      const { message } = error;
      Swal.fire('Error', message, 'error');
    }
  };

  if (obtenerProductoLoading) return <Spinner />;
  if (obtenerProductoError) return <h1>Problemas la llamada al origen de datos</h1>;

  const { obtenerProducto } = data;
  // console.log(data);

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Producto</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidacion}
            enableReinitialize
            initialValues={obtenerProducto}
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
                      placeholder="Nombre del producto"
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
                      value={props.values.existencia}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.touched.existencia && props.errors.existencia && (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="text-sm">{props.errors.existencia}</p>
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
                      value={props.values.precio}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.touched.precio && props.errors.precio && (
                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="text-sm">{props.errors.precio}</p>
                      </div>
                    )}
                  </div>

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                    value="Editar producto"
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

export default EditarProducto;
