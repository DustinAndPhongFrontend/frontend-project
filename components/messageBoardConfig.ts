// Configuration for the message board
export const MESSAGE_BOARD_CONFIG = {
   DISPLAYED_QUEST_COUNT: 6,
   GOOGLE_FONTS_URL: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Crimson+Text:ital,wght@0,400;1,400&display=swap'
};

// Responsive breakpoints
export const BREAKPOINTS = {
   MOBILE: 480,
   TABLET: 768,
   DESKTOP: 1024,
   LARGE_DESKTOP: 1200
};

// Helper function to check if we're on mobile
export const isMobile = () => {
   if (typeof window !== 'undefined') {
      return window.innerWidth < BREAKPOINTS.MOBILE;
   }
   return false;
};

// Helper function to get button layout based on screen size
export const getButtonLayout = () => {
   if (typeof window !== 'undefined') {
      return window.innerWidth < BREAKPOINTS.MOBILE ? 'column' : 'row';
   }
   return 'row';
};

// Navigation button configurations
export const NAV_BUTTONS = {
   PREVIOUS: {
      text: '←',
      ariaLabel: 'Previous Quest'
   },
   NEXT: {
      text: '→',
      ariaLabel: 'Next Quest'
   }
};

// Modal button configurations
export const MODAL_BUTTONS = {
   ACCEPT: {
      text: '⚔️ Accept Quest',
      type: 'accept' as const
   },
   CANCEL: {
      text: '❌ Cancel',
      type: 'cancel' as const
   }
};

// Message texts
export const MESSAGES = {
   ALREADY_ACCEPTED: "You have already accepted this quest! Check your Quest Log.",
   QUEST_ACCEPTED: (questTitle: string) => `Quest "${questTitle}" added to quest log and replaced with new quest!`,
   QUEST_REPLACED: (oldId: number, newTitle: string) => `Replaced quest ${oldId} with new quest: ${newTitle}`,
   NO_MORE_QUESTS: "No more available quests to replace with"
};