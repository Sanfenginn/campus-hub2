import dynamic from "next/dynamic";

const DashboardPage = dynamic(() => import("@/app/students/dashboard/page"), {
  loading: () => <p>Loading...</p>,
  //   ssr: false,
});

const StudentsMainPage: React.FC = () => {
  return <DashboardPage />;
};

export default StudentsMainPage;
