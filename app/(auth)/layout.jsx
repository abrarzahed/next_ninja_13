import Link from "next/link";

const AuthLayout = ({ children }) => {
  return (
    <>
      <nav>
        <h1>Dojo Help desk</h1>
        <Link href="/signup">Sign up</Link>
        <Link href="/login">Login</Link>
      </nav>
      {children}
    </>
  );
};

export default AuthLayout;
