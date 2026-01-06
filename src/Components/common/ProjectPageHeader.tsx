import { FaArrowLeft } from "react-icons/fa";
import { LuLock, LuLockOpen } from "react-icons/lu";
import { MdMenuOpen } from "react-icons/md";
import { RiMenuFold2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

interface ProjectPageHeaderProps {
  title: string;
  smallDescription: string;
}

export const ProjectPageHeader = ({
  title,
  smallDescription,
}: ProjectPageHeaderProps) => {
  const navigate = useNavigate();
  return (
    <section
      className=" right-3.5 z-30 rounded-tl-[75px] bg-linear-to-br from-gray-900 to-gray-800 px-6 shadow-xl overflow-hidden"
      style={{ height: 80 }}
    >
      {" "}
      <div className="h-full flex items-center justify-between gap-6 text-white">
        {" "}
        <div className="flex justify-center items-baseline-last">
          <div className="text-green-400 rounded-full mr-6 relative">
            <RiMenuFold2Line size={30} />
            <div className="text-red-500 rounded-full bg-red-400/20 p-1.5 absolute -top-3 -right-4">
              <LuLockOpen size={12} />
            </div>
          </div>
          <div>
            {" "}
            <h1 className="text-2xl ml-4 font-semibold tracking-tight">
              {" "}
              {title}
            </h1>{" "}
            <p className="mt-1 text-xs text-gray-400"> {smallDescription}</p>{" "}
          </div>{" "}
        </div>
        <div
          onClick={() => navigate(-1)}
          className="text-xs px-4 py-2 rounded-full border border-gray-300 hover:border-2 hover:border-green-400 cursor-pointer flex items-center justify-center"
        >
          {" "}
          <FaArrowLeft size={24} />{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
};
