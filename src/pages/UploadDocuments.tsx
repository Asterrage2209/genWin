import { useState, useRef } from 'react';
import { Card } from '../components/ui/Card';

type ProcessingState = 'idle' | 'uploaded' | 'processing' | 'completed';

const PROCESSING_STEPS = [
    'Uploading document',
    'Extracting financial statements',
    'Normalizing units and formats',
    'Calculating financial ratios',
    'Generating financial workbook'
];

interface UploadDocumentsProps {
    onNavigate: (path: string) => void;
    onDocumentProcessed?: (fileName: string) => void;
}

export function UploadDocuments({ onNavigate, onDocumentProcessed }: UploadDocumentsProps) {
    const [state, setState] = useState<ProcessingState>('idle');
    const [file, setFile] = useState<File | null>(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setState('uploaded');
        }
    };

    const triggerFileInput = () => {
        if (state === 'idle') {
            fileInputRef.current?.click();
        }
    };

    const processDocument = () => {
        setState('processing');
        setCurrentStepIndex(0);

        // Simulate step-by-step processing
        PROCESSING_STEPS.forEach((_, index) => {
            setTimeout(() => {
                setCurrentStepIndex(index);

                // If it's the last step, transition to completed
                if (index === PROCESSING_STEPS.length - 1) {
                    setTimeout(() => {
                        setState('completed');
                        if (onDocumentProcessed && file) {
                            onDocumentProcessed(file.name);
                        }
                    }, 1500);
                }
            }, (index + 1) * 1500); // 1.5 seconds per step
        });
    };

    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-white mb-6">Upload Documents</h2>
            </div>

            <Card className="max-w-3xl mx-auto">
                {/* IDLE STATE */}
                {state === 'idle' && (
                    <div
                        onClick={triggerFileInput}
                        className="flex justify-center items-center py-20 px-6 border-2 border-dashed border-[#2A2F3A] rounded-lg bg-[#0B0F19] hover:border-[#FF7A00] transition-colors cursor-pointer"
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            className="hidden"
                            accept=".pdf,.xlsx,.csv"
                        />
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="p-4 bg-[#FF7A00]/10 rounded-full text-[#FF7A00]">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white mb-1">Click or drag and drop</h3>
                                <p className="text-[#9CA3AF] text-sm">PDF, XLSX, CSV, up to 50MB</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* UPLOADED STATE */}
                {state === 'uploaded' && file && (
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between p-4 bg-[#0B0F19] border border-[#2A2F3A] rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/10 text-green-500 rounded">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                        <line x1="16" y1="13" x2="8" y2="13" />
                                        <line x1="16" y1="17" x2="8" y2="17" />
                                        <polyline points="10 9 9 9 8 9" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">{file.name}</p>
                                    <p className="text-xs text-[#9CA3AF] mt-0.5">{formatFileSize(file.size)} • Uploaded successfully</p>
                                </div>
                            </div>
                            <button onClick={() => { setFile(null); setState('idle'); }} className="text-[#9CA3AF] hover:text-white transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        <button
                            onClick={processDocument}
                            className="w-full py-3 bg-[#FF7A00] hover:bg-[#FF9A3D] text-white font-medium rounded-lg transition-colors"
                        >
                            Process Document
                        </button>
                    </div>
                )}

                {/* PROCESSING STATE */}
                {state === 'processing' && (
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-medium text-white animate-pulse">Running AI Pipeline...</h3>
                            <span className="text-sm font-medium text-[#FF7A00] bg-[#FF7A00]/10 px-3 py-1 rounded-full">
                                {Math.round(((currentStepIndex + 1) / PROCESSING_STEPS.length) * 100)}%
                            </span>
                        </div>

                        <div className="space-y-4">
                            {PROCESSING_STEPS.map((step, index) => {
                                const isCompleted = index < currentStepIndex;
                                const isActive = index === currentStepIndex;
                                const isPending = index > currentStepIndex;

                                return (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors duration-300
                                            ${isCompleted ? 'bg-green-500/10 border-green-500 text-green-500' :
                                                isActive ? 'bg-[#FF7A00]/10 border-[#FF7A00] text-[#FF7A00]' :
                                                    'bg-[#0B0F19] border-[#2A2F3A] text-[#5C667B]'}`}>
                                            {isCompleted ? (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            ) : isActive ? (
                                                <div className="w-2.5 h-2.5 bg-[#FF7A00] rounded-full animate-ping" />
                                            ) : (
                                                <span className="text-xs font-semibold">{index + 1}</span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-medium transition-colors duration-300 ${isPending ? 'text-[#5C667B]' : 'text-white'}`}>{step}</p>
                                            <p className={`text-xs mt-0.5 transition-colors duration-300 ${isActive ? 'text-[#FF7A00]' : isCompleted ? 'text-green-500' : 'text-[#5C667B]'}`}>
                                                {isCompleted ? 'Completed' : isActive ? 'Processing...' : 'Pending'}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* COMPLETED STATE */}
                {state === 'completed' && (
                    <div className="flex flex-col items-center justify-center text-center py-10 gap-6 animate-in fade-in duration-500">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-2">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Financial workbook successfully generated.</h3>
                            <p className="text-[#9CA3AF] text-sm">All processing steps completed without errors.</p>
                        </div>
                        <button
                            onClick={() => onNavigate('workbook-generator')}
                            className="mt-4 px-6 py-3 bg-[#FF7A00] hover:bg-[#FF9A3D] text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                        >
                            View Workbook
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                    </div>
                )}
            </Card>
        </>
    );
}
