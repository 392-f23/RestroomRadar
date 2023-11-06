import {describe, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from './App';

describe('initial launch test', () => {
    
  it('should bring the user to the sign-in page', () => {
    render(<App />);
    screen.getAllByText('RestroomRadar');
    screen.getByText('Continue as Guest');
  });
});