import styled from 'styled-components';

export const Input = styled.input`
  height: 32px;
  padding: 4px 12px;

  background: ${props => (props.disabled ? props.theme.colors.bgGreyPrimary : 'none')};
  display: ${props => (props.disabled ? 'inline' : 'block')};
  max-width: ${props => (props.disabled ? '50px' : 'auto')};
  min-width: 50px;
  border: ${props => `1px solid ${props.theme.colors.bgBorderSecondary}`};

  font-weight: 500;
  font-size: 14px;
  text-align: ${props => (props.disabled ? 'center' : 'left')};

  border-radius: 4px;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.colors.bgGreyPrimary};
    opacity: 0.9;
  }
`;

export const PrimaryButton = styled.button`
  width: 120px;
  height: 36px;
  background-color: ${props => props.theme.colors.bgBluePrimary};
  border: none;
  border-radius: 4px;
  color: ${props => props.theme.colors.colorPrimary};
  font-size: 14px;
  margin-right: 20px;
  &:hover {
    background-color: ${props => props.theme.colors.bgBlueSecondary};
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background-color: ${props => props.theme.colors.bgGreySecondary};
  &:hover {
    background-color: ${props => props.theme.colors.bgGreyThernary};
  }
`;

export const AndButton = styled(PrimaryButton)`
  height: 30px;
  width: 80px;
  padding: 5px;
`;
