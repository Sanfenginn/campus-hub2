import dynamic from "next/dynamic";

const UsersSearchPage = dynamic(() => import("./search/page"));

const UsersPage: React.FC = () => {
  return <UsersSearchPage />;
};

export default UsersPage;
