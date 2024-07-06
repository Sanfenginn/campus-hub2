"use client";
import React from "react";
import { Box } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

const Logo: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleLogoClick = () => {
    const newPathname = pathname.split("/")[1];
    router.replace(`/${newPathname}/dashboard`);
  };

  return (
    <>
      <Box
        component="img"
        src="../favicon.ico"
        alt="Logo"
        className=" h-[40px] w-[40px] mr-2 cursor-pointer"
        sx={{ display: { xs: "none", md: "flex" } }}
        onClick={handleLogoClick}
      />
      <Box
        component="img"
        src="../favicon.ico"
        alt="Logo"
        className="h-[40px] w-[40px] mr-2 cursor-pointer"
        sx={{ display: { xs: "flex", md: "none" } }}
        onClick={handleLogoClick}
      />
    </>
  );
};

export default Logo;
