const LoginLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="min-h-screen justify-center items-center flex bg-cover bg-center bg-login">
      {children}
    </div>
  );
};

export default LoginLayout;
