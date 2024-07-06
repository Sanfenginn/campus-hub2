"use client";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type Option = {
  name: string;
  path: string;
};

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [options, setOptions] = useState<Option[]>([]);
  const [loginInfo, setLoginInfo] = useState<any>({});

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo") ?? "{}");
    if (loginInfo) {
      const currentPage = loginInfo.currentPage || "";
      setOptions(loginInfo.userConfig?.sidebar?.[currentPage] || []);
    }
  }, [pathname]);

  console.log("options", options);

  const handleOptionClick = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <Box component="main" className="h-full w-full p-4 ">
      <CssBaseline />
      <List>
        {options.map((option, index) => (
          <ListItem
            key={option.name}
            disablePadding
            onClick={() => {
              handleOptionClick(option.path);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={option.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
