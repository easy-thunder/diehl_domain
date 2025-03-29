import "@/css/global.css";
import "@/css/icons.css";
import Layout from "@/components/Layout";
import Footer from "@/components/Layout/Footer";
import { UserContextProvider } from "@/context/UserContext";


export default function App({ Component, pageProps }) {
  return (
    <>
  <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    <Footer/>
  </UserContextProvider>
    </>
  )
}
