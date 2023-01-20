import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Teste do componente NotFound', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const titleNotFound = screen.getByRole('heading', { name: /page requested not found/i, level: 2 });
    expect(titleNotFound).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    const srcImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', srcImage);
  });
});
