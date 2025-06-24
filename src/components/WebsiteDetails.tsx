import React, { useState, useRef } from 'react';
import WebsiteHeader from './WebsiteHeader';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import WebsiteDetailsForm from './WebsiteDetailsForm';
import OfferForm from './OfferForm';
import ArticleSpecification from './ArticleSpecification';
import { updateWebsite } from '../store/websiteSlice';
import './style.css';
import { IoMdCheckmark } from 'react-icons/io';
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md';
import { FaCircle } from 'react-icons/fa6';

const WebsiteDetailsPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const websites = useSelector((state: RootState) => state.websites.websites);
  const websiteToEdit = id ? websites.find((w) => w.id === parseInt(id)) : null;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(!!websiteToEdit);
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleAccept = () => {
    setIsAccepted(true);
    setIsPopupOpen(false);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsPopupOpen(false);
    }
  };

  return (
    <div className='container mx-auto pb-4'>
      <WebsiteHeader />
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6'>
          {id ? 'Edit Website' : 'Add Website'}
        </h2>
        <div className='mb-6'>
          <div
            className={`flex items-center justify-between p-4 bg-white rounded-lg shadow ${
              isAccepted ? 'border-green-500' : 'border-yellow-500'
            }`}
          >
            <span className='radiofont'>
              Hey, Accept Preconditions before you start the listing!
            </span>
            <div style={{ display: 'inline-flex' }}>
              {/* <div
                className={`px-4 py-1 rounded labelbuttonfont grid ${
                  isAccepted ? 'bg-green-100 ' : 'bg-yellow-100 '
                }`}
              >
                <span
                  style={{
                    fontSize: '10px',
                  }}
                >
                  <FaCircle />
                </span>
                {isAccepted ? 'Accepted' : 'Pending'}
              </div> */}
              <div
                className={`flex items-center px-4 py-1 ${
                  isAccepted ? 'bg-green-100 ' : 'bg-yellow-100 '
                }`}
                style={{
                  width: 'fit-content',
                  borderRadius: '45px',
                }}
              >
                <FaCircle
                  color={isAccepted ? 'green' : 'orange'}
                  style={{
                    marginRight: '8px',
                    fontSize: '10px',
                  }}
                />
                <span className='labelbuttonfont'>
                  {isAccepted ? 'Accepted' : 'Pending'}
                </span>
              </div>
              <button
                onClick={() => setIsPopupOpen(true)}
                className='ml-4 text-blue-500 hover:text-blue-700'
              >
                <span
                  style={{
                    fontSize: '30px',
                    color: 'lightgrey',
                  }}
                >
                  <MdOutlineKeyboardArrowDown />
                </span>
              </button>
            </div>
          </div>
          {isPopupOpen && (
            <div
              className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
              onClick={handleOverlayClick}
            >
              <div
                ref={modalRef}
                className='bg-white p-6 rounded-lg shadow-lg'
                style={{
                  maxWidth: '60rem',
                }}
              >
                <p className='radiofont'>
                  Hey, Accept Preconditions before you start the listing!{' '}
                </p>
                <p className='mb-4 mt-4 radiofontinside'>
                  Before you can proceed with your listing, please make sure to
                  review all required preconditions. Accepting these is
                  mandatory to continue. It ensures your submission meets our
                  platform standards and avoids delays. Listings that don't meet
                  these terms may be rejected. Take a moment to go through them
                  carefully before moving ahead. Once accepted, you'll be able
                  to start listing right away.
                </p>
                {!isAccepted && (
                  <button
                    onClick={handleAccept}
                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
                  >
                    Accept
                  </button>
                )}
                {isAccepted && (
                  <div
                    className='flex items-center mt-4 px-4 py-2 bg-green-100'
                    style={{
                      width: 'fit-content',
                      borderRadius: '45px',
                    }}
                  >
                    <IoMdCheckmark
                      color='green'
                      style={{
                        marginRight: '8px',
                      }}
                    />
                    <span className='labelbuttonfont'>Accepted</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
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
