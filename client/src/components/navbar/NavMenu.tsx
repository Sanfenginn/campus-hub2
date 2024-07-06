"use client";
import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";

interface NavMenuProps {
  pages: { name: string; path: string }[];
}

const NavMenu: React.FC<NavMenuProps> = ({ pages }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePageClick = (pagePath: string) => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo") ?? "{}");
    const currentPage = pagePath.split("/")[2];
    if (loginInfo) {
      const newLogInfo = { ...loginInfo, currentPage: currentPage };
      localStorage.setItem("loginInfo", JSON.stringify(newLogInfo));
    }
    handleCloseNavMenu();
    router.push(pagePath);
  };

  return (
    <Box
      className=" items-center"
      sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
    >
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {pages.map((page) => (
          <MenuItem key={page.name} onClick={() => handlePageClick(page.path)}>
            <Typography textAlign="center">{page.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        className="mr-2 no-underline  font-mono font-bold text-700 text-inherit "
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        Campus Hub
      </Typography>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default NavMenu;
