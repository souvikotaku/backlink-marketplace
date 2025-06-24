import React, { useState } from 'react';
import WebsiteHeader from './WebsiteHeader';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import WebsiteDetailsForm from './WebsiteDetailsForm';
import OfferForm from './OfferForm';
import ArticleSpecification from './ArticleSpecification';
import { updateWebsite } from '../store/websiteSlice';

const WebsiteDetailsPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const websites = useSelector((state: RootState) => state.websites.websites);
  const websiteToEdit = id ? websites.find((w) => w.id === parseInt(id)) : null;

  const handleWebsiteDetailsSubmit = (data: any) => {
    if (id) {
      dispatch(updateWebsite({ ...websiteToEdit, ...data }));
    }
  };

  const handleArticleSpecificationSubmit = (data: any) => {
    if (id) {
      const updatedWebsite: any = {
        ...websiteToEdit,
        isWritingIncluded: data.isWritingIncluded,
        articleLengthOption: data.articleLengthOption,
        articleWordsMin: data.articleWordsMin,
        articleWordsMax: data.articleWordsMax,
        allowDofollow: data.allowDofollow,
        linkType: data.linkType,
        taggingPolicy: data.taggingPolicy,
        advertiserLinksOption: data.advertiserLinksOption,
        advertiserLinksMin: data.advertiserLinksMin,
        advertiserLinksMax: data.advertiserLinksMax,
        otherLinks: data.otherLinks,
        description: data.description,
      };
      dispatch(updateWebsite(updatedWebsite));
    }
  };

  return (
    <div className='container mx-auto pb-4'>
      <WebsiteHeader />
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6'>
          {id ? 'Edit Website' : 'Add Website'}
        </h2>
        <WebsiteDetailsForm
          websiteToEdit={websiteToEdit}
          onSubmit={handleWebsiteDetailsSubmit}
        />
        <OfferForm websiteToEdit={websiteToEdit} />
        <ArticleSpecification
          websiteToEdit={websiteToEdit}
          onSubmit={handleArticleSpecificationSubmit}
        />
      </div>
    </div>
  );
};

export default WebsiteDetailsPage;
