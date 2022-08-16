import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

test('renders learn react link', () => {

  act(() => {
    render(<App />);
  });
  const linkElement = screen.getByText(/Loading/i);
  expect(linkElement).toBeInTheDocument();

});
