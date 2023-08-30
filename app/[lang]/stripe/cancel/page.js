import UserRoute from '@/components/routes/UserRoutes'
import { MdOutlineNearbyError } from 'react-icons/md'

const StripeCancel = () => {
  return (
    <UserRoute showNav={false}>
      <div className='flex flex-col justify-center items-center'>
        <MdOutlineNearbyError className='text-[100px] text-red-500 mt-20 mb-5' />
        <h1 className='text-[20px] font-bold'>Payment failed. Try again.</h1>
      </div>
    </UserRoute>
  )
}

export default StripeCancel
