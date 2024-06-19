export const useMouseDown = (diskRefs, rotationRefs, handleSpin) => {
    const handleMouseDown = (e, disk) => {
      if (e.target.tagName === 'BUTTON') return;
  
      const diskRef = diskRefs.current[disk];
      const rect = diskRef.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const startX = e.clientX;
      const startY = e.clientY;
      const initialAngle = Math.atan2(startY - centerY, startX - centerX);
  
      const handleMouseMove = (e) => {
        const currentX = e.clientX;
        const currentY = e.clientY;
        const newAngle = Math.atan2(currentY - centerY, currentX - centerX);
        let rotation = (newAngle - initialAngle) * (180 / Math.PI);
        if (rotation < -180) rotation += 360;
        if (rotation > 180) rotation -= 360;
        rotation = Math.max(-90, Math.min(90, rotation));
        rotationRefs.current[disk] = rotation;
        diskRef.style.transform = `rotate(${rotation}deg)`;
      };
  
      const handleMouseUp = () => {
        if (Math.abs(rotationRefs.current[disk]) > 30) {
          const direction = rotationRefs.current[disk] > 0 ? 'CW' : 'CCW';
          handleSpin(disk, direction);
        }
        diskRef.style.transform = '';
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
  
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };
  
    return handleMouseDown;
  };