import React from 'react'
import styled from 'styled-components'

const StyledRepoItem = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:first-child) {
    border-top: 2px solid #64B5F6;
  }
`

const Repositories = ({ repos }) => (
  <>
    {repos.map(({ id, name }) => (
      <StyledRepoItem
        key={id}>
        <span>{name}</span>
      </StyledRepoItem>
    ))}
  </>
)

export default Repositories
