import { gql, useQuery } from '@apollo/client';

const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
    }
  }
`;

const Header = () => {
  const { data, loading, error } = useQuery(OBTENER_USUARIO);
  console.log(data);
  console.log(loading);
  console.log(error);

  if (loading) return null; // o mensaje de carga
  const { nombre, apellido } = data.obtenerUsuario;

  return (
    <div className="flex justify-between">
      <p className="mr-2">
        Hola: {nombre} {apellido}
      </p>
      <button
        className="bg-transparent border-2 border-blue-400 rounded py-1 px-2 shadow-md font-medium"
        type="button"
      >
        Cerrar Sesion
      </button>
    </div>
  );
};

export default Header;
