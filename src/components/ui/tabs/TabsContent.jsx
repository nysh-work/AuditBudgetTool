// src/components/ui/tabs/TabsContent.jsx
import React from 'react';

const TabsContent = ({ value, children }) => {
  return (
    <div value={value}>
      {children}
    </div>
  );
};

export default TabsContent;