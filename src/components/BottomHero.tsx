import xum from '../images/XUM.png';
import food from '../images/food 2.png';

const BottomHero = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full p-4 lg:hidden">
            {/* Main Card */}
            <div className="w-full  bg-gray-200 rounded-[10px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.1)] ">
                {/* Header */}
                <div className="mb-2 flex flex-row justify-between items-center">
                    <div className='flex flex-col items-center gap-[15px] mt-[10px]'>
                        <img src={xum} alt=""  className='h-[12px] w-[37px]' />
                        <img src={food} alt=""  className='h-[30px] w-[50px]' />
                    </div>
                    <div className=' flex flex-col gap-[1px] ml-auto'>
                        <h1 className="text-[25px] font-bold text-gray-900 mb-2">FOOD ZONE</h1>
                        <p className="text-gray-500 text-sm text-italic text-[15px] pl-[2px] mt-[-8px]">Where Creativity Meets Taste</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default BottomHero