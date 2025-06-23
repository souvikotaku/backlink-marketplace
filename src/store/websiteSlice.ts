import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Website {
  id: number;
  url: string;
  country: string;
  language: string;
  category: string;
  guestPostPrice?: number;
  linkInsertionPrice?: number;
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
      url: 'example.com',
      country: 'United States',
      language: 'English',
      category: 'Computer & Electronics',
    },
    {
      id: 2,
      url: 'example.de',
      country: 'Germany',
      language: 'German',
      category: 'Entertainment',
    },
  ],
};

const websiteSlice = createSlice({
  name: 'websites',
  initialState,
  reducers: {
    addWebsite: (state, action: PayloadAction<Website>) => {
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
