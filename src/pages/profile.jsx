import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RepoCard from '../components/repo-card';
import useDebounce from '../helper/useDebounce';
import { useGithub } from '../services/github';
import '../styles/profile.css'

const Profile = () => {
  const navigate = useNavigate()
  const { username } = useParams()
  const [token, setToken] = useState('')
  const [searchRepo, setSearchRepo] = useState('')
  const {
    user,
    getGithubUser,
    repos,
    getPublicRepository,
    allRepos,
    getAllRepository,
  } = useGithub()

  const getToken = () => {
    const token = localStorage.getItem('user')
    if (token) {
      const user = JSON.parse(token);
      setToken(user.access_tokens)
    }
  }

  const searchRepoHandle = (e) => {
    setSearchRepo(e.target.value)
  }

  const debouncedSearch = useDebounce(
    searchRepo,
    searchRepo ? 500 : 0
  );

  const dataRepo = useMemo(
    () =>
      allRepos.filter((item) => {
        const searchRepo = item.name
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase())
        return searchRepo
      }),
    [allRepos, debouncedSearch]
  );

  const handleLogout = () => {
    localStorage.removeItem('user')
    setTimeout(() => {
      navigate('/')
    }, 100)
  }

  useEffect(() => {
    getToken()
    if (username) {
      getGithubUser(username)
      getPublicRepository(username)
    }
  }, [username])

  useEffect(() => {
    token && getAllRepository(token)
  }, [token])

  return (
    <div className='container'>
      <div>
        <img src={user?.avatar_url} alt="user avatar" className='avatar' />
        <p className='name'>{user?.name}</p>
        <p>{user?.login}</p>
        <div className='follow'>
          <p>{user?.followers} followers</p>
          <p>{user?.following} following</p>
        </div>
      </div>
      <div className='repository_section'>
        <div className='all_repo_header'>
          <h2>Repository</h2>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <hr className='horizoltal_line' />
        <div>
          <h3>Public Repository</h3>
          <div className='grid'>
            {repos.map((repo) => (
              <RepoCard key={repo?.id} data={repo} />
            ))}
          </div>
        </div>
        {token && (
          <div>
            <div className='all_repo_header'>
              <h3>All Repository</h3>
              <input placeholder='Search Repository' onChange={searchRepoHandle} />
            </div>
            <div className='grid'>
              {dataRepo.map((repo) => (
                <RepoCard key={repo?.id} data={repo} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;