import { render, screen } from '@testing-library/react'
import Posts, { getStaticProps } from '../../pages/posts'
import { getPrismicClient } from '../../services/prismic'
import { mocked } from 'ts-jest/utils'

const  posts = [
    {
        slug: 'test-new-post',
        title: 'Title for new post',
        excerpt: 'Post excerpt',
        updateAt: '25 de Dezembro de 2021'
    }
]

jest.mock('../../services/prismic')

describe('Teste da Posts page', () => {
    test('Renderiza componente', () => {
        const { getByText } = render(<Posts posts={posts} />)
        //screen.logTestingPlaygroundURL()

        //debug()

        expect(getByText('Title for new post')).toBeInTheDocument()
    })

    test('Verifica se dados iniciais estão sendo carregados', async () => {
        const getPrismicClientMocked = mocked(getPrismicClient)

        getPrismicClientMocked.mockReturnValueOnce({
            query: jest.fn().mockResolvedValueOnce({
                results: [
                    {
                        uid: 'my-new-post',
                        data: {
                            title: [
                                { type: 'heading', text: 'My new Post'},
                            ],
                            content: [
                                { type: 'paragraph', text: 'Resumo do Post'},
                            ]
                        },
                        last_publication_date: '12-25-2021'
                    }
                ]
            })
        } as any)

        const response = await getStaticProps({})

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    posts: [
                        {
                            slug: 'my-new-post',
                            title: 'My new Post',
                            excerpt: 'Resumo do Post',
                            updateAt: '25 de dezembro de 2021'
                        }
                    ]
                }
            })
        )
    })

})