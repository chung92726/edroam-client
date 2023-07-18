import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SingleCourseSkeleton = () => {
  return (
    <div className='bg-gray-100'>
      <div className='text-center bg-gray-700 text-white w-full pb-[20px] md:pt-[50px] flex flex-col justify-center text-[28px] items-center font-bold '>
        <div className='flex flex-col-reverse justify-between items-center gap-4  md:flex-row md:items-start md:w-[90vw] lg:max-w-[1080px] lg:max-h-[363px]'>
          <div className='flex flex-col justify-center items-start gap-4 w-[90vw] md:w-[45vw] '>
            <h1 className='font-bold text-left text-2xl lg:text-3xl'>
              <Skeleton width={350} height={30} />
            </h1>
            <p className='text-left text-[10px] lg:text-[14px]'>
              <Skeleton width={280} />
              <Skeleton width={280} />
              <Skeleton width={280} />
            </p>
            <div className='flex items-center gap-2'>
              <Skeleton width={80} height={30} />
            </div>
            <p className='text-[10px] lg:text-[14px]'>
              <Skeleton width={120} />
            </p>
            <p className='text-[10px] lg:text-[14px]'>
              <Skeleton width={120} />
            </p>
            <div className='flex gap-2'>
              <span className='text-[10px] lg:text-[14px] font-black'>
                <Skeleton width={80} />
              </span>
            </div>
            <button className='btn btn-primary w-full mt-[15px] md:hidden'>
              {/* <Skeleton width={150} /> */}
              Enroll To This Course
            </button>
          </div>
          <div className='flex flex-col justify-center items-center w-[100vw] md:w-[45vw] '>
            <div className='w-full h-[56vw] md:h-[25vw] lg:max-h-[300px]'>
              <Skeleton width='100%' height='100%' />
            </div>
            <button className='btn btn-primary w-full mt-[15px] hidden md:block'>
              {/* <Skeleton width={150} /> */}
              Enroll To This Course
            </button>
          </div>
        </div>
      </div>
      <div className='w-full h-[400px]'>
        <Skeleton width='100%' height='100%' />
      </div>
    </div>
  )
}

export default SingleCourseSkeleton
