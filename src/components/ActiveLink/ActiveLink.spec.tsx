import { render } from '@testing-library/react'
import { ActiveLink } from '.'


jest.mock('next/router', () =>  {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

describe('ActiveLink component', () => {
    test('Renderizar corretamente', () => {
        const { getByText } = render(
        <ActiveLink href="/" activeClassName="active">
            <a>Home</a>
        </ActiveLink>
        )

        expect(getByText('Home')).toBeInTheDocument()
    })

    test('Adicionar classe "active" se o link estiver ativo', () => {
        const { getByText } = render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
            )

        expect(getByText('Home')).toHaveClass('active')
    })
})
