import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form'; // Updated to include Controller
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { addWebsite, updateWebsite } from '../store/websiteSlice';
import { RootState } from '../store';
import { useNavigate, useParams } from 'react-router-dom';
import WebsiteHeader from './WebsiteHeader';
import Select from 'react-select'; // Import react-select
import { countries, languages } from 'countries-list'; // Import countries and languages data

// Schema
const formSchema = z.object({
  url: z.string().url('Invalid URL').min(1, 'URL is required'),
  country: z.string().min(1, 'Country is required'),
  language: z.string().min(1, 'Language is required'),
  category: z.array(z.string()).min(1, 'At least one category is required'),
  description: z.string().min(1, 'Description is required'),
  isOwner: z.boolean().optional(),
  guestPostPrice1: z.number().nonnegative('Must be non-negative'),
  linkInsertionPrice1: z.number().nonnegative('Must be non-negative'),
  homePagePrice: z.number().nonnegative('Must be non-negative'),
  homePageDescription: z.string().min(1, 'Description is required'),
  articleWordsMin: z.number().nonnegative('Must be non-negative'),
  articleWordsMax: z.number().nonnegative('Must be non-negative'),
  articleLinksMax: z.number().nonnegative('Must be non-negative'),
  samePriceForAllNiches: z.boolean().optional(),
  greyNichePrice: z.number().nonnegative('Must be non-negative').optional(),
  // Add nested objects for guestPostPrice and linkInsertionPrice for grey niches
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
type FormData = z.infer<typeof formSchema>;

const WebsiteDetails: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const websites = useSelector((state: RootState) => state.websites.websites);
  const websiteToEdit = id ? websites.find((w) => w.id === parseInt(id)) : null;

  const {
    register,
    handleSubmit,
    control, // Added for react-select integration
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      country: '',
      language: '',
      category: [],
      description: '',
      isOwner: false,
      guestPostPrice1: 0,
      linkInsertionPrice1: 0,
      guestPostPrice: 0,
      linkInsertionPrice: 0,
      homePagePrice: 0,
      homePageDescription: '',
      articleWordsMin: 0,
      articleWordsMax: 0,
      articleLinksMax: 0,
      samePriceForAllNiches: false,
    },
  });

  const selectedCategories = watch('category');
  const [activeTab, setActiveTab] = useState('normalOffers');

  useEffect(() => {
    const savedData = localStorage.getItem('formData');

    if (id) {
      if (websiteToEdit) {
        reset({
          ...websiteToEdit,
          category: Array.isArray(websiteToEdit.category)
            ? websiteToEdit.category
            : websiteToEdit.category
            ? [websiteToEdit.category]
            : [],
        });
      }
    } else {
      if (savedData) {
        reset(JSON.parse(savedData));
      } else {
        reset();
      }
    }
  }, [websiteToEdit, reset, id]);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('formData', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const toggleCategory = (cat: string) => {
    const current = watch('category');
    const updated = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];
    setValue('category', updated);
  };

  const onSubmit = (data: FormData) => {
    const websiteData: any = {
      ...data,
      id: id ? parseInt(id) : Date.now(),
    };

    if (id && websiteToEdit) {
      dispatch(updateWebsite(websiteData));
    } else {
      dispatch(addWebsite(websiteData));
    }

    localStorage.removeItem('formData');
    navigate('/');
  };

  // Helper to get flag image URL from country code
  const getFlagUrl = (code: string) =>
    `https://cdn.jsdelivr.net/npm/country-flag-icons/3x2/${code}.svg`;

  // Prepare country list with flags
  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: country.name,
    label: (
      <span>
        <img
          src={getFlagUrl(code)}
          alt={code}
          style={{
            width: '20px',
            marginRight: '8px',
            display: 'inline-block',
            verticalAlign: 'middle',
          }}
        />
        {country.name}
      </span>
    ),
    code, // Store code for flag import
  }));

  // Prepare language list
  const languageList = Object.entries(languages).map(([code, language]) => ({
    code,
    name: language.name,
  }));

  return (
    <div className='container mx-auto pb-4'>
      <WebsiteHeader />

      <div className='max-w-6xl mx-auto'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6'>
          {id ? 'Edit Website' : 'Add Website'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className='font-semibold text-gray-700 mb-4 detailhighfont'>
            Website detail
          </h3>
          <div
            className='bg-white p-6 rounded-lg shadow-md space-y-8'
            style={{ paddingRight: '10%' }}
          >
            <div className='grid grid-cols-4 gap-4'>
              {/* Website URL */}
              <div>
                <label className='block mb-1 detailsmallfont'>
                  Enter Website
                </label>
                <input
                  {...register('url')}
                  className='w-full p-2 border rounded-md'
                  placeholder='Website URL'
                />
                {errors.url && (
                  <p className='text-red-500 text-sm'>{errors.url.message}</p>
                )}
              </div>

              {/* Language */}
              <div>
                <label className='block mb-1 detailsmallfont'>
                  Website's Primary language
                </label>
                <select
                  {...register('language')}
                  className='w-full p-2 border rounded-md'
                >
                  <option value=''>Select Language</option>
                  {languageList.map((lang) => (
                    <option key={lang.code} value={lang.name}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                {errors.language && (
                  <p className='text-red-500 text-sm'>
                    {errors.language.message}
                  </p>
                )}
              </div>

              {/* Traffic Country */}
              <div>
                <label className='block mb-1 detailsmallfont'>
                  Your Majority of traffic comes from
                </label>
                <Controller
                  name='country'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={countryOptions}
                      placeholder='Select Country'
                      onChange={(selectedOption) =>
                        field.onChange(
                          selectedOption ? selectedOption.value : ''
                        )
                      }
                      value={countryOptions.find(
                        (option) => option.value === field.value
                      )}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          padding: '2px',
                        }),
                      }}
                    />
                  )}
                />
                {errors.country && (
                  <p className='text-red-500 text-sm'>
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            {/* Category Grid */}
            <div className='mt-6'>
              <label className='block mb-2 detailsmallfont'>
                Main Category
              </label>
              <div className='grid grid-cols-5 gap-4'>
                {[
                  'Animals / Pets',
                  'Art',
                  'Auto',
                  'Beauty',
                  'Blogging',
                  'Business / Entrepreneur',
                  'Directory',
                  'Education',
                  'Energy & Solar Energy',
                  'Entertainment & Music',
                  'Environment',
                  'Events',
                  'Family / Parenting',
                  'Fashion',
                  'Finance',
                  'Food',
                  'Gambling',
                  'Gaming',
                  'General',
                  'Health & Fitness',
                  'Home & Garden',
                  'Italian Sites',
                  'Legal',
                  'Lifestyle',
                  'Marijuana / Vaporizers',
                  'Marketing',
                  'Medical',
                  'News',
                  'Other',
                  'Outdoors',
                  'Photography',
                  'Politics',
                  'Real Estate',
                  'Environment Safety',
                  'SEO',
                  'Sex & Adult',
                  'Shopping',
                ].map((cat) => (
                  <label
                    key={cat}
                    className='flex items-center'
                    style={{
                      fontSize: '14px',
                      color: '#0F0C1B99',
                      cursor: 'pointer',
                      fontWeight: '500',
                      lineHeight: '20px',
                    }}
                  >
                    <input
                      type='checkbox'
                      value={cat}
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className='mr-2 text-purple-600'
                    />
                    {cat}
                  </label>
                ))}
              </div>
              {errors.category && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className='mt-4'>
              <label className='block text-sm font-medium mb-1'>
                Description of Website
              </label>
              <textarea
                {...register('description')}
                className='w-full p-2 border rounded-md h-24'
                placeholder='Describe your website...'
              />
              {errors.description && (
                <p className='text-red-500 text-sm'>
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Owner Checkbox */}
            <div className='mt-4'>
              <label className='inline-flex items-center'>
                <input
                  type='checkbox'
                  {...register('isOwner')}
                  className='text-purple-600 mr-2'
                />
                <span className='text-sm text-gray-700'>
                  I am the owner of the website
                </span>
              </label>
            </div>
          </div>

          <h3 className='font-semibold text-gray-700 mb-4 mt-12 detailhighfont'>
            Create offer
          </h3>

          {/* Create Offer Section with Tabs */}
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

            {/* Tab Content */}
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
                  <div className='grid grid-cols-3 gap-4'>
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
                            {typeof errors.guestPostPrice === 'object' &&
                              errors.guestPostPrice !== null &&
                              'message' in errors.guestPostPrice === false &&
                              (errors.guestPostPrice as Record<string, any>)[
                                niche
                              ]?.message && (
                                <p className='text-red-500 text-sm'>
                                  {
                                    (
                                      errors.guestPostPrice as Record<
                                        string,
                                        any
                                      >
                                    )[niche]?.message
                                  }
                                </p>
                              )}
                          </div>
                          <div>
                            <label className='block text-xs font-medium mb-1'>
                              Price for Link Insertion
                            </label>
                            <input
                              type='number'
                              {...register(
                                `linkInsertionPrice.${niche}` as const,
                                {
                                  valueAsNumber: true,
                                }
                              )}
                              className='w-full p-2 border rounded-md'
                              placeholder='Enter price'
                              disabled={watch('samePriceForAllNiches')}
                            />
                            {typeof errors.linkInsertionPrice === 'object' &&
                              errors.linkInsertionPrice !== null &&
                              'message' in errors.linkInsertionPrice ===
                                false &&
                              (
                                errors.linkInsertionPrice as Record<string, any>
                              )[niche]?.message && (
                                <p className='text-red-500 text-sm'>
                                  {
                                    (
                                      errors.linkInsertionPrice as Record<
                                        string,
                                        any
                                      >
                                    )[niche]?.message
                                  }
                                </p>
                              )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type='submit'
            className='bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700'
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default WebsiteDetails;
