import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CandidateCard from './/CandidateCard';

describe('CandidateCard', () => {
  // Mock data
  const mockRegistration = {
    fullName: 'John Doe',
    createdAt: '2023-06-15T10:30:00Z',
    school: 'Example High School',
    emailAddress: 'john@example.com',
    district: 'Colombo',
    preferredExamCenter: 'University of Colombo',
    whatsappNumber: '94701234567',
    nic: '981234567V'
  };

  test('renders with complete registration data', () => {
    render(<CandidateCard registration={mockRegistration} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Example High School')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Colombo')).toBeInTheDocument();
    expect(screen.getByText('University of Colombo')).toBeInTheDocument();
    expect(screen.getByText('94701234567')).toBeInTheDocument();
  });

  test('renders with alternative field names', () => {
    const altRegistration = {
      name: 'Jane Smith',
      timestamp: '2023-06-15T10:30:00Z',
      schoolName: 'Another School',
      email: 'jane@example.com',
      district: 'Kandy',
      examCenter: 'University of Peradeniya',
      phoneNumber: '94702345678',
      NIC: '992345678V'
    };

    render(<CandidateCard registration={altRegistration} />);

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Another School')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Kandy')).toBeInTheDocument();
    expect(screen.getByText('University of Peradeniya')).toBeInTheDocument();
    expect(screen.getByText('94702345678')).toBeInTheDocument();
  });

  test('handles missing registration data', () => {
    render(<CandidateCard registration={null} />);
    expect(screen.getByText('Invalid candidate data')).toBeInTheDocument();
  });

  test('shows fallback for missing fields', () => {
    const partialRegistration = {
      fullName: 'Bob Jones',
      createdAt: '2023-06-15T10:30:00Z',
      // Missing other fields
    };

    render(<CandidateCard registration={partialRegistration} />);

    expect(screen.getByText('Bob Jones')).toBeInTheDocument();
    expect(screen.getAllByText('Not provided')).toHaveLength(5); // 5 fields have default text
  });

  test('handles invalid date', () => {
    const badDateRegistration = {
      ...mockRegistration,
      createdAt: 'not-a-date'
    };

    render(<CandidateCard registration={badDateRegistration} />);

    expect(screen.getByText('Invalid Date')).toBeInTheDocument();
  });

  test('applies NIC as data attribute', () => {
    render(<CandidateCard registration={mockRegistration} />);
      // eslint-disable-next-line testing-library/no-node-access
    const card = screen.getByText('John Doe').closest('.registration-card');
    expect(card).toHaveAttribute('data-nic', '981234567V');
  });
});