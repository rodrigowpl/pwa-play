import React, { useState } from 'react'
import styled from 'styled-components'

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const Header = ({ onClickSearch }) => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <StyledHeader>
      <StyledInput
        value={searchValue}
        onChange={({ target: { value } }) => setSearchValue(value)}
        placeholder='Digite o usuário...'
      />
      <StyledButton
        onClick={() => onClickSearch(searchValue)}>
        Pesquisar
      </StyledButton>
    </StyledHeader>
  )
}
export default Header
