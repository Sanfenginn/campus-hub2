"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import SettingsMenu from "./SettingsMenu";
import Button from "@mui/material/Button";
import { useRouter, usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [pages, setPages] = useState<{ name: string; path: string }[]>([]);
  const [settings, setSettings] = useState<string[]>([]);
  const [loginInfo, setLoginInfo] = useState<any>({});

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo") ?? "{}");
    if (loginInfo) {
      setPages(loginInfo.userConfig?.navbar || []);
      setSettings(loginInfo.settings || []);
      setLoginInfo(loginInfo || {});
    }
    // console.log("loginInfo", loginInfo);
  }, []);

  console.log("pages", pages);
  console.log("settings", settings);

  const handleTitleClick = () => {
    const newPathname = pathname.split("/")[1];
    router.replace(`/${newPathname}/dashboard`);
  };

  const handlePageClick = (pagePath: string) => {
    const currentPage = pagePath.split("/")[2];
    const newLogInfo = { ...loginInfo, currentPage: currentPage };
    localStorage.setItem("loginInfo", JSON.stringify(newLogInfo));
    router.push(pagePath);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <Typography
            variant="h6"
            noWrap
            className="mr-2 no-underline  font-mono font-bold text-700 text-inherit "
            sx={{ display: { xs: "none", md: "flex" }, cursor: "pointer" }}
            onClick={handleTitleClick}
          >
            Campus Hub
          </Typography>
          <NavMenu pages={pages} />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handlePageClick(page.path)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <SettingsMenu settings={settings} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
