
interface SidebarProps {
    activePath: string;
    onNavigate: (path: string) => void;
}

const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'upload-documents', label: 'Upload Documents' },
    { id: 'data-extraction', label: 'Data Extraction' },
    { id: 'financial-analysis', label: 'Financial Analysis' },
    { id: 'workbook-generator', label: 'Workbook Generator' },
    { id: 'financial-insights', label: 'Financial Insights' },
    { id: 'insights-anomalies', label: 'Insights & Anomalies' },
];

export function Sidebar({ activePath, onNavigate }: SidebarProps) {
    return (
        <div className="w-64 bg-[#0D111B] border-r border-[#2A2F3A] flex flex-col shrink-0">
            <div className="p-6">
                <h1 className="text-xl font-bold text-[#FF7A00]">FinAI</h1>
                <p className="text-xs text-[#9CA3AF] mt-1">Dashboard Demo</p>
            </div>

            <nav className="flex-1 px-4 py-2 space-y-2">
                {navItems.map((item) => {
                    const isActive = activePath === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded-md transition-colors text-sm font-medium
                ${isActive
                                    ? 'bg-[#FF7A00]/15 text-[#FF7A00]'
                                    : 'text-[#E6E8EC] hover:bg-[#FF7A00]/10 hover:text-white'
                                }`}
                        >
                            <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#FF7A00]' : 'bg-transparent'}`} />
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-[#2A2F3A]">
                <div className="flex flex-col gap-1 px-4 py-2 text-xs text-[#5C667B]">
                    <span>App v1.0.0</span>
                    <span>Hackathon Build</span>
                </div>
            </div>
        </div>
    );
}
