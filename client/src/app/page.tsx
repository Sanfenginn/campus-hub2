import dynamic from "next/dynamic";

const LoginPage = dynamic(() => import("@/app/login/page"), {
  loading: () => <p>Loading...</p>,
});

const HomePage: React.FC = () => {
  return <LoginPage />;
};
export default HomePage;
