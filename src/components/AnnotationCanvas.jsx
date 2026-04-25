import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

const AnnotationCanvas = ({ onClose, clearTrigger }) => {
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    
    // 初始化并适应窗口大小
    const updateCanvasSize = () => {
      // 获取当前的绘画数据，以便在改变大小后恢复
      let imageData = null;
      if (contextRef.current && canvas.width > 0 && canvas.height > 0) {
        imageData = contextRef.current.getImageData(0, 0, canvas.width, canvas.height);
      }

      // 为了在高清屏幕上显示清晰，设置实际像素大小为窗口大小的2倍
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const context = canvas.getContext('2d');
      context.scale(2, 2);
      context.lineCap = 'round';
      context.strokeStyle = '#ef4444'; // Tailwind的red-500
      context.lineWidth = 4;
      contextRef.current = context;

      // 如果有之前的绘画数据，则恢复
      if (imageData) {
        context.putImageData(imageData, 0, 0);
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    const { x, y } = getCoordinates(e);
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      contextRef.current.closePath();
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    // 清除整个画布（考虑到之前的scale，使用原始canvas的宽高）
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (clearTrigger > 0) {
      clearCanvas();
    }
  }, [clearTrigger]);

  return (
    <div className="fixed inset-0 z-[150] pointer-events-none">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        onTouchCancel={stopDrawing}
        className="pointer-events-auto touch-none w-full h-full bg-transparent cursor-crosshair"
      />
      {/* 
        The Clear and Close buttons have been moved to the FloatingPresenterBar 
        for a cleaner UX, next to the Pen tool.
      */}
    </div>
  );
};

export default AnnotationCanvas;
