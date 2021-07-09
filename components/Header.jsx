import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
  const router = useRouter();

  const { data, loading, error: obtenerUsuarioError } = useQuery(OBTENER_USUARIO);
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  // useEffect(() => {
  //   refetch();
  // }, []);

  const handleCerrarSesion = () => {
    localStorage.removeItem('token');
    router.replace('/login');
  };

  // Proteger que no accesamos a data antes de tener resultados
  if (loading) return <></>;
  if (obtenerUsuarioError) return <h2>Error comunicacion</h2>;
  if (!data.obtenerUsuario) return router.push('/login');
  const { nombre, apellido } = data.obtenerUsuario;

  return (
    <div className="flex justify-between mb-6">
      <p className="mr-2">
        Hola: {nombre} {apellido}
      </p>
      <button
        onClick={handleCerrarSesion}
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 shadow-md text-white"
        type="button"
      >
        Cerrar Sesion
      </button>
    </div>
  );
};

export default Header;
