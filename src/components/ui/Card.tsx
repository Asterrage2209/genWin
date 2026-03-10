import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = '' }: CardProps) {
    return (
        <div className={`bg-[#141A26] border border-[#2A2F3A] rounded-xl p-5 shadow-md ${className}`}>
            {children}
        </div>
    );
}
