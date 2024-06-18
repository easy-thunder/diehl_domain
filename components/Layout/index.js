import Header from './Header';
// import Sidebar from './SideBar';// TODO save navigation in local storage and provide a site map and Recommended articles.

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {/* <Sidebar /> */}
      <div>
        {children}
      </div>
    </>
  );
};

export default Layout;