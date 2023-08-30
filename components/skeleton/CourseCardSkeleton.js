import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CourseCardSkeleton = () => {
  return (
    <div className='card bg-gray-50 w-[90vw] sm:w-[45vw] xl:w-[30vw] 2xl:w-[440px] min-h-[566px]'>
      <div className='object-cover h-[50vw] sm:h-[25vw] xl:h-[17vw] 2xl:h-[250px]'>
        <Skeleton height={'100%'} />
      </div>

      <div className='p-3 flex flex-col asp-3 min-h-[307px] justify-between'>
        <div className='flex flex-wrap items-center '>
          <Skeleton count={3} width={80} height={20} className='mr-2' />
        </div>

        <div>
          <Skeleton height={20} width={'80%'} />
          <Skeleton height={15} width={'60%'} />
        </div>

        <div>
          <Skeleton height={55} />
        </div>
        <div className='flex items-center gap-2 mb-2'>
          <Skeleton circle={true} height={20} width={20} count={5} />
          <Skeleton width={50} height={15} />
        </div>

        <div className='flex gap-2'>
          <Skeleton width={60} height={15} />
          <Skeleton width={60} height={15} />
        </div>
        <Skeleton height={15} width={'70%'} />
        <Skeleton height={15} width={'70%'} />
        <Skeleton height={15} width={'90%'} />
      </div>
    </div>
  )
}

export default CourseCardSkeleton
