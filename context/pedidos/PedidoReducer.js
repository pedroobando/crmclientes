import {
  CANTIDAD_PRODUCTOS,
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
} from '../../types';

export default (state, { type, payload }) => {
  switch (type) {
    case SELECCIONAR_CLIENTE:
      return {
        ...state,
        cliente: payload,
      };

    default:
      return state;
  }
};
