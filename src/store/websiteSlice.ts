import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Website {
  id: number;
  url: string;
  country: string;
  language: string;
  category: string | string[];
  guestPostPrice1: number;
  linkInsertionPrice1: number;
  guestPostPrice?: number | any;
  linkInsertionPrice?: number | any;
  homePagePrice?: number;
  description?: string;
  homePageDescription?: string;
  articleWordsMin?: number;
  articleWordsMax?: number;
  articleLinksMax?: number;
  isWritingIncluded?: boolean;
  articleLengthOption?: string;
  allowDofollow?: boolean;
  linkType?: string;
  taggingPolicy?: string;
  advertiserLinksOption?: string;
  advertiserLinksMin?: number;
  advertiserLinksMax?: number;
  otherLinks?: boolean;
  articleDescription?: string;
}

const defaultWebsites: Website[] = [
  {
    id: 1,
    url: 'https://example.com',
    country: 'United States',
    language: 'English',
    category: 'Environment',
    guestPostPrice1: 0,
    linkInsertionPrice1: 0,
    guestPostPrice: { Gambling: 0, Crypto: 0, Adult: 0 },
    linkInsertionPrice: { Gambling: 0, Crypto: 0, Adult: 0 },
    homePagePrice: 0,
    description:
      'sdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsd',
    homePageDescription: 'abc',
    articleWordsMin: 0,
    articleWordsMax: 0,
    articleLinksMax: 0,
    isWritingIncluded: true,
    articleLengthOption: 'notLimited',
    allowDofollow: false,
    linkType: 'brandOnly',
    taggingPolicy: 'noTag',
    advertiserLinksOption: 'noTag',
    advertiserLinksMin: undefined,
    advertiserLinksMax: undefined,
    otherLinks: false,
    articleDescription: 'abc',
  },
  {
    id: 2,
    url: 'https://example.de',
    country: 'Germany',
    language: 'German',
    category: ['Events', 'Family / Parenting'],
    guestPostPrice1: 0,
    linkInsertionPrice1: 0,
    guestPostPrice: { Gambling: 0, Crypto: 0, Adult: 0 },
    linkInsertionPrice: { Gambling: 0, Crypto: 0, Adult: 0 },
    homePagePrice: 0,
    description:
      'sdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsdsdsddsd',
    homePageDescription: 'abc',
    articleWordsMin: 0,
    articleWordsMax: 0,
    articleLinksMax: 0,
    isWritingIncluded: true,
    articleLengthOption: 'notLimited',
    allowDofollow: false,
    linkType: 'brandOnly',
    taggingPolicy: 'noTag',
    advertiserLinksOption: 'noTag',
    advertiserLinksMin: undefined,
    advertiserLinksMax: undefined,
    otherLinks: false,
    articleDescription: 'abc',
  },
];

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('websites');
    if (serializedState === null) {
      return {
        websites: defaultWebsites, // Use default websites if no data in localStorage
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state from localStorage:', err);
    return {
      websites: defaultWebsites, // Fallback to default websites on error
    };
  }
};

const saveState = (state: { websites: Website[] }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('websites', serializedState);
  } catch (err) {
    console.error('Could not save state to localStorage:', err);
  }
};

const initialState: { websites: Website[] } = loadState();

const websiteSlice = createSlice({
  name: 'websites',
  initialState,
  reducers: {
    addWebsite: (state, action: PayloadAction<Website>) => {
      state.websites.push(action.payload);
      saveState(state); // Save to localStorage after adding
    },
    updateWebsite: (state, action: PayloadAction<Website>) => {
      const index = state.websites.findIndex((w) => w.id === action.payload.id);
      if (index !== -1) {
        state.websites[index] = action.payload;
        saveState(state); // Save to localStorage after updating
      }
    },
  },
});

export const { addWebsite, updateWebsite } = websiteSlice.actions;
export default websiteSlice.reducer;
