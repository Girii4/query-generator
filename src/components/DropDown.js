import React, { useState } from 'react';
import styled from 'styled-components';

const DropDownWrapper = styled.div`
  position: relative;
`;

const DropDownText = styled.div`
  min-width: 200px;
  padding: 4px 12px;
  cursor: pointer;
  height: 32px;
  border: 1px solid ${props => props.theme.colors.bgBorderSecondary};
  border-radius: 4px;

  &::after {
    content: '';
    transition: all 0.3s;
    border: solid black;
    border-width: 0 1px 1px 0;
    float: right;
    margin-top: ${props => (props.isOpened ? '6px' : '4px')};
    padding: 4px;
    transform: ${props => (props.isOpened ? 'rotate(-135deg)' : 'rotate(45deg)')};
  }
`;

const DropDownItemsWrapper = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 10px;
  border: ${props =>
    props.isOpened ? `0.1px solid ${props.theme.colors.bgBorderPrimary}` : 'none'};
  border-radius: 4px;
  box-shadow: 0 4px 8px -4px grey;
`;

const DropDownItem = styled.div`
  cursor: pointer;
  font-size: 14px;
  background-color: ${props => props.theme.colors.colorPrimary};
  padding: ${props => (props.isOpened ? '6px 18px' : 0)};
  height: ${props => (props.isOpened ? 'auto' : 0)};
  visibility: ${props => (props.isOpened ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpened ? 1 : 0)};
  transition: ${props =>
    props.isOpened ? 'max-height 0.7s, opacity 1.5s, visibility 2s ease' : 'all 0s ease 0s'};
  &:hover {
    font-weight: 600;
  }
`;

export function DropDown({ selectItems, selectHandler }) {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedText, setSelectedText] = useState(selectItems[0].value);

  const handleClick = () => {
    setIsOpened(!isOpened);
  };

  const handleText = (event, key) => {
    if (isOpened) {
      const textValue = event.currentTarget.textContent;
      setSelectedText(textValue);
      setIsOpened(!isOpened);
      selectHandler(key);
    }
  };

  return (
    <DropDownWrapper isOpened={isOpened}>
      <DropDownText isOpened={isOpened} onClick={handleClick}>
        {selectedText}
      </DropDownText>
      <DropDownItemsWrapper isOpened={isOpened}>
        {selectItems.map(item => (
          <DropDownItem
            isOpened={isOpened}
            onClick={event => handleText(event, item.key)}
            key={item.key}
          >
            {item.value}
          </DropDownItem>
        ))}
      </DropDownItemsWrapper>
    </DropDownWrapper>
  );
}
