import styled from 'styled-components'

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    padding: 1rem;

    background-color: ${({ theme }) => theme['gray-900']};
    border: 0;
    border-radius: 6px;

    color: ${({ theme }) => theme['gray-300']};

    &::placeholder {
      color: ${({ theme }) => theme['gray-500']};
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    height: 54px;
    padding: 0 2rem;

    background: transparent;
    border: 1px solid ${({ theme }) => theme['green-300']};
    border-radius: 6px;

    color: ${({ theme }) => theme['green-300']};
    font-weight: 700;

    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background-color: ${({ theme }) => theme['green-500']};
      border-color: ${({ theme }) => theme['green-500']};
      color: ${({ theme }) => theme.white};
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
  }
`
