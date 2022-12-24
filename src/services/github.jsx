import { createContext, useContext, useState } from "react";
import { _AxiosService } from "../config/axios";

const GithubContext = createContext({})

export function useGithub() {
  return useContext(GithubContext)
}

export default function GithubProvider({ children }) {
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [allRepos, setAllRepos] = useState([])

  const getGithubUser = async (username) => {
    try {
      const response = await _AxiosService.get(`users/${username}`)
      if (response.status === 200) {
        setUser(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getPublicRepository = async (username) => {
    try {
      const response = await _AxiosService.get(`users/${username}/repos`)
      if (response.status === 200) {
        setRepos(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAllRepository = async (token) => {
    try {
      const response = await _AxiosService.get('user/repos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.status === 200) {
        setAllRepos(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <GithubContext.Provider value={{ user, getGithubUser, repos, getPublicRepository, allRepos, getAllRepository }}>
      {children}
    </GithubContext.Provider>
  )
}