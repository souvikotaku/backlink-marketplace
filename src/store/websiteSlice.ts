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
  homePageDescription?: string;
  articleWordsMin?: number;
  articleWordsMax?: number;
  articleLinksMax?: number;
}

const initialState: { websites: Website[] } = {
  websites: [
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
      homePageDescription: '',
      articleWordsMin: 0,
      articleWordsMax: 0,
      articleLinksMax: 0,
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
      homePageDescription: '',
      articleWordsMin: 0,
      articleWordsMax: 0,
      articleLinksMax: 0,
    },
    // {
    //   id: 3,
    //   url: 'https://example.com',
    //   country: 'United States',
    //   language: 'English',
    //   category: 'Computer & Electronics',
    // },
    // {
    //   id: 4,
    //   url: 'https://example.de',
    //   country: 'Germany',
    //   language: 'German',
    //   category: 'Entertainment',
    // },
    // {
    //   id: 5,
    //   url: 'https://example.com',
    //   country: 'United States',
    //   language: 'English',
    //   category: 'Computer & Electronics',
    // },
    // {
    //   id: 6,
    //   url: 'https://example.de',
    //   country: 'Germany',
    //   language: 'German',
    //   category: 'Entertainment',
    // },
    // {
    //   id: 7,
    //   url: 'https://example.com',
    //   country: 'United States',
    //   language: 'English',
    //   category: 'Computer & Electronics',
    // },
    // {
    //   id: 8,
    //   url: 'https://example.de',
    //   country: 'Germany',
    //   language: 'German',
    //   category: 'Entertainment',
    // },
    // {
    //   id: 9,
    //   url: 'https://example.com',
    //   country: 'United States',
    //   language: 'English',
    //   category: 'Computer & Electronics',
    // },
    // {
    //   id: 10,
    //   url: 'https://example.de',
    //   country: 'Germany',
    //   language: 'German',
    //   category: 'Entertainment',
    // },
    // {
    //   id: 11,
    //   url: 'https://example.com',
    //   country: 'United States',
    //   language: 'English',
    //   category: 'Computer & Electronics',
    // },
    // {
    //   id: 12,
    //   url: 'https://example.de',
    //   country: 'Germany',
    //   language: 'German',
    //   category: 'Entertainment',
    // },
    // {
    //   id: 13,
    //   url: 'https://example.com',
    //   country: 'United States',
    //   language: 'English',
    //   category: 'Computer & Electronics',
    // },
    // {
    //   id: 14,
    //   url: 'https://example.de',
    //   country: 'Germany',
    //   language: 'German',
    //   category: 'Entertainment',
    // },
    // {
    //   id: 15,
    //   url: 'https://example.com',
    //   country: 'United States',
    //   language: 'English',
    //   category: 'Computer & Electronics',
    // },
  ],
};

const websiteSlice = createSlice({
  name: 'websites',
  initialState,
  reducers: {
    addWebsite: (state, action: PayloadAction<Website>) => {
      console.log('Adding website:', action.payload);
      state.websites.push(action.payload);
    },
    updateWebsite: (state, action: PayloadAction<Website>) => {
      const index = state.websites.findIndex((w) => w.id === action.payload.id);
      if (index !== -1) state.websites[index] = action.payload;
    },
  },
});

export const { addWebsite, updateWebsite } = websiteSlice.actions;
export default websiteSlice.reducer;
