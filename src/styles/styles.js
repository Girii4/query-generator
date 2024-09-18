import styled from 'styled-components';

export const GitSearchInput = styled.input`
  width: 100%;
  height: 36px;
  padding: 8px;

  background: ${props => props.theme.colors.bgGreyPrimary};
  border: ${props => `1px solid ${props.theme.colors.bgGreyTernary}`};

  font-weight: 500;
  font-size: 14px;
  text-align: left;

  &:focus {
    outline: none;
  }
`;

export const PrimaryButton = styled.button`
  width: 150px;
  height: 40px;

  background-color: ${props => props.theme.colors.bgBluePrimary};
  border: none;
  border-radius: 4px;

  color: ${props => props.theme.colors.colorPrimary};
  font-weight: 600;
  font-size: 14px;

  &:hover {
    background-color: ${props => props.theme.colors.bgBlueSecondary};
  }
`;

export const FullWidthButton = styled(PrimaryButton)`
  width: 100%;
  margin: 10px 0;
`;
