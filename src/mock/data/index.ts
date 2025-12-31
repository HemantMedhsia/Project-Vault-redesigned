// src/data/projects/index.ts
import { type ProjectData } from "../../types/project/project";
import { cmsProject } from "./projects/cms";
import { ecommerceProject } from "./projects/ecommerce";

export const projects: ProjectData[] = [cmsProject, ecommerceProject];

export const projectsBySlug: Record<string, ProjectData> = projects.reduce(
  (acc, project) => {
    acc[project.meta.slug] = project;
    return acc;
  },
  {} as Record<string, ProjectData>
);
