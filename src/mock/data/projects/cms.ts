// src/data/projects/cms.ts
import { type ProjectData } from "../../../types/project/project";
export const cmsProject: ProjectData = {
  meta: {
    slug: "cms",
    name: "CMS RCL",
    path: "/projects/cms",
    shortTitle: "CMS – Cognis Solutions",
    tags: ["CMS", "Internal", "JBoss"],
  },
  status: ["Active", "Internal Project"],

  gitRepo: {
    // apna real repo URL yaha daalna, token wgera hata ke
    url: "https://github.com/cognis-solutions/RCL_Website_Content_Management.git",
  },

  vpn: [
    { name: "COGSOL1", password: "********-dummy-1" },
    { name: "COGSOL2", password: "********-dummy-2" },
    { name: "COGSOL3", password: "********-dummy-3" },
    { name: "COGSOL4", password: "********-dummy-4" },
    { name: "COGSOL5", password: "********-dummy-5" },
    { name: "COGSOL6", password: "********-dummy-6" },
    { name: "COGSOL7", password: "********-dummy-7" },
    { name: "COGSOL8", password: "********-dummy-8" },
  ],

  environments: [
    {
      name: "Development",
      url: "http://dev-eservice.rclgroup.local:8080/ContentManagementWebApp/",
      login: "admin@rclgroup.com",
    },
    {
      name: "UAT",
      url: "https://uat-eservice.rclgroup.com/ContentManagementWebApp2",
      login: "admin@rclgroup.com",
    },
  ],

  jboss: {
    url: "http://localhost:9990/console/index.html",
    notes: [
      "Ensure JBOSS service is running before accessing console.",
      "Check logs under `standalone/log` for deployment issues.",
    ],
  },

  document: {
    title: "Cognis VPN & CMS Access Details",
    owner: "Hemant / Cognis Solutions",
    lastEdited: "27/11/2025",
    purpose: "Internal reference for CMS access, VPN & environments.",
  },
};
