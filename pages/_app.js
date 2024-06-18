import "@/css/global.css";
import "@/css/icons.css";
import Layout from "@/components/Layout";
import Footer from "@/components/Layout/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
  <Layout>

  <Component {...pageProps} />;
  </Layout>
  <Footer/>
    </>
  )
}
