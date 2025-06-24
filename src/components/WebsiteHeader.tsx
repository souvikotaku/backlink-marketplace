import React, { useState } from 'react';
import { PiNut } from 'react-icons/pi';
import logo from '../assets/logo.png';
import { LuWalletMinimal } from 'react-icons/lu';
import { FiShoppingBag } from 'react-icons/fi';
import { LuUser } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';

const WebsiteHeader = () => {
  const [activeTab, setActiveTab] = useState('My websites');
  const navigate = useNavigate();

  return (
    <div className='flex justify-between items-center mb-6 border-b pl-6 pr-6'>
      <div className='flex items-center'>
        <img
          src={logo}
          alt='Kraken Logo'
          className='h-14'
          style={{ marginRight: '8rem', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
        <nav className='flex h-14'>
          <a
            href='#'
            className={`text-gray-500 hover:text-gray-700 items-center flex px-3 headerfont ${
              activeTab === 'Marketplace' ? 'border-b-2 headeractivecolor' : ''
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
              activeTab === 'My websites' ? 'border-b-2 headeractivecolor' : ''
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
              activeTab === 'My projects' ? 'border-b-2 headeractivecolor' : ''
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
          <LuWalletMinimal style={{ fontSize: '24px', color: '#b1b1b1' }} />
        </span>
        <span className='text-gray-500 hover:text-gray-700 cursor-pointer'>
          <FiShoppingBag style={{ fontSize: '24px', color: '#b1b1b1' }} />
        </span>
        <span className='text-gray-500 hover:text-gray-700 cursor-pointer'>
          <LuUser style={{ fontSize: '24px', color: '#b1b1b1' }} />
        </span>
        <span className='text-gray-500 hover:text-gray-700 cursor-pointer'>
          <PiNut style={{ fontSize: '24px', color: '#b1b1b1' }} />
        </span>
      </div>
    </div>
  );
};

export default WebsiteHeader;
