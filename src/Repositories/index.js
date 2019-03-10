import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Header from './Header'
import Repositories from './Repositories'

const StyledRepos = styled.div`
  padding: 10px 20px;
`

const StyledFetching = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
`

const Loading = () => (
  <StyledFetching>
    <span>Buscando repositórios...</span>
  </StyledFetching>
)

const useReposFetch = user => {
  const [isFetchingRepos, setFetching] = useState(false)
  const [repos, setRepos] = useState([])

  const fetchRepos = async () => {
    setFetching(true)

    try {
      const { data } = await axios.get(`https://api.github.com/users/${user}/repos`)
      setRepos(data)
      localStorage.setItem('@users', JSON.stringify(data))
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    if (!navigator.onLine) {
      setRepos(JSON.parse(localStorage.getItem('@users')) || [])
    } else {
      fetchRepos()
    }
  }, [user])

  return [isFetchingRepos, repos]
}

const Repos = () => {
  const [user, setUser] = useState('')
  const [isFetchingRepos, repos] = useReposFetch(user)

  return (
    <StyledRepos>
      <Header
        onClickSearch={setUser}
      />
      {isFetchingRepos
        ? <Loading />
        : <Repositories
            repos={repos}
          />
      }
    </StyledRepos>
  )
}

export default Repos
