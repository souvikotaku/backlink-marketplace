import React from 'react';
import { useForm } from 'react-hook-form';
import './style.css';

const ArticleSpecification: React.FC<any> = ({
  register,
  errors,
  isWritingIncluded,
  articleLengthOption,
  advertiserLinksOption,
}: any) => {
  // Convert string value to boolean for proper comparison

  return (
    <>
      <h3 className='font-semibold text-gray-700 mb-4 mt-12 detailhighfont'>
        Article Specification
      </h3>
      <div className='bg-white p-6 rounded-lg shadow-md grid grid-cols-2 gap-6'>
        <div>
          <label className='block text-sm font-medium mb-1'>
            Is Writing Included in the Offer?
          </label>
          <div className='mt-2 space-y-2 grid'>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                {...register('isWritingIncluded')}
                value='yes'
                className='form-radio'
              />
              <span className='ml-2 radiofontinside'>Yes</span>
            </label>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                {...register('isWritingIncluded')}
                value='no'
                className='form-radio'
              />
              <span className='ml-2 radiofontinside'>
                No, the advertiser (client) needs to provide the content
              </span>
            </label>
          </div>
        </div>

        {isWritingIncluded === 'yes' && (
          <>
            <div>
              <label className='block text-sm font-medium mb-1'>
                Tagging Articles Policy
              </label>
              <div className='mt-2 space-y-2 grid'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('taggingPolicy')}
                    value='noTag'
                    className='form-radio'
                  />
                  <span className='ml-2 radiofontinside'>
                    We do not tag paid articles.
                  </span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('taggingPolicy')}
                    value='onRequest'
                    className='form-radio'
                  />
                  <span className='ml-2 radiofontinside'>
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
                  <span className='ml-2 radiofontinside'>
                    We always tag articles: "Sponsored article".
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Number of Words in the Article
              </label>
              <div className='mt-2 space-y-2'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('articleLengthOption')}
                    value='notLimited'
                    className='form-radio'
                  />
                  <span className='ml-2 radiofontinside'>
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
                  <span className='ml-2 radiofontinside'>
                    No, the advertiser (client) needs to provide the content
                  </span>
                </label>
                {articleLengthOption === 'clientProvided' && (
                  <div className='mt-2 flex space-x-4'>
                    <input
                      type='number'
                      {...register('articleWordsMinSpec', {
                        valueAsNumber: true,
                      })}
                      placeholder='Min'
                      className='w-24 p-2 border rounded'
                    />
                    <input
                      type='number'
                      {...register('articleWordsMaxSpec', {
                        valueAsNumber: true,
                      })}
                      placeholder='Max'
                      className='w-24 p-2 border rounded'
                    />
                  </div>
                )}
                {(errors?.articleWordsMinSpec ||
                  errors?.articleWordsMaxSpec) && (
                  <p className='text-red-500 text-sm'>
                    {errors?.articleWordsMinSpec?.message ||
                      errors?.articleWordsMaxSpec?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                A Number of Links to the Advertiser in the Article
              </label>
              <div className='mt-2 space-y-2 grid'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('advertiserLinksOption')}
                    value='noTag'
                    className='form-radio'
                  />
                  <span className='ml-2 radiofontinside'>
                    We do not tag paid articles.
                  </span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('advertiserLinksOption')}
                    value='maxLinks'
                    className='form-radio'
                  />
                  <span className='ml-2 radiofontinside'>
                    A maximum number of links to the advertiser
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
                {(errors?.advertiserLinksMin || errors?.advertiserLinksMax) && (
                  <p className='text-red-500 text-sm'>
                    {errors?.advertiserLinksMin?.message ||
                      errors?.advertiserLinksMax?.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                I Allow DOFOLLOW Links
              </label>
              <div className='mt-2 space-y-2 grid'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('allowDofollow')}
                    value='yes'
                    className='form-radio'
                  />
                  <span className='ml-2 radiofontinside'>Yes</span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('allowDofollow')}
                    value='no'
                    className='form-radio'
                  />
                  <span className='ml-2 radiofontinside'>No</span>
                </label>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Other Links in the Article
              </label>
              <div className='mt-2 space-y-2'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('otherLinks')}
                    value='yes'
                    className='form-radio'
                  />
                  <span className='ml-2 radiofontinside'>
                    We allow links to other websites in the content of the
                    article
                  </span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('otherLinks')}
                    value='no'
                    className='form-radio'
                  />
                  <span className='ml-2 radiofontinside'>
                    We DO NOT allow links to other websites in the article
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Type of Links Allowed
              </label>
              <div className='mt-2 space-y-2 grid'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('linkType')}
                    value='brandOnly'
                    className='form-radio'
                  />
                  <span className='ml-2 radiofontinside'>
                    Only brand links, URL, navigational, graphic links
                  </span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('linkType')}
                    value='brandedGeneric'
                    className='form-radio'
                  />
                  <span className='ml-2 radiofontinside'>
                    Only branded and generic links
                  </span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('linkType')}
                    value='mixed'
                    className='form-radio'
                  />
                  <span className='ml-2 radiofontinside'>
                    Also mixed links (partly exact match anchors)
                  </span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    {...register('linkType')}
                    value='all'
                    className='form-radio'
                  />
                  <span className='ml-2 radiofontinside'>
                    All links, including exact match anchors
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Other Content Rules/Specifications
              </label>
              <textarea
                {...register('articleDescription')}
                className='mt-2 w-full p-2 border rounded'
                placeholder='Description'
              />
              {errors?.articleDescription && (
                <p className='text-red-500 text-sm'>
                  {errors?.articleDescription?.message}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ArticleSpecification;
