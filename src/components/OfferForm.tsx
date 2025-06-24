import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { addWebsite, updateWebsite } from '../store/websiteSlice';
import { RootState } from '../store';
import { useNavigate, useParams } from 'react-router-dom';

const offerSchema = z.object({
  guestPostPrice1: z.number().nonnegative('Must be non-negative'),
  linkInsertionPrice1: z.number().nonnegative('Must be non-negative'),
  homePagePrice: z.number().nonnegative('Must be non-negative'),
  homePageDescription: z.string().optional(),
  articleWordsMin: z.number().nonnegative('Must be non-negative'),
  articleWordsMax: z.number().nonnegative('Must be non-negative'),
  articleLinksMax: z.number().nonnegative('Must be non-negative'),
  samePriceForAllNiches: z.boolean().optional(),
  greyNichePrice: z.number().nonnegative('Must be non-negative').optional(),
  guestPostPrice: z.union([
    z.number().nonnegative('Must be non-negative'),
    z.object({
      Gambling: z.number().nonnegative('Must be non-negative').optional(),
      Crypto: z.number().nonnegative('Must be non-negative').optional(),
      Adult: z.number().nonnegative('Must be non-negative').optional(),
    }),
  ]),
  linkInsertionPrice: z.union([
    z.number().nonnegative('Must be non-negative'),
    z.object({
      Gambling: z.number().nonnegative('Must be non-negative').optional(),
      Crypto: z.number().nonnegative('Must be non-negative').optional(),
      Adult: z.number().nonnegative('Must be non-negative').optional(),
    }),
  ]),
});

type OfferFormData = z.infer<typeof offerSchema>;

interface OfferFormProps {
  websiteToEdit?: OfferFormData | (any & { id?: number });
}

