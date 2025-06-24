import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Select from 'react-select';
import { countries, languages } from 'countries-list';

const WebsiteDetailsForm: React.FC<any> = ({
  errors,
  control,
  register,
  languageList,
  selectedCategories,
  toggleCategory,
  trigger,
}: any) => {
  const getFlagUrl = (code: string) =>
    `https://cdn.jsdelivr.net/npm/country-flag-icons/3x2/${code}.svg`;

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
    code,
  }));

  return (
    <>
      <h3 className='font-semibold text-gray-700 mb-4 detailhighfont'>
        Website details
      </h3>
      <div
        className='bg-white p-6 rounded-lg shadow-md space-y-8'
        style={{ paddingRight: '10%' }}
      >
        <div className='grid grid-cols-4 gap-4'>
          <div>
            <label className='block mb-1 detailsmallfont'>Enter Website</label>
            <input
              {...register('url')}
              className='w-full p-2 border rounded-md'
              placeholder='Website URL'
            />
            {errors.url && (
              <p className='text-red-500 text-sm'>{errors.url.message}</p>
            )}
          </div>
          <div>
            <label className='block mb-1 detailsmallfont'>
              Website's Primary Language
            </label>
            <select
              {...register('language')}
              className='w-full p-2 border rounded-md'
            >
              <option value=''>Select Language</option>
              {languageList.map((lang: any) => (
                <option key={lang.code} value={lang.name}>
                  {lang.name}
                </option>
              ))}
            </select>
            {errors.language && (
              <p className='text-red-500 text-sm'>{errors.language.message}</p>
            )}
          </div>
          <div>
            <label className='block mb-1 detailsmallfont'>
              Your Majority of Traffic Comes From
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
                    field.onChange(selectedOption ? selectedOption.value : '')
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
              <p className='text-red-500 text-sm'>{errors.country.message}</p>
            )}
          </div>
        </div>
        <div className='mt-6'>
          <label className='block mb-2 detailsmallfont'>Main Category</label>
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
        <div className='mt-4'>
          <label className='block text-sm font-medium mb-1'>
            Description of Website
          </label>
          <textarea
            {...register('description')}
            className='w-full p-2 border rounded-md h-24'
            placeholder='Describe your website...'
            onBlur={() => trigger('description')}
          />
          {errors.description && (
            <p className='text-red-500 text-sm'>{errors.description.message}</p>
          )}
        </div>
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
    </>
  );
};

export default WebsiteDetailsForm;
