import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const StyledRepos = styled.div`
  padding: 10px 20px;
`

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledRepoItem = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:first-child) {
    border-top: 2px solid #64B5F6;
  }
`

const StyledInput = styled.input`
  width: 100%;
  padding: 0 10px;
  height: 40px;
  outline: 0;
  background-color: #ffffff;
  border: 1px solid #C4C5E2;
  transition: .25s border;

  &:focus {
    border: 1px solid #C4C5E2;
  }
`

const StyledButton = styled.button`
  width: 100%;
  height: 40px;
  border: 0;
  outline: 0;
  cursor: pointer;
  font-weight: 600;
  border-radius: 2px;
  transition: background-color 0.1s linear, border-color 0.1s linear;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background-color: #93C3F1;
  margin-top: 20px;

  &:hover {
    background-color: #81b9ef;
  }

  &:active {
    background-color: #81b9ef;
    box-shadow: inset 0 1px 3px 0 #073050;
  }
`

const StyledFetching = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
`

const Fetching = () => (
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
  const [userValue, changeUserValue] = useState('')
  const [userSearch, changeUserSearch] = useState('')

  const [isFetchingRepos, repos] = useReposFetch(userSearch)

  const handleSearch = () => {
    changeUserSearch(userValue)
  }

  return (
    <StyledRepos>
      <StyledHeader>
        <StyledInput
          value={userValue}
          onChange={({ target: { value } }) => changeUserValue(value)}
          placeholder='Digite o usuário...'
        />
        <StyledButton
          onClick={handleSearch}>
          Pesquisar
        </StyledButton>
      </StyledHeader>
      {isFetchingRepos && userValue
        ? <Fetching />
        : repos.map(({ id, name }) => (
            <StyledRepoItem
              key={id}>
              <span>{name}</span>
            </StyledRepoItem>
          ))
      }
    </StyledRepos>
  )
}

export default Repos
