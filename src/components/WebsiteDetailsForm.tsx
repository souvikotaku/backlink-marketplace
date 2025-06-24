import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Select from 'react-select';
import { countries, languages } from 'countries-list';

const websiteDetailsSchema = z.object({
  url: z.string().url('Invalid URL').min(1, 'URL is required'),
  country: z.string().min(1, 'Country is required'),
  language: z.string().min(1, 'Language is required'),
  category: z.array(z.string()).min(1, 'At least one category is required'),
  description: z.string().min(1, 'Description is required'),
  isOwner: z.boolean().optional(),
});

type WebsiteDetailsFormData = z.infer<typeof websiteDetailsSchema>;

interface WebsiteDetailsFormProps {
  onSubmit?: (data: WebsiteDetailsFormData) => void;
  websiteToEdit?: WebsiteDetailsFormData | (any & { id?: number });
}

const WebsiteDetailsForm: React.FC<WebsiteDetailsFormProps> = ({
  onSubmit,
  websiteToEdit,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
    trigger,
  } = useForm<WebsiteDetailsFormData>({
    resolver: zodResolver(websiteDetailsSchema),
    defaultValues: {
      url: '',
      country: '',
      language: '',
      category: [],
      description: '',
      isOwner: false,
    },
    mode: 'onChange', // Validate on change to catch empty description immediately
  });

  const selectedCategories = watch('category');

  useEffect(() => {
    if (websiteToEdit) {
      reset({
        ...websiteToEdit,
        category: Array.isArray(websiteToEdit.category)
          ? websiteToEdit.category
          : websiteToEdit.category
          ? [websiteToEdit.category]
          : [],
      });
      // Trigger validation on mount to ensure existing data is valid
      trigger();
    } else {
      localStorage.removeItem('websiteDetailsFormData');
      reset({
        url: '',
        country: '',
        language: '',
        category: [],
        description: '',
        isOwner: false,
      });
    }
  }, [websiteToEdit, reset, trigger]);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('websiteDetailsFormData', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const toggleCategory = (cat: string) => {
    const current = watch('category');
    const updated = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];
    setValue('category', updated, { shouldValidate: true });
  };

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

  const languageList = Object.entries(languages).map(([code, language]) => ({
    code,
    name: language.name,
  }));

  const onFormSubmit = (data: WebsiteDetailsFormData) => {
    if (!isValid) {
      // Trigger validation for all fields to show errors
      trigger();
      return;
    }
    localStorage.removeItem('websiteDetailsFormData');
    onSubmit?.(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
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
              <p className='text-red-500 text-sm'>{errors.language.message}</p>
            )}
          </div>
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
            onBlur={() => trigger('description')} // Trigger validation on blur
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
    </form>
  );
};

export default WebsiteDetailsForm;
