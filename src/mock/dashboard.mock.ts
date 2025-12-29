export const dashboardMock = {
  systemPulse: {
    uptime: "99.98%",
    lastDeploy: "2 hours ago",
    incidents: 1,
    alerts: 3,
  },

  overview: {
    totalProjects: 6,
    activeProjects: 4,
    inactiveProjects: 2,
    totalEnvironments: 9,
    vpnProfiles: 8,
    jbossServers: 3,
  },

  security: {
    vpnConfigured: 4,
    vpnMissing: 2,
    credentialsUpdated: "3 days ago",
  },

  recentActivity: [
    {
      project: "CMS RCL",
      action: "VPN password rotated",
      time: "2h ago",
      level: "security",
    },
    {
      project: "E-Commerce RCL",
      action: "UAT environment deployed",
      time: "1d ago",
      level: "deploy",
    },
    {
      project: "School App Cognis",
      action: "New environment added",
      time: "3d ago",
      level: "env",
    },
  ],

  projects: [
    {
      id: "cms",
      name: "CMS RCL",
      status: "Active",
      environments: ["DEV", "UAT"],
      vpn: true,
      jboss: true,
      health: "Healthy",
      lastUpdated: "2h ago",
    },
    {
      id: "ecommerce",
      name: "E-Commerce RCL",
      status: "In Progress",
      environments: ["DEV"],
      vpn: false,
      jboss: false,
      health: "Warning",
      lastUpdated: "1d ago",
    },
    {
      id: "school",
      name: "School App Cognis",
      status: "Active",
      environments: ["DEV", "QA", "UAT"],
      vpn: true,
      jboss: false,
      health: "Healthy",
      lastUpdated: "3d ago",
    },
  ],
};
