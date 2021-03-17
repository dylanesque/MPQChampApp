import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { IndexPage } from '../pages';

test('renders all the book information', async () => {
    render <IndexPage >
});