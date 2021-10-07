import { render, screen } from '@testing-library/react'
import { Header } from '.'


jest.mock('next/router', () =>  {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

describe('Header component', () => {
    test('Renderizar corretamente', () => {
        const { getByText, getByAltText } = render(<Header />)

        expect(getByText('Home')).toBeInTheDocument()
        expect(getByText('Posts')).toBeInTheDocument()
        expect(getByAltText('DevNews')).toBeInTheDocument()
    })
})
