import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeftRight } from 'lucide-react';

const ResizableSplitPane = ({
  leftContent,
  rightContent,
  defaultLeftWidth = 50,
  minLeftWidth = 20,
  maxLeftWidth = 80,
}) => {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setLeftWidth(defaultLeftWidth);
  }, [defaultLeftWidth]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      let newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

      if (newLeftWidth < minLeftWidth) newLeftWidth = minLeftWidth;
      if (newLeftWidth > maxLeftWidth) newLeftWidth = maxLeftWidth;

      setLeftWidth(newLeftWidth);
    },
    [isDragging, minLeftWidth, maxLeftWidth]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className="flex w-full h-full overflow-hidden select-none"
      style={{ cursor: isDragging ? 'col-resize' : 'default' }}
    >
      <div className="h-full overflow-auto" style={{ width: leftWidth === 100 ? '100%' : `${leftWidth}%` }}>
        {leftContent}
      </div>

      {leftWidth < 100 && (
        <div
          className="relative w-4 h-full cursor-col-resize flex items-center justify-center group z-10"
          onMouseDown={handleMouseDown}
        >
          <div className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-px transition-colors duration-150 ${isDragging ? 'bg-nebula-cyan/70' : 'bg-white/10'} group-hover:bg-nebula-cyan/60`} />
          <div className={`absolute w-9 h-9 rounded-xl bg-[#0a0514]/80 backdrop-blur-xl border border-white/10 shadow-[0_12px_24px_rgba(0,0,0,0.55)] flex items-center justify-center transition-all duration-150 ${isDragging ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} group-hover:opacity-100 group-hover:scale-100`}>
            <ArrowLeftRight className="w-4 h-4 text-nebula-cyan" />
          </div>
        </div>
      )}

      {leftWidth < 100 && (
        <div
          className="h-full overflow-auto flex-1"
          style={{ width: `${100 - leftWidth}%` }}
        >
          {rightContent}
        </div>
      )}
    </div>
  );
};

export default ResizableSplitPane;
