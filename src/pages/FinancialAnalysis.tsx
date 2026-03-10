import { Card } from '../components/ui/Card';

export function FinancialAnalysis() {
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-white mb-6">Financial Analysis</h2>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-white">Key Ratios</h3>
                    <a
                        href="/report.pdf"
                        download="report.pdf"
                        className="text-xs text-[#FF7A00] font-medium hover:underline inline-block"
                    >
                        Download Report
                    </a>
                </div>

                <div className="flex flex-col gap-4">
                    {[
                        { name: 'Current Ratio', value: '2.4x', target: '> 1.5x', status: 'Healthy' },
                        { name: 'Debt to Equity', value: '0.8x', target: '< 1.0x', status: 'Healthy' },
                        { name: 'Gross Margin %', value: '57.6%', target: '55.0%', status: 'Healthy' },
                        { name: 'EBITDA Margin', value: '24.2%', target: '25.0%', status: 'Attention Needed' },
                    ].map((ratio, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-[#0B0F19] rounded-lg border border-[#2A2F3A]">
                            <div className="flex-1">
                                <div className="text-sm font-medium text-[#E6E8EC]">{ratio.name}</div>
                                <div className="text-xs text-[#9CA3AF] mt-1">Target: {ratio.target}</div>
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                                <span className="text-lg font-bold text-white">{ratio.value}</span>
                            </div>
                            <div className="flex-1 flex justify-end">
                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${ratio.status === 'Healthy'
                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                    : 'bg-[#FF7A00]/10 text-[#FF7A00] border border-[#FF7A00]/20'
                                    }`}>
                                    {ratio.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </>
    );
}
