import React, { useEffect } from 'react';
import { useGithub } from '../services/github';

const Profile = () => {
  const {
    user,
    getGithubUser,
    repos,
    getPublicRepository,
    allRepos,
    getAllRepository,
  } = useGithub()

  useEffect(() => {
    getGithubUser('bayusetiawan99')
    getPublicRepository('bayusetiawan99')
    getAllRepository()
  }, [])

  return (
    <div>
      Profile
    </div>
  );
};

export default Profile;