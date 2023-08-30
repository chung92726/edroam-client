import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export default function Loading() {
  return <Skeleton count={50} height={30} />
}
