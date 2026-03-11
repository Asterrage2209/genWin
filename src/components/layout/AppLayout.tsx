import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { CursorTrail } from '../ui/CursorTrail';

interface AppLayoutProps {
    children: ReactNode;
    activePath: string;
    onNavigate: (path: string) => void;
}

export function AppLayout({ children, activePath, onNavigate }: AppLayoutProps) {
    return (
        <div className="flex h-screen bg-[#0B0F19] text-gray-200 overflow-hidden relative">
            <CursorTrail />
            <Sidebar activePath={activePath} onNavigate={onNavigate} />
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-[1300px] mx-auto p-6 space-y-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
