const IconField: React.FC<{
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ label, icon, children }) => (
  <div className="space-y-1">
    <p className="text-xs font-semibold text-zinc-700 tracking-wide uppercase">
      {label}
    </p>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-900">
        {icon}
      </div>
      <div className="pl-10">{children}</div>
    </div>
  </div>
);

export default IconField;
