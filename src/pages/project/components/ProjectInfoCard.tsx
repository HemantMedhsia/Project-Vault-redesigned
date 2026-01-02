import { FaTag, FaLink, FaFlag } from "react-icons/fa";
import Card from "../ui/Card";
import IconField from "../ui/IconField";
import { inputBase } from "../constants/constants";

interface Props {
  name: string;
  slug: string;
  status: string;
  setName: (v: string) => void;
  setSlug: (v: string) => void;
  setStatus: (v: string) => void;
  generateSlug: (v: string) => string;
}

const ProjectInfoCard: React.FC<Props> = ({
  name,
  slug,
  status,
  setName,
  setSlug,
  setStatus,
  generateSlug,
}) => (
  <Card
    title={
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow">
          P
        </div>
        <div>
          <h3 className="text-lg font-semibold text-zinc-700 tracking-wide">
            Project Information
          </h3>
          <p className="text-sm text-zinc-500">Core identity of the project</p>
        </div>
      </div>
    }
  >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <IconField label="Project Name" icon={<FaTag />}>
        <input
          placeholder="CMS Internal"
          className={inputBase}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (!slug) setSlug(generateSlug(e.target.value));
          }}
        />
      </IconField>

      <IconField label="Slug" icon={<FaLink />}>
        <input
          placeholder="cms-internal"
          className={`${inputBase} font-mono text-xs`}
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </IconField>

      <IconField label="Status" icon={<FaFlag />}>
        <input
          placeholder="Active, On Hold, Completed..."
          className={inputBase}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </IconField>
    </div>
  </Card>
);

export default ProjectInfoCard;
