import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';

describe('Testes da tela de Login', () => {
    test('Testa se a tela de login possui inputs para nome e email do usuário:', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        const name = screen.getByRole('textbox', {
            name: /name:/i
          });
        const email = screen.getByRole('textbox', {
            name: /email:/i
          });
        
        expect(history.location.pathname).toBe('/');
        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
    });
    
    test('Testa se a tela de login possui botão "play" e se ele fica dasabilitado se os campos não forem preenchidos:', () => {
        renderWithRouterAndRedux(<Login />);
        const playBtn = screen.getByRole('button', {
            name: /play/i
          });
        const name = screen.getByRole('textbox', {
            name: /name:/i
          });
        const email = screen.getByRole('textbox', {
            name: /email:/i
          });  

        expect(name.value).toBe('');
        expect(name.id).toBe('name');
        expect(email.value).toBe('');
        expect(playBtn.disabled).toBe(true);

        userEvent.type(name, 'Test');
        expect(name.value).toBe('Test');
        expect(playBtn.disabled).toBe(true);

        userEvent.type(email, 'test@test.com');
        expect(email.value).toBe('test@test.com');
        expect(playBtn.disabled).toBe(false);
    });
});