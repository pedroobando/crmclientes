import React, { useContext } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';
import ProductoResumen from './ProductoResumen';

const ResumenPedido = () => {
  const pedidoContext = useContext(PedidoContext);
  const { productos } = pedidoContext;
  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        3.- Ajusta las cantidades de producto.
      </p>

      {productos.length > 0 ? (
        productos.map((producto, indx) => (
          <ProductoResumen key={indx} producto={producto} />
        ))
      ) : (
        <p>Sin seleccion de productos</p>
      )}
    </>
  );
};

export default ResumenPedido;
