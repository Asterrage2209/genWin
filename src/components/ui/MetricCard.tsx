import { Card } from './Card';

interface MetricCardProps {
    title: string;
    value: string;
    trend?: string;
    trendPositive?: boolean;
}

export function MetricCard({ title, value, trend, trendPositive = true }: MetricCardProps) {
    return (
        <Card className="flex-1 flex flex-col justify-between">
            <h3 className="text-[#9CA3AF] text-sm font-medium">{title}</h3>
            <div className="mt-2 flex items-baseline gap-2 mt-auto">
                <span className="text-2xl font-semibold text-[#E6E8EC]">{value}</span>
                {trend && (
                    <span className={`text-xs font-medium ${trendPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {trend}
                    </span>
                )}
            </div>
        </Card>
    );
}
