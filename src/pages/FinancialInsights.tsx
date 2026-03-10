import { Card } from '../components/ui/Card';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    BarChart,
    Bar,
    Legend
} from 'recharts';

const revenueData = [
    { year: '2019', revenue: 950 },
    { year: '2020', revenue: 1100 },
    { year: '2021', revenue: 1450 },
    { year: '2022', revenue: 1980 },
    { year: '2023', revenue: 2450 },
];

const expenseData = [
    { name: 'Operations', value: 45 },
    { name: 'Marketing', value: 25 },
    { name: 'R&D', value: 20 },
    { name: 'Administration', value: 10 },
];
const COLORS = ['#FF7A00', '#FF9A3D', '#5C667B', '#2A2F3A'];

const marginData = [
    { month: 'Jan', margin: 18 },
    { month: 'Mar', margin: 20 },
    { month: 'Jun', margin: 24 },
    { month: 'Sep', margin: 22 },
    { month: 'Dec', margin: 28 },
];

const ratioData = [
    { name: 'Debt Ratio', value: 45 },
    { name: 'Liquidity', value: 65 },
    { name: 'ROA', value: 30 },
    { name: 'ROE', value: 50 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#141A26] border border-[#2A2F3A] p-3 rounded-md shadow-lg">
                <p className="text-[#E6E8EC] font-medium">{`${label || payload[0].name}`}</p>
                <p className="text-[#FF7A00] mt-1">{`${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

export function FinancialInsights() {
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-white mb-6">Financial Insights</h2>
            </div>

            <div className="flex flex-col gap-6">
                {/* Row 1 */}
                <div className="flex gap-6">
                    <Card className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-6">Revenue Growth</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3A" vertical={false} />
                                    <XAxis dataKey="year" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}M`} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2A2F3A', strokeWidth: 1 }} />
                                    <Line type="monotone" dataKey="revenue" stroke="#FF7A00" strokeWidth={3} dot={{ r: 4, fill: '#141A26', stroke: '#FF7A00', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#FF7A00' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-6">Expense Distribution</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={expenseData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {expenseData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        iconType="circle"
                                        formatter={(value) => <span className="text-[#9CA3AF] text-sm">{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                {/* Row 2 */}
                <div className="flex gap-6">
                    <Card className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-6">Profit Margin Trend</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={marginData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <defs>
                                        <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#FF7A00" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#FF7A00" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3A" vertical={false} />
                                    <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={(value) => `${value}%`} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2A2F3A', strokeWidth: 1 }} />
                                    <Area type="monotone" dataKey="margin" stroke="#FF7A00" strokeWidth={3} fillOpacity={1} fill="url(#colorMargin)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-6">Financial Ratios</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={ratioData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3A" vertical={false} />
                                    <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{ fill: '#2A2F3A', opacity: 0.4 }} content={<CustomTooltip />} />
                                    <Bar dataKey="value" fill="#FF7A00" radius={[4, 4, 0, 0]} maxBarSize={50} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
