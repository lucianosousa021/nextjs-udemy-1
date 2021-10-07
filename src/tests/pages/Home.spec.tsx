import { render, screen } from '@testing-library/react'
import Home from '../../pages'

describe('Teste da Home page', () => {
    test('Renderiza componente', () => {
        const { getByText, getByAltText, debug } = render(<Home />)
        //screen.logTestingPlaygroundURL()

        //debug()

        expect(getByText('Olá Dev!')).toBeInTheDocument()
        expect(getByAltText('Home Image')).toBeInTheDocument()
    })


})