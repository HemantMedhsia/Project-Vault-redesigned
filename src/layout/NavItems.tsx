import React from "react";
import { MdDashboard, MdOutlineAttachMoney } from "react-icons/md";
import { FaInfo } from "react-icons/fa";

export interface NavItem {
  name: string;
  path?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: <MdDashboard />,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: <MdOutlineAttachMoney />,
    children: [
      {
        name: "CMS RCL",
        path: "/projects/cms",
      },
      {
        name: "E-Commerce RCL",
        path: "/projects/ecommerce",
      },
      {
        name: "School App Cognis",
        path: "/projects/school-app-cognis",
      },
      {
        name: "MVP Cognis",
        path: "/projects/mvp-cognis",
      },
    ],
  },
  {
    name: "About",
    path: "/about",
    icon: <FaInfo />,
  },
];
