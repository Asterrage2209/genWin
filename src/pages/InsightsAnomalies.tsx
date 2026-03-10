import { Card } from '../components/ui/Card';

export function InsightsAnomalies() {
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-white mb-6">Insights & Anomalies</h2>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-white">Detected Anomalies</h3>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-red-500/10 text-red-500 text-xs font-medium rounded-full border border-red-500/20">2 High</span>
                        <span className="px-3 py-1 bg-[#FF7A00]/10 text-[#FF7A00] text-xs font-medium rounded-full border border-[#FF7A00]/20">5 Medium</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {[
                        {
                            title: 'Revenue Recognition Timing',
                            desc: 'Possible aggressive revenue recognition detected in Q3. Software licensing revenue appears to be recognized fully upfront rather than ratably.',
                            severity: 'High',
                            module: 'Income Statement'
                        },
                        {
                            title: 'Unusual Inventory Build',
                            desc: 'Inventory turnover ratio decreased by 15% sequentially while days sales outstanding remained flat, suggesting potential excess stock.',
                            severity: 'Medium',
                            module: 'Balance Sheet'
                        },
                        {
                            title: 'Capex Fluctuation',
                            desc: 'Capital expenditures spiked 40% above the 8-quarter moving average without corresponding disclosure in management commentary.',
                            severity: 'Medium',
                            module: 'Cash Flow'
                        }
                    ].map((item, i) => (
                        <div key={i} className={`p-4 rounded-lg border-l-4 border-y border-r border-y-[#2A2F3A] border-r-[#2A2F3A] bg-[#0B0F19] ${item.severity === 'High' ? 'border-l-red-500' : 'border-l-[#FF7A00]'
                            }`}>
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-sm font-semibold text-[#E6E8EC]">{item.title}</h4>
                                <span className="text-xs text-[#9CA3AF] px-2 py-0.5 bg-[#2A2F3A] rounded">{item.module}</span>
                            </div>
                            <p className="text-sm text-[#9CA3AF] leading-relaxed mb-3">
                                {item.desc}
                            </p>
                            <div className="flex gap-2">
                                <button className="text-xs font-medium text-[#FF7A00] hover:text-[#FF9A3D] transition-colors">
                                    View Details
                                </button>
                                <span className="text-[#2A2F3A]">•</span>
                                <button className="text-xs font-medium text-[#9CA3AF] hover:text-[#E6E8EC] transition-colors">
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </>
    );
}
