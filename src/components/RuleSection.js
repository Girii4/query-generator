import React, { useState } from 'react';
import styled from 'styled-components';
import { VscClose } from 'react-icons/vsc';

import { DropDown } from './DropDown';
import { Input } from './styles';

const predicateValues = [
  { key: 'user_email', value: 'User Email' },
  { key: 'screen_width', value: 'Screen Width' },
  { key: 'screen_height', value: 'Screen Height' },
  { key: 'visits', value: '# of Visits' },
  { key: 'user_first_name', value: 'First Name' },
  { key: 'user_last_name', value: 'Last Name' },
  { key: 'page_response', value: 'Response time (ms)' },
  { key: 'domain', value: 'Domain' },
  { key: 'path', value: 'Page Path' },
];

const playholders = {
  user_email: 'name@gmail.com',
  screen_width: '1000',
  screen_height: '800',
  visits: '123',
  user_first_name: 'John',
  user_last_name: 'Doe',
  page_response: '50',
  domain: 'website.com',
  path: '/Web/URL/pathname',
};

const predicateType = {
  user_email: 'string',
  screen_width: 'number',
  screen_height: 'number',
  visits: 'number',
  user_first_name: 'string',
  user_last_name: 'string',
  page_response: 'number',
  domain: 'string',
  path: 'string',
};

const stringOptions = [
  { key: 'equals', value: 'equals' },
  { key: 'contains', value: 'contains' },
  { key: 'starts_with', value: 'starts with' },
  { key: 'in_list', value: 'in list' },
];

const integerOptions = [
  { key: 'equals', value: 'equals' },
  { key: 'between', value: 'between' },
  { key: 'greater_than', value: 'greater than' },
  { key: 'less_than', value: 'less than' },
  { key: 'in_list', value: 'in list' },
];

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 10px 0;
  padding: 15px;
  border: 1px solid ${props => props.theme.colors.bgBorderPrimary};
  border-radius: 4px;
  z-index: ${props => 1000 - props.id};
  & > div {
    flex-grow: 1;
  }
  & > input {
    flex-grow: 1;
  }
`;

const CloseIcon = styled(VscClose)`
  font-size: 20px;
  color: #67768a;
  position: relative;
  top: 6px;
  right: 4px;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const initialInputValues = { betweenFirstVal: '', betweenSecondVal: '', conditionVal: '' };

const getStringOrNumberOperators = predicateValue => {
  return predicateType[predicateValue] === 'string' ? stringOptions : integerOptions;
};

export const RuleSection = ({ onCloseHandler, id, onChangeQuery }) => {
  const [predicate, setPredicate] = useState(predicateValues[0].key);
  const [operator, setOperator] = useState(
    getStringOrNumberOperators(predicateValues[0].key)[0].key
  );
  const [inputValues, setInputvalues] = useState(initialInputValues);

  const selectPredicateHandler = selectKeyValue => {
    setPredicate(selectKeyValue);
    onChangeQuery({ ...inputValues, id, operator, predicate: selectKeyValue });
  };

  const selectOperatorHandler = selectKeyValue => {
    setOperator(selectKeyValue);
    onChangeQuery({ ...inputValues, id, predicate, operator: selectKeyValue });
  };

  const onChangeHandler = event => {
    const updatedInpus = { ...inputValues, [event.target.name]: event.target.value };
    setInputvalues(prevState => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
    onChangeQuery({ ...updatedInpus, id, predicate, operator });
  };

  const closeHandler = () => {
    onCloseHandler(id);
  };

  return (
    <Wrapper id={id}>
      <CloseIcon onClick={closeHandler} />
      <DropDown selectItems={predicateValues} selectHandler={selectPredicateHandler} />
      {operator === integerOptions[1].key && <Input value="is" disabled />}
      <DropDown
        selectItems={getStringOrNumberOperators(predicate)}
        selectHandler={selectOperatorHandler}
      />
      {operator === integerOptions[1].key && (
        <Input
          name="betweenFirstVal"
          value={inputValues.betweenFirstVal}
          onChange={onChangeHandler}
          placeholder="0"
        />
      )}
      {operator === integerOptions[1].key && <Input value="and" disabled />}
      {operator === integerOptions[1].key && (
        <Input
          name="betweenSecondVal"
          value={inputValues.betweenSecondVal}
          onChange={onChangeHandler}
          placeholder="0"
        />
      )}
      {operator !== integerOptions[1].key && (
        <Input
          name="conditionVal"
          value={inputValues.conditionVal}
          onChange={onChangeHandler}
          placeholder={playholders[predicate]}
        />
      )}
    </Wrapper>
  );
};
