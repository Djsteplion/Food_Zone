import FzImage from '../images/Food Zone (2).png';

const FzSecond = () => {
  return (
    <div className='hidden lg:flex lg:flex-col lg:mt-[170px] lg:ml-[60px]'>
       <img src={FzImage} alt="Food Zone SideBar Logo" className='w-30 h-30'/> 
       <p className='uppercase text-[13px] font-light text-gray-500 flex flex-column items-start mt-[30px] ml-[50px]'> 
        <span>-</span> 
       <span className='ml-[5px]'>creativity meets taste</span>
       </p>
    </div>
  )
}

export default FzSecond