import React, { useEffect, useState } from 'react';

const MouseFollower = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', updateMousePosition);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible]);

    /* 
       We use a "trailing" effect with CSS transition.
       The div is centered on the mouse position using transform translate.
    */
    return (
        <div
            className="fixed pointer-events-none z-50 mix-blend-multiply transition-opacity duration-300"
            style={{
                left: 0,
                top: 0,
                transform: `translate3d(${position.x - 150}px, ${position.y - 150}px, 0)`,
                opacity: isVisible ? 1 : 0,
            }}
        >
            <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-blue-400/20 to-indigo-400/20 blur-[60px]" />
        </div>
    );
};

export default MouseFollower;
