import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const clientes = [
  { id: 1, nombre: 'Pedro' },
  { id: 2, nombre: 'Jose' },
  { id: 3, nombre: 'Manuel' },
];

const AsignarCliente = () => {
  const [cliente, setCliente] = useState([]);

  useEffect(() => {
    console.log(cliente);
  }, [cliente]);

  const handleSelectCliente = (sabor) => {
    setCliente(sabor);
  };

  return (
    <div>
      <Select
        options={clientes}
        isMulti={true}
        onChange={(option) => handleSelectCliente(option)}
        getOptionValue={(clientes) => clientes.id}
        getOptionLabel={(clientes) => clientes.nombre}
        placeholder="Selecciones el cliente"
        noOptionsMessage={() => 'No hay resultados'}
      />
    </div>
  );
};

export default AsignarCliente;
