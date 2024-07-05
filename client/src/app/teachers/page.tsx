import dynamic from "next/dynamic";

const DashboardPage = dynamic(() => import("@/app/teachers/dashboard/page"), {
  loading: () => <p>Loading...</p>,
  //   ssr: false,
});

const TeachersMainPage: React.FC = () => {
  return <DashboardPage />;
};

export default TeachersMainPage;
