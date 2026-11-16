import type { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  onClick?: () => void;
  active?: boolean;
}

const SidebarItem = ({ text, icon, onClick, active }: SidebarItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center text-gray-700 cursor-pointer rounded-lg px-3 py-2 transition-colors mb-1 ${
        active ? "bg-purple-100 text-purple-700 font-medium" : "hover:bg-gray-100"
      }`}
    >
      <div className="mr-3 flex items-center">{icon}</div>
      <div className="text-sm">{text}</div>
    </div>
  );
};

export default SidebarItem;