import { render, screen } from '@testing-library/react'
import Post, { getStaticProps } from '../../pages/posts/[slug]'
import { getPrismicClient } from '../../services/prismic'
import { mocked } from 'ts-jest/utils'

const  post = {
        slug: 'test-new-post',
        title: 'Title for new post',
        content: '<p>Post Content</p>',
        updateAt: '25 de Dezembro de 2021'
    }

jest.mock('../../services/prismic')

jest.mock('next/router', () =>  {
    return {
        useRouter() {
            return {
                isFallBack: false
            }
        }
    }
})
describe('Teste da Posts page', () => {
    test('Renderiza componente', () => {
        const { getByText } = render(<Post post={post} />)
        //screen.logTestingPlaygroundURL()

        //debug()

        expect(getByText('Title for new post')).toBeInTheDocument()
    })

    test('Verifica se dados iniciais estão sendo carregados', async () => {
        const getPrismicClientMocked = mocked(getPrismicClient)

        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                data: {
                    title: [
                        { type: 'heading', text: 'My new Post'},
                    ],
                    content: [
                        { type: 'paragraph', text: '<p>Post Content</p>'},
                    ]
                },
                last_publication_date: '12-25-2021'
            })
        } as any)

        const response = await getStaticProps({
            params: { slug: 'test-new-post' }
        })

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    post: {
                            slug: 'test-new-post',
                            title: 'My new Post',
                            content: '<p>Post Content</p>',
                            updateAt: '25 de dezembro de 2021'
                        }
                }
            })
        )
    })

})