import React from "react";
import { dashboardMock } from "../../mock/dashboard.mock";
import { Link } from "react-router-dom";
import {
  FiActivity,
  FiBell,
  FiLogOut,
  FiPlusCircle,
  FiSearch,
  FiServer,
  FiSettings,
  FiShield,
  FiSun,
} from "react-icons/fi";

const HEADER_HEIGHT = 90; // 🔑 header ki real height

const DashboardPage: React.FC = () => {
  const { overview, security, recentActivity, projects } = dashboardMock;

  return (
    <div className="relative h-full text-gray-800 overflow-hidden">
      <section
        className="absolute top-0 left-0 right-3.5 z-30 rounded-tl-[75px] bg-linear-to-br from-gray-900 to-gray-800 px-8 shadow-xl overflow-hidden"
        style={{ height: HEADER_HEIGHT }}
      >
        <div className="h-full flex items-center justify-between gap-6 text-white">
          <div>
            <h1 className="text-2xl ml-4 font-semibold tracking-tight">
              Dashboard
            </h1>
            <p className="mt-1 text-xs text-gray-400">
              Live overview of projects, infrastructure & security
            </p>
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
        className="absolute inset-0 overflow-y-auto"
        style={{ paddingTop: HEADER_HEIGHT }}
      >
        <div className="space-y-12 px-1 pt-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickAction
                icon={<FiPlusCircle />}
                label="New Project Setup"
                accent="emerald"
              />
              <QuickAction
                icon={<FiServer />}
                label="Add Environment"
                accent="cyan"
              />
              <QuickAction
                icon={<FiShield />}
                label="Get VPNs"
                accent="indigo"
              />
              <QuickAction
                icon={<FiActivity />}
                label="View Logs"
                accent="amber"
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Infrastructure Overview
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
              <Metric label="Projects" value={overview.totalProjects} />
              <Metric
                label="Active"
                value={overview.activeProjects}
                highlight
              />
              <Metric label="Inactive" value={overview.inactiveProjects} />
              <Metric label="Environments" value={overview.totalEnvironments} />
              <Metric
                label="Total VPNs Available"
                value={overview.vpnProfiles}
              />
              <Metric label="JBOSS Servers" value={overview.jbossServers} />
            </div>
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <section className="rounded-3xl bg-white border border-gray-100 shadow-sm p-6">
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

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Project Control Matrix
            </h2>

            <div className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500">
                  <tr>
                    <th className="px-5 py-3 text-left">Project</th>
                    <th>Status</th>
                    <th>Health</th>
                    <th>Environments</th>
                    <th>VPN</th>
                    <th>JBOSS</th>
                    <th>Updated</th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id} className="border-t hover:bg-gray-50">
                      <td className="px-5 py-3 font-medium">
                        <Link
                          to={`/projects/${p.id}`}
                          className="hover:underline"
                        >
                          {p.name}
                        </Link>
                      </td>
                      <td>
                        <StatusBadge status={p.status} />
                      </td>
                      <td>
                        <HealthBadge health={p.health} />
                      </td>
                      <td>{p.environments.join(", ")}</td>
                      <td>{p.vpn ? "Yes" : "—"}</td>
                      <td>{p.jboss ? "Yes" : "—"}</td>
                      <td className="text-xs text-gray-500">{p.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

const Metric = ({ label, value, highlight }: any) => (
  <div
    className={`rounded-3xl p-5 border shadow-sm ${
      highlight
        ? "bg-gray-900 text-white border-gray-900"
        : "bg-white border-gray-100"
    }`}
  >
    <p className="text-xs opacity-70">{label}</p>
    <p className="mt-2 text-3xl font-bold">{value}</p>
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

const QuickAction = ({ icon, label, accent }: any) => (
  <button
    className={`flex items-center gap-3 rounded-2xl p-4 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition group cursor-pointer`}
  >
    <div
      className={`p-3 rounded-xl bg-${accent}-100 text-${accent}-700 group-hover:bg-${accent}-200 transition`}
    >
      {icon}
    </div>
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </button>
);
