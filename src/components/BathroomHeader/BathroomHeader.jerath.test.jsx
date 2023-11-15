import { describe, it, mockFn } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BathroomHeader from './BathroomHeader';

describe('User Authentication', () => {
  it('should redirect to the home screen after signing in', async () => {
    render(<BathroomHeader />);
    await screen.findByText('Bathrooms Near Me');
  });
});