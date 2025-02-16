// src/components/ui/tabs/TabsTrigger.jsx
import React from 'react';

const TabsTrigger = ({ value, onClick, children }) => {
  return (
    <button onClick={onClick} value={value}>
      {children}
    </button>
  );
};

export default TabsTrigger;