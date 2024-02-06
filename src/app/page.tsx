export default function Home() {
  return (
    <section className='flex items-center h-full py-24 md:ml-[15%] md:mr-[10%]  md:max-w-[75%] '>
      <div className='flex sm:max-h-[510px] w-full'>
        <div className='basis-1/2 md:space-y-20'>
          <div className='space-y-3'>
            <p className='text-base md:text-xl'>Hi all, I am</p>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-6xl'>
              Mohtashim Ali
            </h1>
            <h2 className='text-xl sm:text-2xl md:text-3xl text-secondary'>
              {'>  '}Front-end developer
            </h2>
          </div>
          <div>
            <p className='text-secondary-dark'>
              {'//'} you can also check it on my GitHub page
            </p>
            <h3 className='font-medium'>
              <span className='text-secondary'>const </span>
              <span className='text-aquamarine'> githubLink </span>=
              <span className='text-salmon'>
                <a
                  href='https://github.com/MohtashimAli85/portfolio'
                  target='_blank'
                >
                  &quot;https://github.com/MohtashimAli85/portfolio&quot;
                </a>
              </span>
            </h3>
          </div>
        </div>
        <div className='basis-1/2'></div>
      </div>
    </section>
  );
}
