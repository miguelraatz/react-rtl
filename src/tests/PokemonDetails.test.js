import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente PokemonDetails', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('link', { name: /more details/i });
    act(() => userEvent.click(button));
    screen.getByRole('heading', { name: /pikachu details/i });
    expect(button).not.toBeInTheDocument();
    screen.getByRole('heading', { name: /summary/i, level: 2 });
    screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('link', { name: /more details/i });
    userEvent.click(button);
    screen.getByRole('heading', { name: /game locations of pikachu/i });
    screen.getByText(/kanto viridian forest/i);
    screen.getByText(/kanto power plant/i);
    const arrayImages = screen.getAllByRole('img');
    expect(arrayImages[1]).toBeInTheDocument();
    expect(arrayImages[2]).toBeInTheDocument();
    expect(arrayImages[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(arrayImages[2]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(arrayImages[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(arrayImages[2]).toHaveAttribute('alt', 'Pikachu location');
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('link', { name: /more details/i });
    userEvent.click(button);
    const check = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(check).toBeInTheDocument();
    userEvent.click(check);
    expect(check).toBeChecked();
    userEvent.click(check);
    expect(check).not.toBeChecked();
    screen.getByLabelText(/pokémon favoritado\?/i);
  });
});
