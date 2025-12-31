// src/pages/ProjectDetailRoute.tsx
import React from "react";
import { useParams } from "react-router-dom";
import ProjectDetailPage from "./ProjectDetailPage";
import type { ProjectData } from "../../types/project/project";
import { projects } from "../../mock/data";

const ProjectDetailRoute: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <div className="text-red-500 text-sm">No project selected.</div>;
  }

  function getProjectBySlug(slug: string): ProjectData | undefined {
    const fromStatic = projects.find((p) => p.meta.slug === slug);
    if (fromStatic) return fromStatic;
  }

  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="text-sm text-red-500">
        Project not found for slug: <span className="font-mono">{slug}</span>
      </div>
    );
  }

  return <ProjectDetailPage data={project} />;
};

export default ProjectDetailRoute;
