// src/components/ProjectDetailPage.tsx
import React, { useState } from "react";
import {
  type ProjectData,
  type Environment,
  type VpnEntry,
} from "../../types/project/project";
import {
  FiCopy,
  FiCheck,
  FiExternalLink,
  FiEye,
  FiEyeOff,
  FiSearch,
} from "react-icons/fi";

interface ProjectDetailPageProps {
  data: ProjectData;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ data }) => {
  const { meta, status, gitRepo, vpn, environments, jboss, document } = data;

  return (
    <div className="space-y-8 text-gray-900">
      {/* Header */}
      <section
        className=" right-3.5 z-30 rounded-tl-[75px] bg-linear-to-br from-gray-900 to-gray-800 px-8 shadow-xl overflow-hidden"
        style={{ height: 80 }}
      >
        <div className="h-full flex items-center justify-between gap-6 text-white">
          <div>
            <h1 className="text-2xl ml-4 font-semibold tracking-tight">
              {meta.shortTitle}
            </h1>
            <p className="mt-1 text-xs text-gray-400">
              All VPN, repository, environments & server details in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
          {status.map((s) => (
            <span
              key={s}
              className={`px-4 py-1.5 rounded-full ${s==="Active" ? "bg-green-100 text-green-700" : "bg-indigo-100 text-indigo-700"} text-xs font-medium`}
            >
              {s}
            </span>
          ))}
        </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {gitRepo && (
            <Card>
              <CardHeader
                title="Git Repository"
                description="Source code repository for this project."
              />
              <GitRepoSection url={gitRepo.url} />
            </Card>
          )}

          {vpn && vpn.length > 0 && (
            <Card>
              <CardHeader
                title="VPN Configuration"
                description="VPN profiles required to access internal resources."
              />
              <VpnSection entries={vpn} />
            </Card>
          )}

          {jboss && (
            <Card>
              <CardHeader
                title="JBOSS Server"
                description="Application server details for administration."
              />
              <JbossSection jbossUrl={jboss.url} notes={jboss.notes} />
            </Card>
          )}
        </div>

        {/* Right 1/3 */}
        <div className="space-y-6">
          {environments && environments.length > 0 && (
            <Card>
              <CardHeader
                title="Environments"
                description="Dev, UAT and other endpoints with login details."
              />
              <EnvironmentSection environments={environments} />
            </Card>
          )}

          {document && (
            <Card>
              <CardHeader
                title="Document Info"
                description="Meta information for quick reference."
              />
              <DocumentInfoSection document={document} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

/* --------- Reusable UI pieces --------- */

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
    {children}
  </section>
);

const CardHeader: React.FC<{ title: string; description?: string }> = ({
  title,
  description,
}) => (
  <div className="mb-4 flex items-start justify-between gap-2">
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
  </div>
);

const CopyButton: React.FC<{ value: string }> = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 text-xs px-3 py-1 hover:bg-gray-100 transition-colors"
    >
      {copied ? (
        <>
          <FiCheck className="text-emerald-500" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <FiCopy />
          <span>Copy</span>
        </>
      )}
    </button>
  );
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-xs font-medium text-gray-500 mb-0.5">{children}</p>
);

const CopyableField: React.FC<{ value: string }> = ({ value }) => (
  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
    <span className="text-xs truncate flex-1 font-mono">{value}</span>
    <CopyButton value={value} />
  </div>
);

/* --------- Sections --------- */

const GitRepoSection: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className="space-y-3">
      <Label>Repository URL</Label>
      <CopyableField value={url} />

      <div className="flex gap-3 mt-2">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors"
        >
          <FiExternalLink size={14} />
          Open in browser
        </a>
      </div>
    </div>
  );
};

const VpnSection: React.FC<{ entries: VpnEntry[] }> = ({ entries }) => {
  const [expanded, setExpanded] = useState(true);
  const [visiblePasswords, setVisiblePasswords] = useState<
    Record<string, boolean>
  >({});

  const togglePassword = (name: string) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="flex items-center justify-between w-full text-sm font-medium text-left text-gray-700"
      >
        <span>VPN Profiles</span>
        <span className="text-xs text-gray-500">
          {expanded ? "Hide list" : "Show list"}
        </span>
      </button>

      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {entries.map((vpn) => {
            const isVisible = visiblePasswords[vpn.name];
            const displayValue = isVisible ? vpn.password : "••••••••••••";

            return (
              <div
                key={vpn.name}
                className="flex items-center justify-between gap-2 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3"
              >
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-600">
                    {vpn.name}
                  </p>
                  <p className="text-sm font-mono text-gray-800 select-all">
                    {displayValue}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    type="button"
                    onClick={() => togglePassword(vpn.name)}
                    className="inline-flex items-center justify-center rounded-full border border-gray-300 w-8 h-8 hover:bg-gray-100"
                  >
                    {isVisible ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                  <CopyButton value={vpn.password} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const EnvironmentSection: React.FC<{ environments: Environment[] }> = ({
  environments,
}) => {
  return (
    <div className="space-y-3">
      {environments.map((env) => (
        <div
          key={env.name}
          className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 space-y-2"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">{env.name} Environment</p>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-gray-500 border border-gray-200">
              {env.name.toUpperCase()}
            </span>
          </div>

          <div className="space-y-1">
            <Label>URL</Label>
            <CopyableField value={env.url} />
          </div>

          <div className="space-y-1">
            <Label>Login Email</Label>
            <CopyableField value={env.login} />
          </div>

          <div className="flex gap-2 mt-1">
            <a
              href={env.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-gray-900 text-white hover:bg-gray-800"
            >
              <FiExternalLink size={12} />
              Open
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

const JbossSection: React.FC<{ jbossUrl: string; notes?: string[] }> = ({
  jbossUrl,
  notes,
}) => {
  return (
    <div className="space-y-3">
      <Label>Console URL</Label>
      <CopyableField value={jbossUrl} />

      {notes && notes.length > 0 && (
        <div className="mt-2 rounded-2xl bg-amber-50 border border-amber-100 px-4 py-3 text-xs text-amber-800 space-y-1">
          <p className="font-semibold">Note</p>
          <ul className="list-disc list-inside space-y-0.5">
            {notes.map((n, idx) => (
              <li key={idx}>{n}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const DocumentInfoSection: React.FC<{
  document: import("../../types/project/project").DocumentInfo;
}> = ({ document }) => {
  const { title, owner, lastEdited, purpose } = document;
  return (
    <div className="space-y-3 text-sm">
      <InfoRow label="Title" value={title} />
      <InfoRow label="Owner" value={owner} />
      <InfoRow label="Last Edited" value={lastEdited} />
      <InfoRow label="Purpose" value={purpose} />
    </div>
  );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between gap-4">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="text-xs font-medium text-gray-800 text-right">
      {value}
    </span>
  </div>
);

export default ProjectDetailPage;
