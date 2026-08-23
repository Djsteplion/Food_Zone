import FzImage from '../images/Food Zone (2).png';

const Fz = () => {
  return (
    <div className='hidden lg:flex lg:flex-col'>
       <img src={FzImage} alt="Food Zone SideBar Logo" className='w-55 h-35'/> 
       <p className='uppercase text-[16px] font-light text-gray-500 flex flex-column items-start mt-[30px] ml-[50px]'> 
        <span>-</span> 
       <span className='ml-[5px]'>Lorem ipsum dolor sit amet, <br/> consectetur.</span>
       </p>
    </div>
  )
}

export default Fz