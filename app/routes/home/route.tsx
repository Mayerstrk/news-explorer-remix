import { LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import HomeAuthor from './home-author'
import HomeHeader from './home-header'

export const loader = ({ params }: LoaderFunctionArgs) => {
  return { searchTerm: params.searchTerm || '' }
}

export default function Home() {
  return (
    <>
      <HomeHeader />
      <Outlet />
      <HomeAuthor />
    </>
  )
}

export type HomeLoader = typeof loader
