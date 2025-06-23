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
import { PiFlowerLotus, PiNut } from 'react-icons/pi';
import logo from '../assets/logo.png';
import { LuWalletMinimal } from 'react-icons/lu';
import { FiShoppingBag } from 'react-icons/fi';
import { LuUser } from 'react-icons/lu';

const WebsiteList: React.FC = memo(() => {
  const dispatch = useDispatch();
  const websites = useSelector((state: RootState) => state.websites.websites);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('My websites'); // State to track active tab
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const handleAddWebsite = () => {
    localStorage.removeItem('formData');
    navigate('/add');
  };

  // Pagination logic with reversed websites
  const reversedWebsites = [...websites].reverse();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWebsites = reversedWebsites.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(reversedWebsites.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Mock flag and icon data
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
  ];

  return (
    <div className='container mx-auto pb-4'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6 border-b'>
        <div className='flex items-center'>
          <img
            src={logo}
            alt='Kraken Logo'
            className='h-14'
            style={{
              marginRight: '8rem',
            }}
          />
          <nav className='flex h-14'>
            <a
              href='#'
              className={`text-gray-500 hover:text-gray-700 items-center flex px-3 headerfont ${
                activeTab === 'Marketplace'
                  ? 'border-b-2 headeractivecolor'
                  : ''
              }`}
              style={{
                backgroundColor:
                  activeTab === 'Marketplace' ? '#f3effc' : 'transparent',
              }}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('Marketplace');
              }}
            >
              <span>Marketplace</span>
            </a>
            <a
              href='#'
              className={`text-gray-500 hover:text-gray-700 items-center flex px-3 headerfont ${
                activeTab === 'My websites'
                  ? 'border-b-2 headeractivecolor'
                  : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('My websites');
              }}
              style={{
                backgroundColor:
                  activeTab === 'My websites' ? '#f3effc' : 'transparent',
              }}
            >
              <span>My websites</span>
            </a>
            <a
              href='#'
              className={`text-gray-500 hover:text-gray-700 items-center flex px-3 headerfont ${
                activeTab === 'My Orders' ? 'border-b-2 headeractivecolor' : ''
              }`}
              style={{
                backgroundColor:
                  activeTab === 'My Orders' ? '#f3effc' : 'transparent',
              }}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('My Orders');
              }}
            >
              <span>My Orders</span>
            </a>
            <a
              href='#'
              className={`text-gray-500 hover:text-gray-700 items-center flex px-3 headerfont ${
                activeTab === 'My projects'
                  ? 'border-b-2 headeractivecolor'
                  : ''
              }`}
              style={{
                backgroundColor:
                  activeTab === 'My projects' ? '#f3effc' : 'transparent',
              }}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('My projects');
              }}
            >
              <span>My projects</span>
            </a>
            <a
              href='#'
              className={`text-gray-500 hover:text-gray-700 items-center flex px-3 headerfont ${
                activeTab === 'Received orders'
                  ? 'border-b-2 headeractivecolor'
                  : ''
              }`}
              style={{
                backgroundColor:
                  activeTab === 'Received orders' ? '#f3effc' : 'transparent',
              }}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('Received orders');
              }}
            >
              <span>Received orders</span>
            </a>
          </nav>
        </div>
        <div className='flex space-x-6'>
          <span className='text-gray-500 hover:text-gray-700 cursor-pointer'>
            <LuWalletMinimal
              style={{
                fontSize: '24px',
                color: '#b1b1b1',
              }}
            />
          </span>
          <span className='text-gray-500 hover:text-gray-700 cursor-pointer'>
            <FiShoppingBag
              style={{
                fontSize: '24px',
                color: '#b1b1b1',
              }}
            />
          </span>
          <span className='text-gray-500 hover:text-gray-700 cursor-pointer'>
            <LuUser
              style={{
                fontSize: '24px',
                color: '#b1b1b1',
              }}
            />
          </span>
          <span className='text-gray-500 hover:text-gray-700 cursor-pointer'>
            <PiNut
              style={{
                fontSize: '24px',
                color: '#b1b1b1',
              }}
            />
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
                <td className='p-3 tablecontent'>
                  {website.url.replace(/^https?:\/\//, '')}
                </td>
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
