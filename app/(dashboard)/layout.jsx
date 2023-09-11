import Navbar from "../components/Navbar";

const DashBoardLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashBoardLayout;
