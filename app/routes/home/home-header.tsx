import { useLoaderData, useNavigate } from '@remix-run/react'
import { useEffect } from 'react'
import { HomeLoader } from './route'
import HeaderNavPlaceholder from '~/atoms/header-atoms'
import clsx from 'clsx'

export default function HomeHeader() {
  return (
    <>
      <header
        className={clsx(
          'relative flex w-full flex-col items-center', // display
          'h-[95vh] max-h-[536px] md:max-h-[400px]  xl:max-h-[576px]', // dimensions
          "bg-[url('/images/82f1206f112335e2ee4d938ba64f02d6.jpeg')] bg-cover bg-center", // background
          'before:absolute before:inset-0 before:bg-black before:opacity-40', // pseudo-elements
        )}
      >
        <HeaderNavPlaceholder />
        <div
          className={clsx(
            'relative flex grow flex-col items-center justify-between', // display
            'max-w-[452px]  md:max-w-[452px]  md:px-[4px] xl:max-w-[608px]', // dimensions
            'px-[16px] pb-[32px] pt-[30px] md:pb-[48px] md:pt-[38px] xl:py-[80px]', // padding
            'xl:justify-normal xl:gap-[88px]',
          )}
        >
          <div
            id='header-text'
            className={clsx(
              'flex flex-col gap-y-[16px] xl:gap-y-[32px]', // display
              'text-white', // typography
            )}
          >
            <p
              className={clsx(
                'font-robotoSlab text-[36px] leading-[40px] xl:text-[60px] xl:leading-[64px]',
              )} // typography
            >
              What&apos;s going on in the world?
            </p>
            <p
              className={clsx('text-[18px] leading-[24px]')} // typography
            >
              Find the latest news on any topic and save them in your personal
              account.
            </p>
          </div>
          <HeaderSearch />
        </div>
      </header>
    </>
  )
}

export function HeaderSearch() {
  const { searchTerm } = useLoaderData<HomeLoader>()
  const navigate = useNavigate()
  useEffect(() => {
    const searchField = document.getElementById('search-term')
    if (searchField instanceof HTMLInputElement) {
      searchField.value = searchTerm || ''
    } else {
      console.error('failed to select search field')
    }
  }, [searchTerm])

  return (
    <div className='w-full'>
      <form
        id='search-form'
        className={clsx(
          'relative', // positioning
          'flex flex-col gap-[16px] md:flex-row', // display
          'w-full', // dimensions
        )}
        onSubmit={(e) => {
          e.preventDefault()
          const searchField = document.getElementById('search-term')
          if (searchField instanceof HTMLInputElement) {
            navigate('/home/search/' + searchField.value, {
              state: { fromSearch: true },
            })
          } else {
            console.error('failed to select search field')
          }
        }}
      >
        <input
          name='search-term'
          id='search-term'
          type='text'
          placeholder='Topic'
          className={clsx(
            'h-[56px] w-full rounded-3xl xl:h-[64px]', // dimensions
            'px-[16px] focus:outline-none md:px-[24px] md:pr-[196px] xl:pr-[208px]', // margin and padding
          )}
          defaultValue={searchTerm}
          onChange={(e) => {
            e.preventDefault()
            if (e.currentTarget.value === '') {
              navigate('/home')
            }
          }}
        />
        <button
          type='submit'
          className={clsx(
            'h-[56px] w-full rounded-3xl xl:h-[64px]', // dimensions
            'text-[18px] text-white', // typography
            'md:absolute md:right-0 md:w-[160px] xl:w-[168px]', // positioning
            'bg-blue-600 hover:bg-[#347EFF] active:bg-[#2A65CC] ',
          )}
        >
          Search
        </button>
      </form>
    </div>
  )
}
