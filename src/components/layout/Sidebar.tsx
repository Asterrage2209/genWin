const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'upload-documents', label: 'Upload Documents' },
    { id: 'data-extraction', label: 'Data Extraction' },
    { id: 'financial-analysis', label: 'Financial Analysis' },
    { id: 'workbook-generator', label: 'Workbook Generator' },
    { id: 'financial-insights', label: 'Financial Insights' },
    { id: 'ai-financial-assistant', label: 'AI Financial Assistant' },
    { id: 'insights-anomalies', label: 'Insights & Anomalies' },
];

interface SidebarProps {
    activePath: string;
    onNavigate: (path: string) => void;
}

export function Sidebar({ activePath, onNavigate }: SidebarProps) {
    return (
        <aside className="w-64 bg-[#0B0F19] border-r border-[#2A2F3A] flex flex-col h-screen">
            <div className="h-16 flex items-center px-6 border-b border-[#2A2F3A]">
                <h1 className="text-xl font-bold text-white tracking-wide">
                    <span className="text-[#FF7A00]">genWin</span>
                </h1>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = activePath === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all duration-200 ${
                                isActive 
                                    ? 'bg-[#141A26] text-[#FF7A00] font-medium shadow-sm border border-[#2A2F3A]' 
                                    : 'text-[#9CA3AF] hover:bg-[#141A26]/50 hover:text-[#E6E8EC]'
                            }`}
                        >
                            <span className="text-sm">{item.label}</span>
                        </button>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-[#2A2F3A]">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-[#141A26] flex items-center justify-center border border-[#2A2F3A]">
                        <span className="text-xs font-bold text-[#FF7A00]">HA</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">Haxploders</p>
                        <p className="text-xs text-[#9CA3AF]">Pro Plan</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
