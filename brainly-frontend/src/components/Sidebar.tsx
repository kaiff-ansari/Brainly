import Logo from "../icons/Logo";
import TwitterIcon from "../icons/TwitterIcon";
import YouTubeIcon from "../icons/YouTubeIcon";
import ArticleIcon from "../icons/ArticleIcon";
import CrossIcon from "../icons/CrossIcon";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  selectedFilter?: string;
  onSelectFilter?: (filter: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const AllIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
  </svg>
);

const Sidebar = ({
  selectedFilter = "all",
  onSelectFilter,
  isOpen = false,
  onClose
}: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/signin");
  };

  const handleSelect = (filter: string) => {
    onSelectFilter?.(filter);
    onClose?.();
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <div
        className={`h-screen bg-white border-r border-gray-200 w-64 fixed left-0 top-0 flex flex-col justify-between p-4 z-40 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex justify-between items-center py-4 px-2">
            <div className="flex text-2xl font-bold items-center text-gray-800">
              <div className="pr-3 text-purple-600">
                <Logo />
              </div>
              Brainly
            </div>
            {/* Close button on mobile */}
            <button
              type="button"
              onClick={onClose}
              className="md:hidden text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
              title="Close menu"
            >
              <CrossIcon />
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-1">
            <SidebarItem
              text="All Notes"
              icon={<AllIcon />}
              active={selectedFilter === "all"}
              onClick={() => handleSelect("all")}
            />
            <SidebarItem
              text="YouTube"
              icon={<YouTubeIcon />}
              active={selectedFilter === "youtube"}
              onClick={() => handleSelect("youtube")}
            />
            <SidebarItem
              text="Twitter / X"
              icon={<TwitterIcon />}
              active={selectedFilter === "twitter"}
              onClick={() => handleSelect("twitter")}
            />
            <SidebarItem
              text="Articles"
              icon={<ArticleIcon />}
              active={selectedFilter === "article"}
              onClick={() => handleSelect("article")}
            />
          </nav>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <SidebarItem
            text="Logout"
            icon={<LogoutIcon />}
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;