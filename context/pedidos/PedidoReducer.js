import {
  CANTIDAD_PRODUCTOS,
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  ACTUALIZAR_TOTAL,
} from '../../types';

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
        total: state.productos.reduce(
          (nuevoTotal, articulo) => (nuevoTotal += articulo.precio * articulo.cantidad),
          0
        ),
      };

    default:
      return state;
  }
};

export default PedidoReducer;
