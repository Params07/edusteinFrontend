import React ,{useMemo} from 'react'
import BootCampData from '../DataComponents/BootCampData';
import { IoClose } from 'react-icons/io5';
import useGet from '../Hooks/Get';

const View = ({id,action}) => {
  const url = useMemo(() => `/bootcamps/bootcamp?id=${id}`, [id]); 

  const { data: bootcampData, loading, error } = useGet(url);
  return (
    <div className="fixed  inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center  h-full">
    <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-4 rounded-lg h-5/6 overflow-y-auto ">
      <span className=' w-full flex justify-end ' > <IoClose onClick={()=>{action(true)}} className='cursor-pointer text-4xl text-red-500 '/>
      </span>
      <div className='px-4'>
        {bootcampData &&  bootcampData.length > 0 && 
                <div className='grid gap-6 w-full justify-center'>
                    <div className='text-xl font-semibold'>Title :{bootcampData[0].title}</div>
                    <div className='w-full flex justify-center'><img className='object-contain w-36 h-36' src={bootcampData[0].image_path}/></div>
                    <div className='flex space-x-4'>
                        <div className='text-xl'>About:
                            </div>
                            <div className='text-sm' dangerouslySetInnerHTML={{ __html: bootcampData[0].additional_info }}></div>

                        </div>
                 </div>  
            
            
        }
      </div>
      
  </div>
  </div>
  )
}

export default View