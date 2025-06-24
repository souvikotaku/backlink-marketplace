import React, { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Select from 'react-select';
import { countries, languages } from 'countries-list';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addWebsite, updateWebsite } from '../store/websiteSlice';
import WebsiteHeader from './WebsiteHeader';
import OfferForm from './OfferForm';
import WebsiteDetailsForm from './WebsiteDetailsForm';
import ArticleSpecification from './ArticleSpecification';
import Preconditions from './Preconditions';
import './style.css';

// Combined schema for all form sections
const formSchema = z.object({
  // Website Details
  url: z.string().url('Invalid URL').min(1, 'URL is required'),
  country: z.string().min(1, 'Country is required'),
  language: z.string().min(1, 'Language is required'),
  category: z.array(z.string()).min(1, 'At least one category is required'),
  description: z.string().min(1, 'Description is required'),
  isOwner: z.boolean().optional(),

  // Offer Form
  guestPostPrice1: z.number().nonnegative('Must be non-negative'),
  linkInsertionPrice1: z.number().nonnegative('Must be non-negative'),
  homePagePrice: z.number().nonnegative('Must be non-negative'),
  homePageDescription: z.string().optional(),
  articleWordsMin: z.number().nonnegative('Must be non-negative').optional(),
  articleWordsMax: z.number().nonnegative('Must be non-negative').optional(),
  articleLinksMax: z.number().nonnegative('Must be non-negative').optional(),
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

  // Article Specification
  isWritingIncluded: z.boolean(),
  articleLengthOption: z.string().optional(),
  articleWordsMinSpec: z.number().min(0).optional(),
  articleWordsMaxSpec: z.number().min(0).optional(),
  allowDofollow: z.boolean(),
  linkType: z.string(),
  taggingPolicy: z.string(),
  advertiserLinksOption: z.string(),
  advertiserLinksMin: z.number().min(0).optional(),
  advertiserLinksMax: z.number().min(0).optional(),
  otherLinks: z.boolean(),
  articleDescription: z.string().min(1, 'Description is required').optional(),
});

type FormData = z.infer<typeof formSchema>;

const WebsiteDetailsPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const websites = useSelector((state: RootState) => state.websites.websites);
  const websiteToEdit = id ? websites.find((w) => w.id === parseInt(id)) : null;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(!!websiteToEdit);
  //   const [activeTab, setActiveTab] = useState('normalOffers');
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
    trigger,
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
      guestPostPrice: { Gambling: 0, Crypto: 0, Adult: 0 },
      linkInsertionPrice: { Gambling: 0, Crypto: 0, Adult: 0 },
      homePagePrice: 0,
      homePageDescription: '',
      articleWordsMin: 0,
      articleWordsMax: 0,
      articleLinksMax: 0,
      samePriceForAllNiches: false,
      greyNichePrice: 0,
      isWritingIncluded: true,
      articleLengthOption: 'notLimited',
      articleWordsMinSpec: undefined,
      articleWordsMaxSpec: undefined,
      allowDofollow: false,
      linkType: 'brandOnly',
      taggingPolicy: 'noTag',
      advertiserLinksOption: 'noTag',
      advertiserLinksMin: undefined,
      advertiserLinksMax: undefined,
      otherLinks: false,
      articleDescription: '',
    },
    mode: 'onChange',
  });

  const selectedCategories = watch('category');
  const isWritingIncluded = watch('isWritingIncluded');
  const articleLengthOption = watch('articleLengthOption');
  const advertiserLinksOption = watch('advertiserLinksOption');
  const samePriceForAllNiches = watch('samePriceForAllNiches');

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
        category: Array.isArray(websiteToEdit.category)
          ? websiteToEdit.category
          : websiteToEdit.category
          ? [websiteToEdit.category]
          : [],
        guestPostPrice: normalizedGuestPostPrice,
        linkInsertionPrice: normalizedLinkInsertionPrice,
        articleWordsMinSpec: websiteToEdit.articleWordsMin ?? undefined,
        articleWordsMaxSpec: websiteToEdit.articleWordsMax ?? undefined,
        articleDescription: websiteToEdit.articleDescription ?? '',
      });
      trigger();
    } else {
      localStorage.removeItem('formData');
      reset();
    }
  }, [websiteToEdit, reset, trigger]);

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
    setValue('category', updated, { shouldValidate: true });
  };

  const getFlagUrl = (code: string) =>
    `https://cdn.jsdelivr.net/npm/country-flag-icons/3x2/${code}.svg`;

  //   const countryOptions = Object.entries(countries).map(([code, country]) => ({
  //     value: country.name,
  //     label: (
  //       <span>
  //         <img
  //           src={getFlagUrl(code)}
  //           alt={code}
  //           style={{
  //             width: '20px',
  //             marginRight: '8px',
  //             display: 'inline-block',
  //             verticalAlign: 'middle',
  //           }}
  //         />
  //         {country.name}
  //       </span>
  //     ),
  //     code,
  //   }));

  const languageList = Object.entries(languages).map(([code, language]) => ({
    code,
    name: language.name,
  }));

  const handleAccept = () => {
    setIsAccepted(true);
    setIsPopupOpen(false);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsPopupOpen(false);
    }
  };

  const onSubmit = (data: FormData) => {
    if (!isValid) {
      trigger();
      return;
    }
    const websiteData = {
      ...data,
      articleWordsMin: data.articleWordsMinSpec,
      articleWordsMax: data.articleWordsMaxSpec,
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

  return (
    <div className='container mx-auto pb-4'>
      <WebsiteHeader />
      <div className='max-w-6xl mx-auto'>
        <h2 className='detailhighfontmain mb-6'>
          {id ? 'Edit Website' : 'Add Website'}
        </h2>
        {/* YouTube Video Section */}
        <div className='flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow'>
          <div className='w-1/2 pr-4'>
            <h2 className='mb-2 detailhighfont'>
              Learn how to get best out of linksera
            </h2>
            <ul className='list-disc pl-5 radiofontinside'>
              <li>How to add your website to the marketplace</li>
              <li>Setting pricing and niche/category filters</li>
              <li>Uploading sample articles or guidelines</li>
              <li>Editing or updating your website listing anytime</li>
              <li>Tips to make your listing stand out to buyers</li>
            </ul>
          </div>
          <div className='w-1/2'>
            <iframe
              width='100%'
              height='315'
              src='https://www.youtube.com/embed/fShlVhCfHig'
              title='Linksera Tutorial'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              className='rounded-lg'
            ></iframe>
          </div>
        </div>

        {/* Preconditions Section */}

        <Preconditions
          isAccepted={isAccepted}
          setIsPopupOpen={setIsPopupOpen}
          isPopupOpen={isPopupOpen}
          handleOverlayClick={handleOverlayClick}
          modalRef={modalRef}
          handleAccept={handleAccept}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Website Details Section */}

          <WebsiteDetailsForm
            errors={errors}
            control={control}
            languageList={languageList}
            register={register}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            trigger={trigger}
          />

          {/* Create Offer Section */}

          <OfferForm
            register={register}
            samePriceForAllNiches={samePriceForAllNiches}
            errors={errors}
          />

          {/* Article Specification Section */}

          <ArticleSpecification
            register={register}
            errors={errors}
            isWritingIncluded={isWritingIncluded}
            articleLengthOption={articleLengthOption}
            advertiserLinksOption={advertiserLinksOption}
          />
          <button
            type='submit'
            className='bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 mt-6'
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default WebsiteDetailsPage;
