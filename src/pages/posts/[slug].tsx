import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import SEO from '../../components/SEO'
import styles from './post.module.scss'

import Prismic from '@prismicio/client'
import {RichText} from 'prismic-dom'

import { getPrismicClient } from "../../services/prismic"


interface Post {

    post: {
        slug: string;
        title: string;
        content: string;
        updateAt: string;
    }

}

export default function Post({post}: Post){

    const router = useRouter()

    if (router.isFallback) {
        return <p>Loading...</p>
    }

    return(
        <>
            <SEO title="Posts" />
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updateAt}</time>
                    <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>
            </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return{
        paths: [],
        fallback: true
    }
}


export const getStaticProps: GetStaticProps = async (context) => {
    const {slug} = context.params
    const prismic = getPrismicClient()
    const response = await prismic.getByUID('post', String(slug), {})

    const post = {
            slug,
            title: RichText.asText(response.data.title),
            content: RichText.asText(response.data.content),
            updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    return {
        props: {post},
        revalidate: 60 * 60 * 12 // 12 horas
    }

}
