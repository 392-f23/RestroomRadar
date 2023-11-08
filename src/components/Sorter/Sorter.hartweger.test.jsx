import {describe, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from '../../App';

describe('initial launch test', () => {
    
  it('should bring the user to the sign-in page', async () => {
    render(<App />);
    await screen.findByText('RestroomRadar');
    await screen.findByText('Continue as Guest');
  });
});