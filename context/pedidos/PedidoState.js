import React, { useReducer } from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer';

import {
  CANTIDAD_PRODUCTOS,
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
} from '../../types';

const PedidoState = ({ children }) => {
  const initialState = {
    cliente: {},
    productos: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(PedidoReducer, initialState);

  const asignarCliente = (cliente) => {
    dispatch({
      type: SELECCIONAR_CLIENTE,
      payload: cliente,
    });
  };

  return (
    <PedidoContext.Provider value={{ asignarCliente }}>{children}</PedidoContext.Provider>
  );
};

export default PedidoState;
