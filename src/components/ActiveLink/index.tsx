import Link, { LinkProps } from 'next/link'
import { ReactElement, cloneElement } from 'react'
import { useRouter } from 'next/router'

interface ActiveLinkprops extends LinkProps {
    children: ReactElement,
    activeClassName: string,
}

export function ActiveLink({children, activeClassName, ...otherProps}: ActiveLinkprops) {

    const {asPath} = useRouter()

    const className = asPath === otherProps.href ? activeClassName : ''

    return (
        <Link { ...otherProps}>
            {cloneElement(children, {
                className
            })}
        </Link>
    )
}