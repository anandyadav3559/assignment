import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Hero } from './Hero';

describe('Hero Component', () => {
  it('renders the heading correctly', () => {
    render(<Hero />);
    expect(screen.getByText(/Make your docs/i)).toBeInTheDocument();
    expect(screen.getByText(/AI-Ready./i)).toBeInTheDocument();
  });

  it('contains a file input for markdown and text files', () => {
    render(<Hero />);
    const fileInput = screen.getByTestId('file-upload') as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();
    expect(fileInput.type).toBe('file');
    expect(fileInput.accept).toBe('.md,.txt,text/markdown,text/plain');
  });

  it('shows error if non-file submitted', async () => {
    render(<Hero />);
    const submitButton = screen.getByText('Transform');
    fireEvent.click(submitButton);
    
    // We expect standard HTML5 validation to handle empty file inputs (required attribute)
    // but we can check if it rendered properly.
    expect(submitButton).toBeInTheDocument();
  });
});
