import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste do componente App', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });
  it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });
  it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });
  it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');
  });
  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/pagina'));
    const notFound = screen.getByRole('heading', { name: /page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
});
