const Card: React.FC<{
  title: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, right, children }) => (
  <section className="rounded-3xl bg-zinc-50 border border-zinc-300 p-8 space-y-6 shadow-sm">
    <div className="flex justify-between items-start">
      {title}
      {right}
    </div>
    {children}
  </section>
);

export default Card;
