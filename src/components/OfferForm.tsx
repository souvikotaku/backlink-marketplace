import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { addWebsite, updateWebsite } from '../store/websiteSlice';
import { RootState } from '../store';
import { useNavigate, useParams } from 'react-router-dom';

const OfferForm: React.FC<any> = ({
  samePriceForAllNiches,
  errors,
  register,
}: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const [activeTab, setActiveTab] = useState('normalOffers');

  return (
    <>
      <h3 className='font-semibold text-gray-700 mb-4 mt-12 detailhighfont'>
        Create offer
      </h3>
      <div className='bg-white p-6 rounded-lg shadow-md space-y-8'>
        <div className='border-b border-gray-200'>
          <nav className='flex space-x-6'>
            <button
              type='button'
              onClick={() => {
                if (setActiveTab) setActiveTab('normalOffers');
              }}
              className={`pb-2 text-sm font-medium ${
                activeTab === 'normalOffers'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Normal Offer
            </button>
            <button
              type='button'
              onClick={() => {
                if (setActiveTab) setActiveTab('articleSpecs');
              }}
              className={`pb-2 text-sm font-medium ${
                activeTab === 'articleSpecs'
                  ? 'text-purple-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Grey Niche Offer
            </button>
            <button
              type='button'
              onClick={() => {
                if (setActiveTab) setActiveTab('homePageOffer');
              }}
              className={`pb-2 text-sm font-medium ${
                activeTab === 'homePageOffer'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Homepage Link
            </button>
          </nav>
        </div>
        <div className='mt-6'>
          {activeTab === 'normalOffers' && (
            <div>
              <div className='grid grid-cols-4 gap-4'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Guest Posting
                  </label>
                  {/* <input
                    type='number'
                    {...register('guestPostPrice1', {
                      valueAsNumber: true,
                    })}
                    className='w-full p-2 border rounded-md'
                    placeholder='Enter price'
                  />
                  {errors.guestPostPrice1 && (
                    <p className='text-red-500 text-sm'>
                      {errors.guestPostPrice1.message}
                    </p>
                  )} */}
                  <div className='relative'>
                    <span
                      className='absolute inset-y-0 left-0 flex items-center pl-4 pr-4'
                      style={{
                        borderRight: '1px solid #EAEAEA',
                        color: 'lightgrey',
                        fontSize: '19px',
                      }}
                    >
                      $
                    </span>
                    <input
                      type='number'
                      {...register('guestPostPrice1', { valueAsNumber: true })}
                      className='w-full pl-12 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
                      placeholder='Enter price'
                      style={{ paddingLeft: '3.5rem' }}
                    />
                    {errors.guestPostPrice1 && (
                      <p className='text-red-500 text-sm'>
                        {errors.guestPostPrice1.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Link Insertion
                  </label>
                  {/* <input
                    type='number'
                    {...register('linkInsertionPrice1', {
                      valueAsNumber: true,
                    })}
                    className='w-full p-2 border rounded-md'
                    placeholder='Enter price'
                  />
                  {errors.linkInsertionPrice1 && (
                    <p className='text-red-500 text-sm'>
                      {errors.linkInsertionPrice1.message}
                    </p>
                  )} */}
                  <div className='relative'>
                    <span
                      className='absolute inset-y-0 left-0 flex items-center pl-4 pr-4'
                      style={{
                        borderRight: '1px solid #EAEAEA',
                        color: 'lightgrey',
                        fontSize: '19px',
                      }}
                    >
                      $
                    </span>
                    <input
                      type='number'
                      {...register('linkInsertionPrice1', {
                        valueAsNumber: true,
                      })}
                      className='w-full pl-12 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
                      placeholder='Enter price'
                      style={{ paddingLeft: '3.5rem' }}
                    />
                    {errors.linkInsertionPrice1 && (
                      <p className='text-red-500 text-sm'>
                        {errors.linkInsertionPrice1.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'homePageOffer' && (
            <div>
              <div className='grid grid-cols-4 gap-4'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Price
                  </label>
                  {/* <input
                    type='number'
                    {...register('homePagePrice', { valueAsNumber: true })}
                    className='w-full p-2 border rounded-md'
                    placeholder='Enter price'
                  />
                  {errors.homePagePrice && (
                    <p className='text-red-500 text-sm'>
                      {errors.homePagePrice.message}
                    </p>
                  )} */}
                  <div className='relative'>
                    <span
                      className='absolute inset-y-0 left-0 flex items-center pl-4 pr-4'
                      style={{
                        borderRight: '1px solid #EAEAEA',
                        color: 'lightgrey',
                        fontSize: '19px',
                      }}
                    >
                      $
                    </span>
                    <input
                      type='number'
                      {...register('homePagePrice', {
                        valueAsNumber: true,
                      })}
                      className='w-full pl-12 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
                      placeholder='Enter price'
                      style={{ paddingLeft: '3.5rem' }}
                    />
                    {errors.homePagePrice && (
                      <p className='text-red-500 text-sm'>
                        {errors.homePagePrice.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-3 gap-4 mt-6'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Offer Guidelines
                  </label>
                  <textarea
                    {...register('homePageDescription')}
                    className='w-full p-2 border rounded-md h-24'
                    placeholder='Enter description'
                  />
                  {errors.homePageDescription && (
                    <p className='text-red-500 text-sm'>
                      {errors.homePageDescription.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'articleSpecs' && (
            <div>
              <div className='flex items-center mb-4'>
                <input
                  type='checkbox'
                  {...register('samePriceForAllNiches')}
                  className='mr-2 text-purple-600'
                />
                <span className='text-sm text-gray-700'>
                  I offer the same price for all grey niches
                </span>
              </div>
              {samePriceForAllNiches && (
                <div className='grid grid-cols-4 gap-4 mt-4 mb-4'>
                  <div>
                    <label className='block text-sm font-medium mb-1'>
                      Enter Price
                    </label>
                    {/* <input
                      type='number'
                      {...register('greyNichePrice', {
                        valueAsNumber: true,
                      })}
                      className='w-full p-2 border rounded-md'
                      placeholder='Enter price'
                    />
                    {errors.greyNichePrice && (
                      <p className='text-red-500 text-sm'>
                        {errors.greyNichePrice.message}
                      </p>
                    )} */}
                    <div className='relative'>
                      <span
                        className='absolute inset-y-0 left-0 flex items-center pl-4 pr-4'
                        style={{
                          borderRight: '1px solid #EAEAEA',
                          color: 'lightgrey',
                          fontSize: '19px',
                        }}
                      >
                        $
                      </span>
                      <input
                        type='number'
                        {...register('greyNichePrice', {
                          valueAsNumber: true,
                        })}
                        className='w-full pl-12 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
                        placeholder='Enter price'
                        style={{ paddingLeft: '3.5rem' }}
                      />
                      {errors.greyNichePrice && (
                        <p className='text-red-500 text-sm'>
                          {errors.greyNichePrice.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className='grid grid-cols-4 gap-4'>
                {(['Gambling', 'Crypto', 'Adult'] as const).map((niche) => (
                  <div key={niche}>
                    <label
                      className='block text-sm font-medium mb-1'
                      style={{
                        color: samePriceForAllNiches ? 'lightgrey' : 'black',
                      }}
                    >
                      {niche}
                    </label>
                    <div className='space-y-2 mt-3'>
                      <label
                        className='block text-xs font-medium mb-1'
                        style={{
                          color: samePriceForAllNiches ? 'lightgrey' : 'black',
                        }}
                      >
                        Price for Guest Posting
                      </label>
                      {/* <input
                        type='number'
                        {...register(`guestPostPrice.${niche}` as const, {
                          valueAsNumber: true,
                        })}
                        className='w-full p-2 border rounded-md'
                        placeholder='Enter price'
                        disabled={samePriceForAllNiches}
                      /> */}
                      <div className='relative'>
                        <span
                          className='absolute inset-y-0 left-0 flex items-center pl-4 pr-4'
                          style={{
                            borderRight: '1px solid #EAEAEA',
                            color: 'lightgrey',
                            fontSize: '19px',
                          }}
                        >
                          $
                        </span>
                        <input
                          type='number'
                          {...register(`guestPostPrice.${niche}` as const, {
                            valueAsNumber: true,
                          })}
                          className='w-full pl-12 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
                          placeholder='Enter price'
                          style={{
                            paddingLeft: '3.5rem',
                            backgroundColor: 'white',
                            color: samePriceForAllNiches
                              ? 'lightgrey'
                              : 'black',
                          }}
                          disabled={samePriceForAllNiches}
                        />
                      </div>
                    </div>
                    <div className='mt-3'>
                      <label
                        className='block text-xs font-medium mb-1'
                        style={{
                          color: samePriceForAllNiches ? 'lightgrey' : 'black',
                        }}
                      >
                        Price for Link Insertion
                      </label>
                      {/* <input
                        type='number'
                        {...register(`linkInsertionPrice.${niche}` as const, {
                          valueAsNumber: true,
                        })}
                        className='w-full p-2 border rounded-md'
                        placeholder='Enter price'
                        disabled={samePriceForAllNiches}
                      /> */}
                      <div className='relative'>
                        <span
                          className='absolute inset-y-0 left-0 flex items-center pl-4 pr-4'
                          style={{
                            borderRight: '1px solid #EAEAEA',
                            color: 'lightgrey',
                            fontSize: '19px',
                          }}
                        >
                          $
                        </span>
                        <input
                          type='number'
                          {...register(`linkInsertionPrice.${niche}` as const, {
                            valueAsNumber: true,
                          })}
                          className='w-full pl-12 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
                          placeholder='Enter price'
                          style={{
                            paddingLeft: '3.5rem',
                            backgroundColor: 'white',
                            color: samePriceForAllNiches
                              ? 'lightgrey'
                              : 'black',
                          }}
                          disabled={samePriceForAllNiches}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OfferForm;
