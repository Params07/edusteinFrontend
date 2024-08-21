import React, { useState, useRef, useEffect } from 'react';

const DropDownMenu = ({ value, options, onOptionClick,id }) => {
  const [visible, setVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const handleDropdownToggle = () => {
    setVisible(!visible);
  };

  const handleOptionClick = (option) => {
    onOptionClick(option,id);
    setVisible(false);
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY, 
        left: rect.left + window.scrollX 
      });
    }
  }, [visible]);

  return (
    <div className="relative">
      <button
        onClick={handleDropdownToggle}
        className="text-gray-600 hover:text-gray-900"
        ref={buttonRef}
      >
        {value}
      </button>
      {visible && (
        <div
          className="fixed bg-white border rounded-lg border-gray-300 shadow-lg w-48 max-h-60 overflow-y-auto"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
          ref={dropdownRef}
        >
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
