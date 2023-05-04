import { NextPage } from "next";

function Layout() {
  return <h1>Test</h1>;
}
export default Layout;

Layout.getLayout = function PageLayout(page: NextPage) {
  return (
    <>
      <h1>Layout component</h1>
      {page}
    </>
  );
};
