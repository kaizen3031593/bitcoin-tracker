import React from 'react';
import { render } from '@testing-library/react';
import { Axios } from '../Axios';

it('renders without crashing', () => {
  render(<Axios />);
});
