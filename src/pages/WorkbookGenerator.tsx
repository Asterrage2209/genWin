import { Card } from '../components/ui/Card';
import type { GeneratedModel } from '../App';

interface WorkbookGeneratorProps {
    models: GeneratedModel[];
}

export function WorkbookGenerator({ models }: WorkbookGeneratorProps) {
    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-white mb-6">Workbook Generator</h2>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-white">Generated Excel Models</h3>
                    <button className="px-4 py-2 bg-[#FF7A00] hover:bg-[#FF9A3D] text-white text-sm font-medium rounded-md transition-colors">
                        Generate New Model
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    {models.map((file, i) => (
                        <div key={i} className="flex items-center p-4 border border-[#2A2F3A] rounded-lg bg-[#0B0F19] hover:border-[#FF7A00]/50 transition-colors cursor-pointer">
                            <div className="p-3 bg-green-500/10 text-green-500 rounded-lg mr-4">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="8" y1="13" x2="16" y2="13" />
                                    <line x1="8" y1="17" x2="16" y2="17" />
                                    <polyline points="10 9 9 9 8 9" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium text-[#E6E8EC]">{file.name}</div>
                                <div className="text-xs text-[#9CA3AF] mt-1">Generated: {file.date} • {file.size}</div>
                            </div>
                            <a
                                href="/model.xlsx"
                                download="model.xlsx"
                                className="px-3 py-1.5 text-xs font-medium text-[#E6E8EC] bg-[#2A2F3A] hover:bg-[#FF7A00] hover:text-white rounded transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Download Model
                            </a>
                        </div>
                    ))}
                </div>
            </Card>
        </>
    );
}
