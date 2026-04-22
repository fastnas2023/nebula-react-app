import React from 'react';

export default function Background() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0">
            <div className="bg-space fixed inset-0"></div>
            <div className="orb-1 fixed"></div>
            <div className="orb-2 fixed"></div>
            <div className="bg-noise fixed inset-0"></div>
        </div>
    );
}
