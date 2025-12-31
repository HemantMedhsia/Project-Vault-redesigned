// src/data/projects/ecommerce.ts
import { type ProjectData } from "../../../types/project/project";
export const ecommerceProject: ProjectData = {
  meta: {
    slug: "ecommerce",
    name: "E-Commerce RCL",
    path: "/projects/ecommerce",
    shortTitle: "E-Commerce Platform – RCL",
    tags: ["E-Commerce", "API", "React"],
  },
  status: ["In Progress"],

  gitRepo: {
    url: "https://github.com/cognis-solutions/rcl-ecommerce.git",
  },

  environments: [
    {
      name: "Development",
      url: "http://dev-ecommerce.rclgroup.local",
      login: "devadmin@rclgroup.com",
    },
  ],

  document: {
    title: "E-Commerce Platform Environment & Access",
    owner: "Hemant / Team",
    lastEdited: "27/11/2025",
    purpose: "Internal reference for E-Commerce environments and access.",
  },
};
