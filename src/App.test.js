import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Mail Box Client', () => {
  render(<App />);

  expect(screen.getByText('Mail-Box-Client'))
  
});