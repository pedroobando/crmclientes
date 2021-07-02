import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        {/* <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        /> */}
        <title>CRM - Administracion de Clientes</title>
      </Head>

      {router.pathname === '/login' || router.pathname === '/nuevacuenta' ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
          <div>{children}</div>
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">{children}</main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
