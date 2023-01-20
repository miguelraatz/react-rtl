import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando componente Pokemon', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    const namePikachu = screen.getByText(/pikachu/i);

    expect(namePikachu).toBeInTheDocument();
  });

  it('O tipo correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    const typePikachu = screen.getAllByText('Electric');
    expect(typePikachu).toHaveLength(2);
  });

  it('O peso médio do Pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do Pokémon e sua unidade de medida;', () => {
    renderWithRouter(<App />);
    const weight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(weight).toBeInTheDocument();
  });

  it('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do Pokémon', () => {
    renderWithRouter(<App />);
    const image = screen.getByRole('img', { name: /pikachu sprite/i });
    const srcImage = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', srcImage);
    expect(image).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/pokemon/25');
  });

  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);
    const namePikachu = screen.getByRole('heading', { name: /pikachu details/i, level: 2 });
    expect(namePikachu).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemon/25');
    const check = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(check);
    const image = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/star-icon.svg');
    expect(image).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
