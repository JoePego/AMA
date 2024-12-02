import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Default styles
import 'tippy.js/animations/shift-away-subtle.css'; // Optional animations
import 'tippy.js/themes/light-border.css';
import 'tippy.js/themes/translucent.css'; // Add dark mode theme

const Tooltip = ({
  content,
  children,
  placement = 'top',
  animation = 'shift-away-subtle',
  delay = [0, 100],
  interactive = false,
  arrow = true,
  maxWidth = '250px',
  offset = [0, 10], // Added offset with default value
  ...props
}) => {
  // Track dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const darkModeEnabled = root.classList.contains('dark');
    setIsDarkMode(darkModeEnabled);

    const observer = new MutationObserver(() => {
      setIsDarkMode(root.classList.contains('dark'));
    });

    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <Tippy
      content={content}
      placement={placement}
      animation={animation}
      delay={delay}
      theme={isDarkMode ? 'translucent' : 'light-border'} // Switch theme
      interactive={interactive}
      arrow={arrow}
      maxWidth={maxWidth}
      offset={offset} // Added offset prop
      {...props}
    >
      {children}
    </Tippy>
  );
};

export default Tooltip;