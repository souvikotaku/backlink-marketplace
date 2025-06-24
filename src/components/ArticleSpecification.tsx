import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const articleSpecificationSchema = z.object({
  isWritingIncluded: z.boolean(),
  articleLengthOption: z.string().optional(),
  articleWordsMin: z.number().min(0).optional(),
  articleWordsMax: z.number().min(0).optional(),
  allowDofollow: z.boolean(),
  linkType: z.string(),
  taggingPolicy: z.string(),
  advertiserLinksOption: z.string(),
  advertiserLinksMin: z.number().min(0).optional(),
  advertiserLinksMax: z.number().min(0).optional(),
  otherLinks: z.boolean(),
  articleDescription: z.string().min(1, 'Description is required').optional(),
});

type ArticleSpecificationFormData = z.infer<typeof articleSpecificationSchema>;

interface ArticleSpecificationProps {
  onSubmit?: (data: ArticleSpecificationFormData) => void;
  websiteToEdit?: any;
}

const ArticleSpecification: React.FC<ArticleSpecificationProps> = ({
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
  } = useForm<ArticleSpecificationFormData>({
    resolver: zodResolver(articleSpecificationSchema),
    defaultValues: {
      isWritingIncluded: true,
      articleLengthOption: 'notLimited',
      articleWordsMin: undefined,
      articleWordsMax: undefined,
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

  const isWritingIncluded = watch('isWritingIncluded');
  const articleLengthOption = watch('articleLengthOption');
  const advertiserLinksOption = watch('advertiserLinksOption');

  useEffect(() => {
    if (websiteToEdit) {
      reset({
        isWritingIncluded: websiteToEdit.isWritingIncluded ?? true,
        articleLengthOption: websiteToEdit.articleLengthOption ?? 'notLimited',
        articleWordsMin: websiteToEdit.articleWordsMin ?? undefined,
        articleWordsMax: websiteToEdit.articleWordsMax ?? undefined,
        allowDofollow: websiteToEdit.allowDofollow ?? false,
        linkType: websiteToEdit.linkType ?? 'brandOnly',
        taggingPolicy: websiteToEdit.taggingPolicy ?? 'noTag',
        advertiserLinksOption: websiteToEdit.advertiserLinksOption ?? 'noTag',
        advertiserLinksMin: websiteToEdit.advertiserLinksMin ?? undefined,
        advertiserLinksMax: websiteToEdit.advertiserLinksMax ?? undefined,
        otherLinks: websiteToEdit.otherLinks ?? false,
        articleDescription: websiteToEdit.articleDescription ?? '',
      });
      trigger();
    } else {
      localStorage.removeItem('articleSpecificationFormData');
      reset({
        isWritingIncluded: true,
        articleLengthOption: 'notLimited',
        articleWordsMin: undefined,
        articleWordsMax: undefined,
        allowDofollow: false,
        linkType: 'brandOnly',
        taggingPolicy: 'noTag',
        advertiserLinksOption: 'noTag',
        advertiserLinksMin: undefined,
        advertiserLinksMax: undefined,
        otherLinks: false,
        articleDescription: '',
      });
    }
  }, [websiteToEdit, reset, trigger]);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem(
        'articleSpecificationFormData',
        JSON.stringify(value)
      );
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onFormSubmit = (data: ArticleSpecificationFormData) => {
    if (!isValid) {
      trigger();
      return;
    }
    localStorage.removeItem('articleSpecificationFormData');
    onSubmit?.(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className='mt-6 p-4 border rounded-lg shadow-sm bg-white'
    >
      <h3 className='text-xl font-semibold mb-4'>Article Specification</h3>
      <div className='space-y-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Is writing of an article included in the offer?
          </label>
          <div className='mt-2 space-y-2'>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                {...register('isWritingIncluded')}
                value='true'
                className='form-radio'
              />
              <span className='ml-2'>Yes</span>
            </label>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                {...register('isWritingIncluded')}
                value='false'
                className='form-radio'
              />
              <span className='ml-2'>
                No, the advertiser (client) needs to provide the content
              </span>
            </label>
          </div>
        </div>

        {isWritingIncluded && (
          <div className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Number of words in the article
              </label>
              <div className='mt-2 space-y-2'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('articleLengthOption')}
                    value='notLimited'
                    className='form-radio'
                  />
                  <span className='ml-2'>
                    Length of the article is not limited.
                  </span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('articleLengthOption')}
                    value='clientProvided'
                    className='form-radio'
                  />
                  <span className='ml-2'>
                    No, the advertiser (client) needs to provide the content
                  </span>
                </label>
                {articleLengthOption === 'clientProvided' && (
                  <div className='mt-2 flex space-x-4'>
                    <input
                      type='number'
                      {...register('articleWordsMin', { valueAsNumber: true })}
                      placeholder='Min'
                      className='w-24 p-2 border rounded'
                    />
                    <input
                      type='number'
                      {...register('articleWordsMax', { valueAsNumber: true })}
                      placeholder='Max'
                      className='w-24 p-2 border rounded'
                    />
                  </div>
                )}
                {(errors.articleWordsMin || errors.articleWordsMax) && (
                  <p className='text-red-500 text-sm'>
                    {errors.articleWordsMin?.message ||
                      errors.articleWordsMax?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Allow DOFOLLOW links in the article
              </label>
              <div className='mt-2 space-y-2'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('allowDofollow')}
                    value='true'
                    className='form-radio'
                  />
                  <span className='ml-2'>Yes</span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('allowDofollow')}
                    value='false'
                    className='form-radio'
                  />
                  <span className='ml-2'>No</span>
                </label>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Type of links allowed:
              </label>
              <div className='mt-2 space-y-2'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('linkType')}
                    value='brandOnly'
                    className='form-radio'
                  />
                  <span className='ml-2'>
                    Only brand links, URL, navigational, graphic links.
                  </span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('linkType')}
                    value='brandedGeneric'
                    className='form-radio'
                  />
                  <span className='ml-2'>Only branded and generic links.</span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('linkType')}
                    value='mixed'
                    className='form-radio'
                  />
                  <span className='ml-2'>
                    Also mixed links (partly exact match anchors).
                  </span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('linkType')}
                    value='all'
                    className='form-radio'
                  />
                  <span className='ml-2'>
                    All links, including exact match anchors.
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Tagging articles policy:
              </label>
              <div className='mt-2 space-y-2'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('taggingPolicy')}
                    value='noTag'
                    className='form-radio'
                  />
                  <span className='ml-2'>We do not tag paid articles.</span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('taggingPolicy')}
                    value='onRequest'
                    className='form-radio'
                  />
                  <span className='ml-2'>
                    Articles are tagged only at the advertiser's request.
                  </span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('taggingPolicy')}
                    value='always'
                    className='form-radio'
                  />
                  <span className='ml-2'>
                    We always tag articles: "Sponsored article".
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                A number of links to the advertiser in the article:
              </label>
              <div className='mt-2 space-y-2'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('advertiserLinksOption')}
                    value='noTag'
                    className='form-radio'
                  />
                  <span className='ml-2'>We do not tag paid articles.</span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('advertiserLinksOption')}
                    value='maxLinks'
                    className='form-radio'
                  />
                  <span className='ml-2'>
                    A maximum number of links to the advertiser:
                  </span>
                </label>
                {advertiserLinksOption === 'maxLinks' && (
                  <div className='mt-2 flex space-x-4'>
                    <input
                      type='number'
                      {...register('advertiserLinksMin', {
                        valueAsNumber: true,
                      })}
                      placeholder='Min'
                      className='w-24 p-2 border rounded'
                    />
                    <input
                      type='number'
                      {...register('advertiserLinksMax', {
                        valueAsNumber: true,
                      })}
                      placeholder='Max'
                      className='w-24 p-2 border rounded'
                    />
                  </div>
                )}
                {(errors.advertiserLinksMin || errors.advertiserLinksMax) && (
                  <p className='text-red-500 text-sm'>
                    {errors.advertiserLinksMin?.message ||
                      errors.advertiserLinksMax?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Other links in the article:
              </label>
              <div className='mt-2 space-y-2'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('otherLinks')}
                    value='true'
                    className='form-radio'
                  />
                  <span className='ml-2'>
                    We allow links to other websites in the content of the
                    article.
                  </span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('otherLinks')}
                    value='false'
                    className='form-radio'
                  />
                  <span className='ml-2'>
                    We DO NOT allow links to other websites in the content of
                    the article.
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Other content rules/specifications:
              </label>
              <textarea
                {...register('articleDescription')}
                className='mt-2 w-full p-2 border rounded'
                placeholder='Description'
              />
              {errors.articleDescription && (
                <p className='text-red-500 text-sm'>
                  {errors.articleDescription.message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      {/* <button
        type='submit'
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
      >
        Save
      </button> */}
    </form>
  );
};

export default ArticleSpecification;
