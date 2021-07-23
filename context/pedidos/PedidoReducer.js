import {
  CANTIDAD_PRODUCTOS,
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  ACTUALIZAR_TOTAL,
} from '../../types';

const actualizarTotal = (productos) => {
  let retTotal = 0;
  if (productos.length > 0)
    retTotal = productos.reduce(
      (nuevoTotal, articulo) => (nuevoTotal += articulo.precio * articulo.cantidad),
      0
    );
  return retTotal;
};

const PedidoReducer = (state, { type, payload }) => {
  switch (type) {
    case SELECCIONAR_CLIENTE:
      return {
        ...state,
        cliente: payload,
      };

    case SELECCIONAR_PRODUCTO:
      return {
        ...state,
        productos: [...payload],
        // total: actualizarTotal([...payload]),
      };

    case CANTIDAD_PRODUCTOS:
      return {
        ...state,
        productos: state.productos.map((producto) =>
          producto.id === payload.id ? (producto = payload) : producto
        ),
      };

    case ACTUALIZAR_TOTAL:
      return {
        ...state,
        total: actualizarTotal(state.productos),
        // total: state.productos.reduce(
        //   (nuevoTotal, articulo) => (nuevoTotal += articulo.precio * articulo.cantidad),
        //   0
        // ),
      };

    default:
      return state;
  }
};

export default PedidoReducer;
