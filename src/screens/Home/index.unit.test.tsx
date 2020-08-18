/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import { render } from 'react-native-testing-library';
import TestRenderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import db from '../../database/db';

import Home from './index';
import ListContainer from '~/components/ListContainer';

jest.mock('react-native-sqlite-storage');
jest.mock('../../database/db');

const initialState = {
  tables: [
    { id: 1, name: 'Primeiro Banco' },
    { id: 2, name: 'Segundo Banco' },
    { id: 3, name: 'Terceiro Banco' },
    { id: 4, name: 'Quarto Banco' },
    { id: 5, name: 'Quinto Banco' },
    { id: 6, name: 'Sexto Banco' },
    { id: 7, name: 'Sétimo Banco' },
    { id: 8, name: 'Oitavo Banco' },
    { id: 9, name: 'Nono Banco' },
    { id: 10, name: 'Décimo Banco' },
    { id: 11, name: 'Décimo Primeiro Banco' },
  ],
};

describe('render components tests', () => {
  const tree = TestRenderer.create(<Home />);
  const jsonTree = tree.toJSON();

  it('should match the snapshot', () => {
    expect(jsonTree).toMatchSnapshot();
  });

  it('should render the ListContainer component', () => {
    const testInstance = tree.root;
    expect(testInstance.findByType(ListContainer)).toBeTruthy();
  });
});

describe('database connection', () => {
  it('should load the database tables on render', () => {});
});
// it('should load 10 elements from the store', () => {
//   const db = Database.getInstance();
//   const resp = ['tabela1', 'tabela2'];
// });
