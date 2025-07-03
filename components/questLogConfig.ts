// Configuration constants
export const QUEST_LOG_CONFIG = {
   BREAKPOINTS: {
      MOBILE: 480,
      TABLET: 768,
      DESKTOP: 1024
   },
   EMPTY_STATE_ICONS: {
      ACTIVE: '📜',
      COMPLETED: '🏆'
   }
};

// Tab configuration
export const TAB_CONFIG = {
   ACTIVE: {
      id: 'active' as const,
      label: 'Active',
      emptyMessage: 'No active quests. Visit the Message Board to accept new quests!'
   },
   COMPLETED: {
      id: 'completed' as const,
      label: 'Completed', 
      emptyMessage: 'No completed quests yet. Complete some active quests to see them here!'
   }
};

// Helper functions
export const isMobileView = (): boolean => {
   if (typeof window !== 'undefined') {
      return window.innerWidth < QUEST_LOG_CONFIG.BREAKPOINTS.MOBILE;
   }
   return false;
};

export const isTabletView = (): boolean => {
   if (typeof window !== 'undefined') {
      return window.innerWidth < QUEST_LOG_CONFIG.BREAKPOINTS.DESKTOP;
   }
   return false;
};

export const getGridClass = (isMobile: boolean): string => {
   return isMobile ? 'questGridSingle' : 'questGridMulti';
};

export const getCardClass = (isMobile: boolean): string => {
   return isMobile ? 'questCardColumn' : 'questCardRow';
};

// Button text configuration
export const BUTTON_TEXT = {
   COMPLETE_QUEST: 'Complete Quest',
   CLOSE: 'Close',
   COMPLETE: 'Complete'
};

// Date formatting
export const formatDate = (dateString?: string): string => {
   if (!dateString) return '';
   return dateString;
};