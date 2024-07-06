"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";

const ConditionalSidebar: React.FC = () => {
  const pathname = usePathname();
  // 假设路径是 /admin/dashboard
  const showSidebar = !pathname.includes("/dashboard");

  return <>{showSidebar && <Sidebar />}</>;
};

export default ConditionalSidebar;
