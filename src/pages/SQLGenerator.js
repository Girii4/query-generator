import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

import { RuleSection } from '../components/RuleSection';
import { PrimaryButton, SecondaryButton, AndButton } from '../components/styles';

const StyledTitle = styled.h2`
  text-align: left;
  margin-bottom: 8px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.bgGreyPrimary};
`;

const StyledPanel = styled.div`
  max-width: 1100px;
  min-height: 100vh;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.colorPrimary};
  margin: 0 auto;
  box-shadow: 0 13px 26px 0 rgba(0, 0, 0, 0.16);
`;

const StyledLine = styled.hr`
  color: ${props => props.theme.colors.bgGreySecondary};
  margin: 50px 0 10px;
`;

export const StyledSQLStatement = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 4px 12px;
  margin-top: 20px;

  background: ${props => (props.disabled ? props.theme.colors.bgGreyPrimary : 'none')};
  border: ${props => `1px solid ${props.theme.colors.bgBorderSecondary}`};

  font-weight: 500;
  font-size: 14px;
  text-align: left;

  border-radius: 4px;

  &::placeholder {
    color: ${props => props.theme.colors.bgGreyPrimary};
    text-align: center;
  }
`;

const ErrorMessage = styled.span`
  color: tomato;
  font-weight: 500;
  font-size: 14px;
  text-align: left;
  margin: 0 8px 12px;
`;

const SQLOperatorsMap = {
  equals: ' = ',
  between: ' BETWEEN ',
  greater_than: ' > ',
  less_than: ' < ',
  in_list: ' IN ',
  contains: ' LIKE ',
  starts_with: ' LIKE ',
};

const initialRulesSectionsState = {
  id: 0,
  predicate: 'user_email',
  operator: 'equals',
  betweenFirstVal: '',
  betweenSecondVal: '',
  conditionVal: '',
};

const transformValue = (key, { conditionVal, betweenFirstVal, betweenSecondVal }) => {
  switch (key) {
    case 'starts_with':
      return `'${conditionVal}%'`;
    case 'contains':
      return `'%${conditionVal}%'`;
    case 'in_list':
      return `(${conditionVal})`;
    case 'between':
      return ` ${betweenFirstVal} AND ${betweenSecondVal}`;
    default:
      return `${conditionVal}`;
  }
};

const areOptionsValid = ruleSections => {
  return ruleSections.some(
    section =>
      (section.operator !== 'between' && section.conditionVal === '') ||
      (section.operator === 'between' &&
        (section.betweenFirstVal === '' || section.betweenSecondVal === ''))
  );
};

export const SQLGenerator = () => {
  const [idCounter, setIdCounter] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [tableName] = useState('session');
  const [ruleSections, setRuleSections] = useState([initialRulesSectionsState]);
  const [SQLQuery, setSQLQuery] = useState('');

  const addRulesHandler = () => {
    const newId = idCounter + 1;
    setIdCounter(newId);
    setRuleSections([...ruleSections, { ...initialRulesSectionsState, id: newId }]);
  };

  const onCloseHandler = id => {
    if (ruleSections.length > 1) {
      setRuleSections(ruleSections.filter(section => section.id !== id));
      setSQLQuery('');
    }
  };

  const onChangeQuery = querryDetails => {
    setRuleSections(
      ruleSections.map(section => {
        if (section.id === querryDetails.id) {
          return { ...querryDetails };
        }
        return section;
      })
    );
  };

  const resetHandler = () => {
    setRuleSections([ruleSections[0]]);
    setSQLQuery('');
  };

  const generateSQLQuery = () => {
    setIsValid(true);
    setSQLQuery('');
    if (areOptionsValid(ruleSections)) {
      setIsValid(false);
      return;
    }
    let query = '';
    ruleSections.forEach((item, index, array) => {
      const queryPart = `${item.predicate}${SQLOperatorsMap[item.operator]}${transformValue(
        item.operator,
        {
          ...item,
        }
      )}`;
      query = query.concat(queryPart);
      if (index !== array.length - 1) {
        query = query.concat(' AND ');
      }
    });
    setSQLQuery(`SELECT * FROM ${tableName} WHERE ${query}`);
  };

  return (
    <Wrapper>
      <StyledPanel>
        <StyledTitle>Search for Sessions</StyledTitle>
        {ruleSections.map(section => (
          <RuleSection
            onChangeQuery={onChangeQuery}
            onCloseHandler={onCloseHandler}
            key={section.id}
            id={section.id}
          />
        ))}
        {!isValid && <ErrorMessage>Please, fill in empty fields!</ErrorMessage>}
        <AndButton onClick={addRulesHandler}>And</AndButton>
        <StyledLine />
        <div>
          <PrimaryButton onClick={generateSQLQuery}>
            {' '}
            <FaSearch style={{ marginRight: '10px', position: 'relative', top: '3px' }} /> Search
          </PrimaryButton>
          <SecondaryButton onClick={resetHandler}>Reset</SecondaryButton>
        </div>
        <StyledSQLStatement value={SQLQuery} readOnly placeholder="Generated SQL Statement" />
      </StyledPanel>
    </Wrapper>
  );
};
