import React from "react";
import { dashboardMock } from "../../mock/dashboard.mock";
import { Link, useNavigate } from "react-router-dom";
import {
  FiActivity,
  FiAlertTriangle,
  FiBell,
  FiCheckCircle,
  FiCpu,
  FiInfo,
  FiLayers,
  FiLogOut,
  FiPauseCircle,
  FiPlusCircle,
  FiSearch,
  FiServer,
  FiSettings,
  FiShield,
  FiSun,
} from "react-icons/fi";

const HEADER_HEIGHT = 90; // 🔑 header ki real height

const DashboardPage: React.FC = () => {
  const { overview, security, recentActivity } = dashboardMock;
  const navigate = useNavigate();

  return (
    <div className="relative h-full text-gray-800 overflow-hidden">
      <section
        className="absolute top-0 left-0 right-3.5 z-30 rounded-tl-[75px] bg-linear-to-br from-gray-900 to-gray-800 px-8 shadow-xl overflow-hidden"
        style={{ height: HEADER_HEIGHT }}
      >
        <div className="h-full flex items-center justify-between gap-6 text-white">
          <div className="flex justify-center items-baseline-last">
            <div className="text-green-400 rounded-full mr-6 relative">
              <RiMenuFold2Line size={30} />
              <div className="text-red-500 rounded-full bg-red-400/20 p-1.5 absolute -top-3 -right-4">
                <LuLockOpen size={12} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl ml-4 font-semibold tracking-tight">
                Dashboard
              </h1>
              <p className="mt-1 text-xs text-gray-400">
                Live overview of projects, infrastructure & security
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-lg">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 text-sm" />
              <input
                type="text"
                placeholder="Search projects, environments, users..."
                className="w-full rounded-xl bg-gray-800/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-400
                          outline-none border border-gray-700 focus:border-gray-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative rounded-xl p-2.5 hover:bg-white/10 transition">
              <FiBell className="text-lg" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <button className="relative rounded-xl p-2.5 hover:bg-white/10 transition">
              <FiSun className="text-lg" />
            </button>

            <button className="rounded-xl p-2.5 hover:bg-white/10 transition">
              <FiSettings className="text-lg" />
            </button>

            <div className="h-6 w-px bg-white/10 mx-1" />

            <button
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-400
                      hover:bg-red-500/10 transition"
              onClick={() => {
                console.log("Logout");
              }}
            >
              <FiLogOut className="text-base" />
              Logout
            </button>
          </div>
        </div>
      </section>

      <div
        className="absolute inset-0 overflow-y-auto px-12 scroll-hide"
        style={{ paddingTop: HEADER_HEIGHT }}
      >
        <div className="space-y-12 px-1 pt-8">
          <section>
            <h2 className="text-xl font-semibold mb-5 tracking-tight">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <QuickAction
                icon={<FiPlusCircle size={18} />}
                label="New Project Setup"
                accent="green"
                onClick={() => navigate("/projects/new")}
              />
              <QuickAction
                icon={<FiServer size={18} />}
                label="Add Environment"
                accent="red"
              />
              <QuickAction
                icon={<FiShield size={18} />}
                label="Get VPNs"
                accent="indigo"
              />
              <QuickAction
                icon={<FiActivity size={18} />}
                label="View Logs"
                accent="yellow"
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-5 tracking-tight">
              Infrastructure Overview
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
              <Metric
                label="Projects"
                value={overview.totalProjects}
                icon={<FiLayers size={18} />}
              />

              <Metric
                label="Active"
                value={overview.activeProjects}
                icon={<FiCheckCircle size={18} />}
                highlight
              />

              <Metric
                label="Inactive"
                value={overview.inactiveProjects}
                icon={<FiPauseCircle size={18} />}
              />

              <Metric
                label="Environments"
                value={overview.totalEnvironments}
                icon={<FiServer size={18} />}
              />

              <Metric
                label="Total VPNs"
                value={overview.vpnProfiles}
                icon={<FiShield size={18} />}
              />

              <Metric
                label="JBOSS Servers"
                value={overview.jbossServers}
                icon={<FiCpu size={18} />}
              />
            </div>
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <RecentLogs logs={recentLogs} />
            </div>

            <div>
              <SystemIPCard ip="192.168.42.118" />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <section className="rounded-3xl text-white bg-gray-900 border border-gray-100 shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Security Snapshot</h3>

              <SecurityRow
                label="VPN Configured"
                value={security.vpnConfigured}
                ok
              />
              <SecurityRow
                label="VPN Missing"
                value={security.vpnMissing}
                warn
              />
              <SecurityRow
                label="Last Credential Update"
                value={security.credentialsUpdated}
              />
            </section>

            <section className="xl:col-span-2 rounded-3xl bg-white border border-gray-100 shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">
                Operational Activity
              </h3>

              <div className="space-y-3">
                {recentActivity.map((a, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center rounded-2xl bg-gray-50 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{a.project}</p>
                      <p className="text-xs text-gray-500">{a.action}</p>
                    </div>
                    <span className="text-xs text-gray-400">{a.time}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

const Metric = ({ label, value, icon, highlight }: any) => (
  <div
    className={`
      relative rounded-3xl p-5
      border transition-all
      ${
        highlight
          ? "bg-gray-900 text-green-400 border-gray-900 shadow-lg"
          : "bg-white text-gray-800 border-gray-200 shadow-sm hover:shadow-md"
      }
    `}
  >
    <div className="flex items-start justify-between">
      <div>
        <p
          className={`text-xs font-medium tracking-wide uppercase ${
            highlight ? "text-green-400" : "text-gray-500"
          }`}
        >
          {label}
        </p>

        <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
      </div>

      <div
        className={`
          p-3 rounded-xl
          ${
            highlight
              ? "bg-white/10 text-green-400"
              : "bg-gray-100 text-gray-700"
          }
        `}
      >
        {icon}
      </div>
    </div>

    {highlight && (
      <div className="absolute inset-x-6 bottom-3 h-0.5 bg-green-500 rounded-full" />
    )}
  </div>
);

const SecurityRow = ({ label, value, ok, warn }: any) => (
  <div className="flex justify-between py-2 border-b last:border-b-0">
    <span className="text-sm">{label}</span>
    <span
      className={`text-sm font-semibold ${
        ok ? "text-green-600" : warn ? "text-red-600" : "text-gray-600"
      }`}
    >
      {value}
    </span>
  </div>
);

const StatusBadge = ({ status }: any) => (
  <span className="px-3 py-1 rounded-full text-[10px] font-medium bg-gray-100">
    {status}
  </span>
);

const HealthBadge = ({ health }: any) => {
  const map: any = {
    Healthy: "bg-green-100 text-green-700",
    Warning: "bg-yellow-100 text-yellow-700",
    Critical: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-medium ${map[health]}`}
    >
      {health}
    </span>
  );
};

const accentMap: any = {
  green: {
    bg: "white",
    iconBg: "bg-green-100",
    iconText: "text-green-700",
    ring: "hover:ring-green-200",
    text: "text-green-400",
    redirectIconColour: "",
  },
  red: {
    bg: "white",
    iconBg: "bg-red-100",
    iconText: "text-red-700",
    ring: "hover:ring-red-200",
    text: "text-red-400",
    redirectIconColour: "",
  },
  indigo: {
    bg: "white",
    iconBg: "bg-indigo-100",
    iconText: "text-indigo-700",
    ring: "hover:ring-indigo-200",
    text: "text-indigo-400",
    redirectIconColour: "",
  },
  yellow: {
    bg: "bg-gray-900",
    iconBg: "bg-yellow-100",
    iconText: "text-yellow-700",
    ring: "hover:ring-yellow-200",
    text: "text-yellow-400",
    redirectIconColour: "text-white",
  },
};

const QuickAction = ({ icon, label, accent, onClick }: any) => {
  const a = accentMap[accent];

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-4
        rounded-2xl p-5
        bg-linear-to-br ${a.bg}
        border border-gray-200 shadow-sm
        transition-all duration-300 cursor-pointer justify-between
      `}
    >
      <div className="flex gap-4 justify-center items-center">
        <div
          className={`
          flex items-center justify-center
          p-3 rounded-xl
          ${a.iconBg} ${a.iconText}
          transition-all duration-300
          group-hover:scale-110
        `}
        >
          {icon}
        </div>

        <div className="flex flex-col text-left">
          <span className={`text-sm font-semibold ${a.text}`}>{label}</span>
          <span className={`${a.redirectIconColour} text-xs text-gray-500`}>
            Quick access
          </span>
        </div>
      </div>

      <div
        className={`
          flex items-center justify-center
          p-3 transition-all duration-300
          group-hover:scale-110 ${a.redirectIconColour}
        `}
      >
        <RxOpenInNewWindow size={24} />
      </div>
    </button>
  );
};

const levelIconMap: any = {
  INFO: <FiInfo size={14} />,
  WARN: <FiAlertTriangle size={14} />,
  SUCCESS: <FiCheckCircle size={14} />,
};

const levelStyleMap: any = {
  INFO: "text-gray-500",
  WARN: "text-gray-700",
  SUCCESS: "text-green-500",
};

const recentLogs = [
  {
    level: "SUCCESS",
    message: "New environment deployed successfully",
    timestamp: "2025-01-02 10:42:18",
    source: "DEPLOY-SERVICE",
  },
  {
    level: "INFO",
    message: "VPN profile synced with gateway",
    timestamp: "2025-01-02 10:31:02",
    source: "VPN-MANAGER",
  },
  {
    level: "WARN",
    message: "JBOSS node restarted due to memory threshold",
    timestamp: "2025-01-02 10:14:56",
    source: "JBOSS-02",
  },
];

export const RecentLogs = ({ logs }: any) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 tracking-tight">
        Recent Log Activities
      </h2>

      <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-6">
        <ul className="space-y-5">
          {logs.map((log: any, idx: number) => (
            <li key={idx} className="flex gap-4">
              <div
                className={`mt-1 p-2 rounded-lg bg-gray-100 ${
                  levelStyleMap[log.level]
                }`}
              >
                {levelIconMap[log.level]}
              </div>

              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium">
                  {log.message}
                </p>

                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 font-mono">
                  <span>{log.timestamp}</span>
                  <span>•</span>
                  <span>{log.source}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

import { FiCopy, FiGlobe } from "react-icons/fi";
import { RxOpenInNewWindow } from "react-icons/rx";
import { RiMenuFold2Line } from "react-icons/ri";
import { LuLockOpen } from "react-icons/lu";

export const SystemIPCard = ({ ip }: any) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 tracking-tight">
        System Network
      </h2>

      <div className="rounded-3xl bg-gray-900 text-white p-6 shadow-lg border border-gray-900">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-green-400 font-semibold">
              Current System IP
            </p>

            <p className="mt-2 text-2xl font-mono font-semibold text-green-400">
              {ip}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-green-400/20 text-green-400">
            <FiGlobe size={18} />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            className="
              flex items-center gap-2
              text-xs text-green-400
              transition border border-gray-900 p-2 rounded-full
            "
          >
            <FiCopy size={14} />
            Copy IP
          </button>

          <span className="text-xs text-green-500">Public Network</span>
        </div>
      </div>
    </section>
  );
};
