import Shadow from './components/ui/Shadow';

export default function Home() {
  return (
    <section className='flex items-center h-full px-5 md:px-0 py-20 md:py-24 md:ml-[15%] md:mr-[10%]  md:max-w-[75%] '>
      <div className='flex h-full max-h-[510px] w-full'>
        <div className='flex flex-col relative -z-0 justify-between w-full md:basis-1/2 md:space-y-20'>
          <Shadow color='primary' top={0} left={-15} className=' md:hidden' />
          <Shadow
            color='secondary'
            top={150}
            right={-15}
            className='md:hidden'
          />
          <div className='space-y-3'>
            <p className='text-base md:text-xl'>Hi all, I am</p>
            <h1 className='text-6xl leading-[1.25]'>Mohtashim Ali</h1>
            <h2 className='text-xl sm:text-2xl md:text-3xl text-aquamarine md:text-secondary'>
              {'>  '}Front-end developer
            </h2>
          </div>
          <div className='text-xs sm:text-sm md:text-base space-y-4'>
            <p className='text-secondary-dark break-words'>
              {'//'} you can also check it on my GitHub page
            </p>
            <h3 className='font-medium text-salmon break-all '>
              <span className='text-secondary'>const </span>
              <span className='text-aquamarine'> githubLink </span>
              <span className='text-white'>= </span>
              <span className='text-salmon '>
                <a
                  href='https://github.com/MohtashimAli85/portfolio'
                  target='_blank'
                  className='leading-normal'
                >
                  &quot;https://github.com/MohtashimAli85/portfolio&quot;
                </a>
              </span>
            </h3>
          </div>
        </div>
        <div className='hidden md:block basis-1/2'></div>
      </div>
    </section>
  );
}
