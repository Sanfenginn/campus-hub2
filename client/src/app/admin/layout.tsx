import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/navbar/Navbar"));
const ConditionalSidebar = dynamic(
  () => import("@/components/sidebar/ConditionalSidebar")
);

const AdminMainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col  items-center h-screen ">
      <Navbar />
      <div className=" w-[80vw] h-full flex-grow  flex  overflow-scroll">
        <div className="flex-[1.5] ">
          <ConditionalSidebar />
        </div>
        <main className="h-full flex-[7] border-2 border-yellow-500">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminMainLayout;
