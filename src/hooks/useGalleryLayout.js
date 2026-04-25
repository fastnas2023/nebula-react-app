import { useState, useEffect, useRef } from 'react';

export default function useGalleryLayout(participantCount, aspectRatio = 16 / 9, gap = 16) {
    const containerRef = useRef(null);
    const [layout, setLayout] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!containerRef.current || participantCount === 0) return;

        const calculateLayout = (containerWidth, containerHeight) => {
            let bestArea = 0;
            let bestTileWidth = 0;
            let bestTileHeight = 0;

            for (let cols = 1; cols <= participantCount; cols++) {
                const rows = Math.ceil(participantCount / cols);
                
                // Available dimensions per tile
                const availableWidth = (containerWidth - gap * (cols - 1)) / cols;
                const availableHeight = (containerHeight - gap * (rows - 1)) / rows;

                // Calculate actual dimensions preserving aspect ratio
                let tileWidth = availableWidth;
                let tileHeight = tileWidth / aspectRatio;

                if (tileHeight > availableHeight) {
                    tileHeight = availableHeight;
                    tileWidth = tileHeight * aspectRatio;
                }

                const area = tileWidth * tileHeight * participantCount;

                if (area > bestArea) {
                    bestArea = area;
                    bestTileWidth = tileWidth;
                    bestTileHeight = tileHeight;
                }
            }

            setLayout({
                width: Math.floor(bestTileWidth),
                height: Math.floor(bestTileHeight)
            });
        };

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                calculateLayout(entry.contentRect.width, entry.contentRect.height);
            }
        });

        observer.observe(containerRef.current);
        
        // Initial calculation
        calculateLayout(containerRef.current.clientWidth, containerRef.current.clientHeight);

        return () => {
            observer.disconnect();
        };
    }, [participantCount, aspectRatio, gap]);

    return { containerRef, layout };
}