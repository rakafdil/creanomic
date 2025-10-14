import { motion } from "framer-motion";

type TabKey = "description" | "info" | "review";

interface TabsHeaderProps {
  activeTab: TabKey;
  setActiveTab: (key: TabKey) => void;
}

const tabs: { key: TabKey; label: string }[] = [
  { key: "description", label: "Description" },
  { key: "info", label: "Additional Information" },
  { key: "review", label: "Review" },
];

const TabsHeader = ({ activeTab, setActiveTab }: TabsHeaderProps) => {
  return (
    <div className="flex items-center justify-center gap-6 sm:gap-10 pb-6 sm:pb-10 relative">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`relative pb-3 text-lg sm:text-2xl md:text-3xl transition-colors duration-200 cursor-pointer ${
            activeTab === tab.key
              ? "text-[#0A3917] font-semibold"
              : "text-gray-700 font-medium hover:text-[#0A3917]"
          }`}
          style={{ outline: "none" }}
        >
          {tab.label}
          {activeTab === tab.key && (
            <motion.div
              layoutId="tab-underline"
              className="absolute left-0 bottom-0 w-full h-[5px] rounded-full bg-[#0A3917]"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default TabsHeader;
