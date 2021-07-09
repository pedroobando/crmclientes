import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const ELIMINAR_PRODUCTO = gql`
  mutation eliminarProducto($id: ID!) {
    eliminarProducto(id: $id)
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

const ProductoItem = ({ producto }) => {
  const router = useRouter();
  const { id, nombre, precio, existencia } = producto;
  const [
    eliminarProducto,
    { loading: eliminarProductoLoading, error: eliminarProductoError },
  ] = useMutation(ELIMINAR_PRODUCTO, {
    update(cache) {
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS,
      });
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: obtenerProductos.filter(
            (productoActual) => productoActual.id !== id
          ),
        },
      });
    },
  });

  const handleEliminarProducto = () => {
    Swal.fire({
      title: `Deseas eliminar - ${nombre}.?`,
      text: 'Esta accion no podra revertirse..!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await eliminarProducto({
            variables: {
              id,
            },
          });

          Swal.fire(
            `${data.eliminarProducto}`,
            `El producto ${nombre} fue eliminado`,
            'success'
          );
        } catch (error) {
          console.log(error);
          const { message } = error;
          Swal.fire('Error', `${message}`, 'error');
        }
      }
    });
  };

  const handleEditarProducto = () => {
    router.push({
      pathname: '/productos/editar/[id]',
      query: { id },
    });
  };

  return (
    <tr>
      <td className="border px-4 py-2">{nombre}</td>
      <td className="border px-4 py-2 text-right">{existencia}</td>
      <td className="border px-4 py-2 text-right">{precio}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          onClick={handleEditarProducto}
          className="flex justify-center items-center  px-4 py-2 w-full rounded shadow border-2 border-green-500 text-green-500 uppercase text-sm font-bold hover:bg-green-500 hover:text-white"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            ></path>
          </svg>
          Modificar
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
          onClick={handleEliminarProducto}
          className="flex justify-center items-center  px-4 py-2 w-full rounded shadow border-2 border-red-500 text-red-500 uppercase text-sm font-bold hover:bg-red-500 hover:text-white"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default ProductoItem;
