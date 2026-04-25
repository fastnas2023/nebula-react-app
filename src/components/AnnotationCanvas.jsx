import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

const AnnotationCanvas = ({ onClose }) => {
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
    const context = canvas.getContext('2d');
    // 清除整个画布（考虑到之前的scale，使用原始canvas的宽高）
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

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
      <div className="absolute top-24 right-6 pointer-events-auto flex items-center gap-2 z-[200]">
        <button
          onClick={clearCanvas}
          className="glass-panel text-white hover:text-red-400 hover:bg-white/10 font-bold py-2.5 px-5 rounded-xl shadow-2xl transition-all flex items-center gap-2 border border-white/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {t('annotation.clearCanvas')}
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="glass-panel text-white hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 font-medium p-2.5 rounded-xl shadow-2xl transition-all flex items-center justify-center border border-white/20"
            title={t('annotation.close')}
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AnnotationCanvas;
