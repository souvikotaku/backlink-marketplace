import React, { useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWebsite } from '../store/websiteSlice';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';

const WebsiteList: React.FC = memo(() => {
  const dispatch = useDispatch();
  const websites = useSelector((state: RootState) => state.websites.websites);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();
  const handleAddWebsite = () => {
    localStorage.removeItem('formData'); // 💡 Clear localStorage right before navigating
    navigate('/add');
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWebsites = websites.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(websites.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between mb-4'>
        <h2 className='text-xl font-bold'>All websites</h2>
        <button
          className='bg-purple-600 text-white px-4 py-2 rounded'
          onClick={handleAddWebsite}
        >
          + Add Website
        </button>
      </div>
      <div className='bg-white rounded shadow'>
        <table className='w-full'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='p-2 text-left'>Website</th>
              <th className='p-2 text-left'>Country</th>
              <th className='p-2 text-left'>Language</th>
              <th className='p-2 text-left'>Category</th>
              <th className='p-2 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentWebsites.map((website) => (
              <tr
                key={website.id}
                className='border-t hover:bg-gray-50 cursor-pointer'
                onClick={() => navigate(`/edit/${website.id}`)} // ✅ replace this
              >
                <td className='p-2'>{website.url}</td>
                <td className='p-2'>{website.country}</td>
                <td className='p-2'>{website.language}</td>
                <td className='p-2'>{website.category}</td>
                <td className='p-2'>
                  <button className='text-purple-600'>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-between mt-4'>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === page ? 'bg-purple-600 text-white' : 'bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  );
});

export default WebsiteList;
