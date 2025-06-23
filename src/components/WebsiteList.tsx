import React, { useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWebsite } from '../store/websiteSlice';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { FaArrowRight, FaArrowLeft, FaBitcoin } from 'react-icons/fa';
import { IoDiceSharp } from 'react-icons/io5';
import { BiSolidDollarCircle } from 'react-icons/bi';
import { GiHeartPlus } from 'react-icons/gi';
import { BsIncognito } from 'react-icons/bs';
import { PiFlowerLotus } from 'react-icons/pi';

const WebsiteList: React.FC = memo(() => {
  const dispatch = useDispatch();
  const websites = useSelector((state: RootState) => state.websites.websites);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const handleAddWebsite = () => {
    localStorage.removeItem('formData');
    navigate('/add');
  };

  // Pagination logic with reversed websites
  const reversedWebsites = [...websites].reverse(); // Create a reversed copy of the array
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWebsites = reversedWebsites.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(reversedWebsites.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Mock flag and icon data (replace with actual data or icons)
  const getFlag = (country: any) => {
    const flags: any = { 'United States': '🇺🇸', Germany: '🇩🇪' };
    return flags[country] || '';
  };
  const nicheIcons = [
    <FaBitcoin />,
    <IoDiceSharp />,
    <BiSolidDollarCircle />,
    <GiHeartPlus />,
    <BsIncognito />,
    <PiFlowerLotus />,
  ]; // Replace with actual icons

  return (
    <div className='container mx-auto p-4'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6 border-b pb-2'>
        <div className='flex items-center'>
          <img
            src='/path/to/kraken-logo.png'
            alt='Kraken Logo'
            className='h-6 mr-4'
          />
          <nav className='flex space-x-6'>
            <a href='#' className='text-gray-500 hover:text-gray-700'>
              Marketplace
            </a>
            <a href='#' className='text-purple-600 font-semibold'>
              My websites
            </a>
            <a href='#' className='text-gray-500 hover:text-gray-700'>
              My Orders
            </a>
            <a href='#' className='text-gray-500 hover:text-gray-700'>
              My projects
            </a>
            <a href='#' className='text-gray-500 hover:text-gray-700'>
              Received orders
            </a>
          </nav>
        </div>
        <div className='flex space-x-4'>
          <span className='text-gray-500 hover:text-gray-700 cursor-pointer'>
            🔔
          </span>
          <span className='text-gray-500 hover:text-gray-700 cursor-pointer'>
            👤
          </span>
        </div>
      </div>
      <div className='flex justify-between mb-10'>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: '#0F0C1B',
            lineHeight: '40px',
          }}
        >
          All websites
        </h2>
      </div>
      <div className='flex justify-between mb-3'>
        <button
          className='bg-purple-600 text-white px-4 rounded-lg'
          onClick={handleAddWebsite}
          style={{
            height: 36,
            width: 228,
            backgroundColor: '#613FDD',
          }}
        >
          + Add Website
        </button>
      </div>
      <div className='bg-white rounded-lg'>
        <table className='w-full'>
          <thead>
            <tr
              style={{
                backgroundColor: '#faf7fe',
              }}
            >
              <th className='p-3 text-left headerstyle'>Website</th>
              <th className='p-3 text-left headerstyle'>Country</th>
              <th className='p-3 text-left headerstyle'>Language</th>
              <th className='p-3 text-left headerstyle'>Category</th>
              <th className='p-3 text-left headerstyle'>Other categories</th>
              <th className='p-3 text-left headerstyle'>Grey niches</th>
            </tr>
          </thead>
          <tbody>
            {currentWebsites.map((website, index) => (
              <tr
                key={website.id}
                className={`hover:bg-gray-50 cursor-pointer ${
                  index === 0
                    ? 'bg-white'
                    : index % 2 === 0
                    ? 'bg-white'
                    : 'bg-[#faf7fe]'
                }`}
                onClick={() => navigate(`/edit/${website.id}`)}
              >
                <td className='p-3 tablecontent'>{website.url}</td>
                <td className='p-3 tablecontent'>
                  {getFlag(website.country)} {website.country}
                </td>
                <td className='p-3 tablecontent'>{website.language}</td>
                <td className='p-3 tablecontent'>{website.category}</td>
                <td className='p-3 tablecontent'>
                  {website.category === 'Computer & Electronics'
                    ? 'Entertainment'
                    : ''}
                </td>
                <td className='p-3 flex space-x-2'>
                  {nicheIcons.map((icon, idx) => (
                    <span
                      key={idx}
                      style={{
                        color: '#613FDD',
                        fontWeight: 600,
                      }}
                    >
                      {icon}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-center mt-6'>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className='px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 paginationprevious'
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '14px',
              fontWeight: '500',
              lineHeight: '20px',
            }}
          >
            <FaArrowLeft
              style={{
                marginRight: '10px',
              }}
            />
            Previous{' '}
          </span>
        </button>
        <div className='flex paginationfont'>
          {currentPage > 2 && (
            <button
              onClick={() => paginate(1)}
              className='px-4 py-2 text-gray-600 hover:text-gray-800'
              style={{
                border: '#EAEAEA 2px solid',
              }}
            >
              1
            </button>
          )}
          {currentPage > 3 && <span className='px-4 py-2'>...</span>}
          {currentPage > 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className='px-4 py-2 text-gray-600 hover:text-gray-800'
              style={{
                border: '#EAEAEA 2px solid',
              }}
            >
              {currentPage - 1}
            </button>
          )}
          <button
            className='px-4 py-2 text-black'
            style={{
              backgroundColor: '#EAEAEA',
            }}
          >
            {currentPage}
          </button>
          {currentPage < totalPages && (
            <button
              onClick={() => paginate(currentPage + 1)}
              className='px-4 py-2 text-gray-600 hover:text-gray-800'
              style={{
                border: '#EAEAEA 2px solid',
              }}
            >
              {currentPage + 1}
            </button>
          )}
          {currentPage < totalPages - 2 && (
            <span className='px-4 py-2'>...</span>
          )}
          {currentPage < totalPages - 1 && (
            <button
              onClick={() => paginate(totalPages)}
              className='px-4 py-2 text-gray-600 hover:text-gray-800'
              style={{
                border: '#EAEAEA 2px solid',
              }}
            >
              {totalPages}
            </button>
          )}
        </div>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 paginationnext'
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '14px',
              fontWeight: '500',
              lineHeight: '20px',
            }}
          >
            Next{' '}
            <FaArrowRight
              style={{
                marginLeft: '10px',
              }}
            />
          </span>
        </button>
      </div>
    </div>
  );
});

export default WebsiteList;
