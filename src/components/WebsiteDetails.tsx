import React from 'react';
import WebsiteHeader from './WebsiteHeader';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import WebsiteDetailsForm from './WebsiteDetailsForm';
import OfferForm from './OfferForm';

const WebsiteDetailsPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const websites = useSelector((state: RootState) => state.websites.websites);
  const websiteToEdit = id ? websites.find((w) => w.id === parseInt(id)) : null;

  return (
    <div className='container mx-auto pb-4'>
      <WebsiteHeader />
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6'>
          {id ? 'Edit Website' : 'Add Website'}
        </h2>
        <WebsiteDetailsForm websiteToEdit={websiteToEdit} />
        <OfferForm websiteToEdit={websiteToEdit} />
      </div>
    </div>
  );
};

export default WebsiteDetailsPage;
