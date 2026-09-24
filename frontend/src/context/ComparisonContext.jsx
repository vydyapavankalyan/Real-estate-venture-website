import React, { createContext, useContext, useState, useEffect } from 'react';

const ComparisonContext = createContext(null);

export const ComparisonProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load from session storage if available
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('rcp_compare_list');
      if (saved) {
        setCompareList(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const saveToSession = (list) => {
    try {
      sessionStorage.setItem('rcp_compare_list', JSON.stringify(list));
    } catch (e) {
      // ignore
    }
  };

  const toggleCompare = (project) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => (p.id || p._id || p.slug) === (project.id || project._id || project.slug));
      let updated;
      if (exists) {
        updated = prev.filter((p) => (p.id || p._id || p.slug) !== (project.id || project._id || project.slug));
      } else {
        if (prev.length >= 3) {
          alert('You can compare a maximum of 3 properties simultaneously.');
          return prev;
        }
        updated = [...prev, project];
      }
      saveToSession(updated);
      return updated;
    });
  };

  const removeFromCompare = (projectId) => {
    setCompareList((prev) => {
      const updated = prev.filter((p) => (p.id || p._id || p.slug) !== projectId);
      saveToSession(updated);
      return updated;
    });
  };

  const clearCompare = () => {
    setCompareList([]);
    saveToSession([]);
    setIsModalOpen(false);
  };

  const isComparing = (project) => {
    if (!project) return false;
    const id = project.id || project._id || project.slug;
    return compareList.some((p) => (p.id || p._id || p.slug) === id);
  };

  return (
    <ComparisonContext.Provider
      value={{
        compareList,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        isComparing,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
