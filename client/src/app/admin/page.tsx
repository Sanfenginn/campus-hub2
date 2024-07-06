import dynamic from "next/dynamic";

const DashboardPage = dynamic(() => import("@/app/admin/dashboard/page"), {
  loading: () => <p>Loading...</p>,
});

const AdminMainPage: React.FC = () => {
  return <DashboardPage />;
};

export default AdminMainPage;
