import React from 'react';
import { render, screen } from '@testing-library/react';
import login from './login';
test('verify component', () => {
	render(<login />);
	const linkElement = screen.getByText(/login/i);
	expect(linkElement).toBeInTheDocument();
});