const OfferForm: React.FC<OfferFormProps> = ({ websiteToEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  //   const websites = useSelector((state: RootState) => state.websites.websites);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<OfferFormData>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      guestPostPrice1: 0,
      linkInsertionPrice1: 0,
      guestPostPrice: {
        Gambling: 0,
        Crypto: 0,
        Adult: 0,
      },
      linkInsertionPrice: {
        Gambling: 0,
        Crypto: 0,
        Adult: 0,
      },
      homePagePrice: 0,
      homePageDescription: '',
      articleWordsMin: 0,
      articleWordsMax: 0,
      articleLinksMax: 0,
      samePriceForAllNiches: false,
      greyNichePrice: 0,
    },
  });

  const [activeTab, setActiveTab] = useState('normalOffers');

  useEffect(() => {
    if (websiteToEdit) {
      const normalizedGuestPostPrice =
        typeof websiteToEdit.guestPostPrice === 'number'
          ? websiteToEdit.guestPostPrice
          : websiteToEdit.guestPostPrice || {
              Gambling: 0,
              Crypto: 0,
              Adult: 0,
            };
      const normalizedLinkInsertionPrice =
        typeof websiteToEdit.linkInsertionPrice === 'number'
          ? websiteToEdit.linkInsertionPrice
          : websiteToEdit.linkInsertionPrice || {
              Gambling: 0,
              Crypto: 0,
              Adult: 0,
            };

      reset({
        ...websiteToEdit,
        guestPostPrice: normalizedGuestPostPrice,
        linkInsertionPrice: normalizedLinkInsertionPrice,
      });
    } else {
      localStorage.removeItem('offerFormData'); // Clear saved data
      reset({
        guestPostPrice1: 0,
        linkInsertionPrice1: 0,
        guestPostPrice: { Gambling: 0, Crypto: 0, Adult: 0 },
        linkInsertionPrice: { Gambling: 0, Crypto: 0, Adult: 0 },
        homePagePrice: 0,
        homePageDescription: '',
        articleWordsMin: 0,
        articleWordsMax: 0,
        articleLinksMax: 0,
        samePriceForAllNiches: false,
        greyNichePrice: 0,
      });
    }
  }, [websiteToEdit, reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('offerFormData', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: OfferFormData) => {
    const websiteDetails = JSON.parse(
      localStorage.getItem('websiteDetailsFormData') || '{}'
    );

    const articleDetails = JSON.parse(
      localStorage.getItem('articleSpecificationFormData') || '{}'
    );
    const websiteData: any = {
      ...websiteDetails,
      ...articleDetails,
      ...data,
      id: id ? parseInt(id) : Date.now(),
    };

    if (id && websiteToEdit) {
      dispatch(updateWebsite(websiteData));
    } else {
      dispatch(addWebsite(websiteData));
    }

    localStorage.removeItem('websiteDetailsFormData');
    localStorage.removeItem('offerFormData');
    localStorage.removeItem('articleSpecificationFormData');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className='font-semibold text-gray-700 mb-4 mt-12 detailhighfont'>
        Create offer
      </h3>
      <div className='bg-white p-6 rounded-lg shadow-md space-y-8'>
        <div className='border-b border-gray-200'>
          <nav className='flex space-x-6'>
            <button
              type='button'
              onClick={() => setActiveTab('normalOffers')}
              className={`pb-2 text-sm font-medium ${
                activeTab === 'normalOffers'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Normal offer
            </button>
            <button
              type='button'
              onClick={() => setActiveTab('articleSpecs')}
              className={`pb-2 text-sm font-medium ${
                activeTab === 'articleSpecs'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Grey Niche offer
            </button>
            <button
              type='button'
              onClick={() => setActiveTab('homePageOffer')}
              className={`pb-2 text-sm font-medium ${
                activeTab === 'homePageOffer'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Homepage link
            </button>
          </nav>
        </div>
        <div className='mt-6'>
          {activeTab === 'normalOffers' && (
            <div>
              <div className='grid grid-cols-4 gap-4'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Guest posting
                  </label>
                  <input
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
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Link insertion
                  </label>
                  <input
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
                  )}
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
                  <input
                    type='number'
                    {...register('homePagePrice', { valueAsNumber: true })}
                    className='w-full p-2 border rounded-md'
                    placeholder='Enter price'
                  />
                  {errors.homePagePrice && (
                    <p className='text-red-500 text-sm'>
                      {errors.homePagePrice.message}
                    </p>
                  )}
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
                  I offer same price for all grey niches
                </span>
              </div>
              {watch('samePriceForAllNiches') && (
                <div className='grid grid-cols-4 gap-4 mt-4 mb-4'>
                  <div>
                    <label className='block text-sm font-medium mb-1'>
                      Enter Price
                    </label>
                    <input
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
                    )}
                  </div>
                </div>
              )}
              <div className='grid grid-cols-4 gap-4'>
                {(['Gambling', 'Crypto', 'Adult'] as const).map((niche) => (
                  <div key={niche}>
                    <label className='block text-sm font-medium mb-1'>
                      {niche}
                    </label>
                    <div className='space-y-2'>
                      <div>
                        <label className='block text-xs font-medium mb-1'>
                          Price for Guest Posting
                        </label>
                        <input
                          type='number'
                          {...register(`guestPostPrice.${niche}` as const, {
                            valueAsNumber: true,
                          })}
                          className='w-full p-2 border rounded-md'
                          placeholder='Enter price'
                          disabled={watch('samePriceForAllNiches')}
                        />
                      </div>
                      <div>
                        <label className='block text-xs font-medium mb-1'>
                          Price for Link Insertion
                        </label>
                        <input
                          type='number'
                          {...register(`linkInsertionPrice.${niche}` as const, {
                            valueAsNumber: true,
                          })}
                          className='w-full p-2 border rounded-md'
                          placeholder='Enter price'
                          disabled={watch('samePriceForAllNiches')}
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
      <button
        type='submit'
        className='bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 mt-6'
      >
        Save
      </button>
    </form>
  );
};

export default OfferForm;
