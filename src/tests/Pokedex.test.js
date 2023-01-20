import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

beforeEach(() => {
  renderWithRouter(<App />);
});

describe('Teste do componente Pokedex', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    const titlePokedex = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(titlePokedex).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(button).toHaveTextContent(/próximo pokémon/i);
    pokemonList.forEach((element) => {
      const namePokemon = screen.getByText(element.name);
      expect(namePokemon).toBeInTheDocument();
      userEvent.click(button);
    });
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const arrayTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const buttonAll = screen.getByRole('button', { name: /all/i });
    buttons.forEach((button, index) => {
      expect(button).toHaveTextContent(arrayTypes[index]);
      userEvent.click(button);
      const type = screen.getAllByText(arrayTypes[index]);
      expect(type).toHaveLength(2);
      expect(buttonAll).toBeInTheDocument();
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const buttonAll = screen.getByRole('button', { name: /all/i });
    const buttonNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    const namePikachu = screen.getByText(/pikachu/i);
    expect(buttonAll).toHaveTextContent(/all/i);
    userEvent.click(buttonAll);
    expect(buttonNextPokemon).not.toBeDisabled();
    expect(namePikachu).toBeInTheDocument();
  });
});
