import SidePanel from '../components/SidePanel'
import expressLogo from '../assests/express.png'
import mongodbLogo from '../assests/mongodb.png'
import reduxLogo from '../assests/redux.png'
import tailwindcss from '../assests/tailwindcss.png'
import unsplash from '../assests/unsplash.webp'
import atlas from '../assests/atlas.png'

const About = () => {  
  return (
    <div className='bj-container w-full sm:w-4/5'>      
      <div className='w-full lg:w-1/2 p-3'>
        <div className='my-4 flex flex-col px-8 items-center'>
          <h1 className='text-2xl xl:text-3xl font-extrabold'>
            About
          </h1>
          <div className='w-full  my-6 text-gray-500'>
            <div className='flex items-center justify-between uppercase border-b-2 py-2 mb-2'>
              <span>Server</span>
              <span>Client</span>
            </div>
            <div className='flex items-center justify-between mb-2'>
              <div className=''>
                <i className='fab fa-node w-8'></i>
                <span>NodeJS</span>
              </div>
              <div className='hidden sm:block sm:w-1/3 text-center ml-7'>
                <span>Language</span>
              </div>
              <div className=''>
                <span>Javascript</span>
                <i className='fab fa-js-square w-4 ml-3'></i>
              </div>
            </div>
            <div className='flex items-center justify-between mb-2'>
              <div className='flex items-center'>
                <img className='w-4 h-4 mr-4' src={expressLogo} alt="Express"/>
                <span>Express</span>
              </div>
              <div className='hidden sm:block sm:w-1/3 text-center'>
                <span>Framework</span>
              </div>
              <div className=''>
                <span>React</span>
                <i className='fab fa-react w-4 ml-3'></i>
              </div>
            </div>
            <div className='flex items-center justify-between mb-2'>
              <div className='flex items-center'>
                <img className='w-4 h-4 mr-4' src={mongodbLogo} alt="Express"/>
                <span>MongoDB</span>
              </div>
              <div className='hidden sm:block sm:w-1/3 text-center'>
                <span>DB / State</span>
              </div>
              <div className='flex items-center'>
                <span>Redux</span>
                <img className='w-4 h-4 ml-3' src={reduxLogo} alt="Express"/>
              </div>
            </div>
            <div className='flex items-center justify-end mb-2'>
              
              {/* <div className='hidden sm:block sm:w-1/2 text-center mr-3'>
                <span>CSS</span>
              </div> */}
              <div className='flex items-center'>
                <span>CSS: TailwindCss</span>
                <img className='w-4 h-4 ml-3' src={tailwindcss} alt="Express"/>
              </div>
            </div>            
            <div className='flex items-center justify-between mb-2'>
              <div className=''>
                <span>NodeMailer</span>
              </div>
              <div className='hidden sm:block sm:w-1/3 text-center'>
                <span>Mailing</span>
              </div>
              <div className=''>
                <span>emailJS</span>                
              </div>
            </div>
          </div>
          
          <div className='w-full mb-1 text-gray-500'>
            <div className='flex items-center justify-between uppercase border-b-2 py-2 mb-2'>
              <span>Api</span>
              <span>Sources</span>
            </div>
            <div className='flex items-center justify-between mb-2'>              
              <a href='https://unsplash.com' target='_blank' className='hover:text-indigo-500' rel='noopener noreferrer'>
                <div className='flex items-center'>
                  <img className='w-4 h-4 mr-4' src={unsplash} alt="Express"/>
                  <span>Unsplash</span>
                </div>
              </a>            
              <a href='https://github.com/badjin/tableTop' target='_blank' className='hover:text-indigo-500' rel='noopener noreferrer'>
                <span>Github</span>
                <i className='fab fa-github-square  w-4 ml-3'></i>
              </a>             
            </div>            
          </div>

          <div className='w-full -mt-2 text-gray-500 mb-2'>
            <a href='https://www.boardgameatlas.com/' target='_blank' className='hover:text-indigo-500' rel='noopener noreferrer'>
              <div className='flex items-center'>
                <img className='w-4 h-4 mr-4' src={atlas} alt="Express"/>
                <span>Board Game Atlas</span>
              </div>
            </a>
          </div>

          {/* <div className='w-full flex-1 mt-5 text-gray-500'>
            <div className='flex items-center justify-center uppercase border-b-2 py-2 px-10 mb-2'>
              <span>Database</span>
            </div>
            <div className='text-center px-2'>
              <span>You can select firebase DB and MongoDB using the <b>config.env</b> file.</span>
            </div>
          </div> */}

        </div>
      </div>
      <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
        <SidePanel />   
      </div>
    </div>
  )
}

export default About