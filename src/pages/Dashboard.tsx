import React from 'react';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';

export function Dashboard() {
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
            </div>

            <div className="flex gap-6">
                <MetricCard title="Documents Processed" value="1,248" trend="+12% this week" />
                <MetricCard title="Statements Extracted" value="892" trend="+5% this week" />
                <MetricCard title="Anomalies Detected" value="34" trend="attention needed" trendPositive={false} />
                <MetricCard title="Workbook Status" value="Generated" trend="up to date" />
            </div>

            <Card>
                <h3 className="text-lg font-semibold text-white mb-4">Pipeline Status</h3>
                <div className="flex items-center justify-between gap-6">
                    {['Upload', 'Extract', 'Normalize', 'Analyze', 'Workbook'].map((step, idx) => (
                        <React.Fragment key={step}>
                            <div
                                className={`flex-1 text-center py-4 rounded-lg border ${idx === 2
                                        ? 'border-[#FF7A00] bg-[#FF7A00]/10 text-[#FF7A00]'
                                        : 'border-[#2A2F3A] bg-[#0B0F19] text-[#9CA3AF]'
                                    }`}
                            >
                                <div className="text-sm font-bold tracking-wide uppercase">{step}</div>
                                {idx === 2 && <div className="text-xs mt-2 animate-pulse font-medium">Processing...</div>}
                                {idx < 2 && <div className="text-xs mt-2 text-green-500 font-medium">Completed</div>}
                                {idx > 2 && <div className="text-xs mt-2 text-[#5C667B] font-medium">Pending</div>}
                            </div>
                            {idx < 4 && (
                                <div className="text-[#2A2F3A]">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </Card>

            <Card>
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="flex flex-col">
                    {[
                        { event: 'Extracted tables from Q3_Earnings.pdf', time: '2 mins ago' },
                        { event: 'Detected anomaly in revenue recognition', time: '14 mins ago' },
                        { event: 'Normalized 5 financial statements', time: '1 hour ago' },
                        { event: 'Uploaded batch: 2023_Financials.zip', time: '3 hours ago' },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-[#2A2F3A] py-4 first:pt-2 last:border-0 last:pb-2">
                            <span className="text-[#E6E8EC] text-sm">{item.event}</span>
                            <span className="text-[#9CA3AF] text-xs">{item.time}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </>
    );
}
