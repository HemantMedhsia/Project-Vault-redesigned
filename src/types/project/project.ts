// src/types/project.ts
export interface VpnEntry {
  name: string;
  password: string; // REAL passwords backend / encrypted se aayenge
}

export interface Environment {
  name: string;      // e.g. Development, UAT
  url: string;
  login: string;
}

export interface GitRepo {
  url: string;
}

export interface JbossInfo {
  url: string;
  notes?: string[];
}

export interface DocumentInfo {
  title: string;
  owner: string;
  lastEdited: string;
  purpose: string;
}

export interface ProjectMeta {
  slug: string;       // "cms", "ecommerce" (URL segment)
  name: string;       // "CMS RCL"
  path: string;       // "/projects/cms"
  shortTitle: string; // "CMS – Cognis Solutions"
  tags?: string[];
}

export interface ProjectData {
  meta: ProjectMeta;
  status: string[];      // ["Active", "Internal Project"]
  gitRepo?: GitRepo;
  vpn?: VpnEntry[];
  environments?: Environment[];
  jboss?: JbossInfo;
  document?: DocumentInfo;
}
