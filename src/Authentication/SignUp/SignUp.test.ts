import React from 'react';
import { render, screen } from '@testing-library/react';
import SignUp from './SignUp';
test('verify component', () => {
	render(<SignUp />);
	const linkElement = screen.getByText(/SignUp/i);
	expect(linkElement).toBeInTheDocument();
});
