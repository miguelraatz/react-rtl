import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

beforeEach(() => {
  renderWithRouter(<About />);
});

describe('Teste do componente About', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const titleAbout = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(titleAbout).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const firstParagraph = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    const secondParagraph = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    const imgPokedex = screen.getByRole('img', {
      name: /pokédex/i,
    });
    const srcImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imgPokedex).toBeInTheDocument();
    expect(imgPokedex).toHaveAttribute('src', srcImg);
  });
});
