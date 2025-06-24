import React from 'react';
import { FaCircle } from 'react-icons/fa6';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { IoMdCheckmark } from 'react-icons/io';

const Preconditions = ({
  isAccepted,
  setIsPopupOpen,
  isPopupOpen,
  handleOverlayClick,
  modalRef,
  handleAccept,
}: any) => {
  return (
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
          <div
            className={`flex items-center px-4 py-1 ${
              isAccepted ? 'bg-green-100 ' : 'bg-yellow-100 '
            }`}
            style={{ width: 'fit-content', borderRadius: '45px' }}
          >
            <FaCircle
              color={isAccepted ? 'green' : 'orange'}
              style={{ marginRight: '8px', fontSize: '10px' }}
            />
            <span className='labelbuttonfont'>
              {isAccepted ? 'Accepted' : 'Pending'}
            </span>
          </div>
          <button
            onClick={() => setIsPopupOpen(true)}
            className='ml-4 text-blue-500 hover:text-blue-700'
          >
            <span style={{ fontSize: '30px', color: 'lightgrey' }}>
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
            style={{ maxWidth: '60rem' }}
          >
            <p className='radiofont'>
              Hey, Accept Preconditions before you start the listing!
            </p>
            <p className='mb-4 mt-4 radiofontinside'>
              Before you can proceed with your listing, please make sure to
              review all required preconditions. Accepting these is mandatory to
              continue. It ensures your submission meets our platform standards
              and avoids delays. Listings that don't meet these terms may be
              rejected. Take a moment to go through them carefully before moving
              ahead. Once accepted, you'll be able to start listing right away.
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
                style={{ width: 'fit-content', borderRadius: '45px' }}
              >
                <IoMdCheckmark color='green' style={{ marginRight: '8px' }} />
                <span className='labelbuttonfont'>Accepted</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Preconditions;
