type TabKey = "description" | "info" | "review";

interface TabsHeaderProps {
    activeTab: TabKey;
    setActiveTab: (key: TabKey) => void;
}

const TabsHeader = ({ activeTab, setActiveTab }: TabsHeaderProps) => {
    const tabs: { key: TabKey; label: string }[] = [
        { key: "description", label: "Description" },
        { key: "info", label: "Additional Information" },
        { key: "review", label: "Review" },
    ];

    return (
        <div className="flex items-center justify-center gap-10 border-b border-gray-200 pb-10">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative pb-2 text-3xl transition-colors duration-200 ${
                        activeTab === tab.key
                            ? "text-[#0A3917] font-semibold after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-10 after:h-[3px] after:rounded-full after:bg-[#0A3917]"
                            : "text-gray-700 font-medium hover:text-[#0A3917]"
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TabsHeader;