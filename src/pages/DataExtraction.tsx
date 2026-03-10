import { Card } from '../components/ui/Card';

export function DataExtraction() {
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-white mb-6">Data Extraction</h2>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-white">Extracted Tables Preview</h3>
                    <span className="px-3 py-1 bg-[#2A2F3A] text-xs rounded-full text-[#9CA3AF]">Q3_Earnings.pdf</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-[#E6E8EC]">
                        <thead className="bg-[#0B0F19] text-[#9CA3AF]">
                            <tr>
                                <th className="px-4 py-3 font-medium rounded-tl-lg">Line Item</th>
                                <th className="px-4 py-3 font-medium">Q3 2023</th>
                                <th className="px-4 py-3 font-medium">Q3 2022</th>
                                <th className="px-4 py-3 font-medium rounded-tr-lg">Variance</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2A2F3A]">
                            {[
                                { item: 'Total Revenue', curr: '$4,250M', prev: '$3,800M', var: '+11.8%' },
                                { item: 'Cost of Goods Sold', curr: '$1,800M', prev: '$1,650M', var: '+9.1%' },
                                { item: 'Gross Margin', curr: '$2,450M', prev: '$2,150M', var: '+14.0%' },
                                { item: 'Operating Expenses', curr: '$1,200M', prev: '$1,100M', var: '+9.1%' },
                                { item: 'Net Income', curr: '$950M', prev: '$800M', var: '+18.8%' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#2A2F3A]/30 transition-colors">
                                    <td className="px-4 py-3 font-medium">{row.item}</td>
                                    <td className="px-4 py-3">{row.curr}</td>
                                    <td className="px-4 py-3 text-[#9CA3AF]">{row.prev}</td>
                                    <td className="px-4 py-3 text-green-400">{row.var}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </>
    );
}
