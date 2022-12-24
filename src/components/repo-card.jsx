import React from 'react';
import '../styles/repo-card.css'

const RepoCard = ({data}) => {
  return (
    <div className='card'>
      <p className='repo-name'>{data?.name}</p>
      <p className='description'>{data?.description}</p>
      <p>{data?.visibility}</p>
    </div>
  );
};

export default RepoCard;