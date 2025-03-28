import "@/css/global.css";
import "@/css/icons.css";
import Layout from "@/components/Layout";
import Footer from "@/components/Layout/Footer";
import { SessionProvider } from 'next-auth/react';


export default function App({ Component, pageProps }) {
  return (
    <>
  <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    <Footer/>
  </SessionProvider>
    </>
  )
}
