import React from 'react';

const Table = ({ children }) => {
    return (
        <div className="table-surface">
            {/* Table Border/Frame */}
            <div className="absolute inset-4 border-[12px] border-amber-900/40 rounded-[3rem] pointer-events-none"></div>

            {/* Interaction Layer */}
            <div className="relative z-10 w-full h-full flex flex-col items-center p-8">
                {children}
            </div>

            {/* Ambient Lighting */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        </div>
    );
};

export default Table;
