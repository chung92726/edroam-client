import Link from 'next/link';
import { currencyFormatter } from '@/utils/helpers';
import RatingStars from '@/components/stars/RatingStars';

const CourseCard = ({ course, i }) => {
  const {
    name,
    instructor,
    price,
    image,
    slug,
    paid,
    category,
    description,
    level,
    language,
    averageRating,
    numberOfReviews,
  } = course;
  return (
    <Link href={`/course/${slug}`}>
      <div className='card bg-gray-50 w-[90vw] sm:w-[45vw] xl:w-[30vw] 2xl:w-[440px] min-h-[580px]'>
        <img
          className='object-cover h-[50vw] sm:h-[25vw] xl:h-[17vw] 2xl:h-[250px]'
          src={image && image.Location ? image.Location : './figma.jpg'}
          alt='figma'
        />

        <div className='p-3 flex flex-col asp-3 min-h-[337px] justify-between'>
          {/* <div className="flex items-center gap-2">
            {level && <span className="badgeuidesign">{level}</span>}
          </div>
          <div className="flex items-center gap-2">
            {language && <span className="badgeuidesign">{language}</span>}
          </div> */}
          <div>
            <h2
              className='product-title text-[18px]'
              title='Figma UI UX Design'
            >
              {name}
            </h2>
            <p className='text-xs font-bold'>{instructor.name}</p>
          </div>

          <div>
            <span className='flex font-sans text-[12px] text-slate-500 mt-2 h-[55px]'>
              {description.substring(0, 200)}...
            </span>
          </div>
          <div className='flex flex-wrap items-center '>
            {category &&
              category.map((c, index) => (
                <span className='badgeuidesign mr-2' key={index}>
                  {c.label}
                </span>
              ))}
          </div>
          <div className='flex items-center gap-2 mb-2'>
            <RatingStars
              AverageRating={averageRating ? averageRating : 0}
              index={i}
            />
            <span className='text-slate-400 text-sm'>({numberOfReviews})</span>
          </div>
          {/* <div className='rating rating-sm gap-2 '>
              <span className='text-s text-indigo-500 font-bold'>4.5</span>
                  <div>
                    <input
                      type='radio'
                      name='rating-2'
                      className='mask mask-star-2 bg-orange-400'
                    />
                    <input
                      type='radio'
                      name='rating-2'
                      className='mask mask-star-2 bg-orange-400'
                    />
                    <input
                      type='radio'
                      name='rating-2'
                      className='mask mask-star-2 bg-orange-400'
                    />
                    <input
                      type='radio'
                      name='rating-2'
                      className='mask mask-star-2 bg-orange-400'
                    />
                    <input
                      type='radio'
                      name='rating-2'
                      className='mask mask-star-2 bg-orange-400'
                      checked
                    />
                  </div>
                  <span className='text-slate-400'>(2,355)</span>
            </div> */}
          <div className='flex gap-2'>
            <span className='text-[14px] font-black'>
              {paid
                ? currencyFormatter({ amount: price, currency: 'usd' })
                : 'Free'}
            </span>
            <span className='text-slate-400 line-through  text-[12px]'>
              {paid
                ? currencyFormatter({ amount: price + 10, currency: 'usd' })
                : ''}
            </span>
          </div>
          <p className='text-[14px]'>{level && level}</p>
          <p className='text-[14px]'>{language && language}</p>
          <p className='text-[14px]'>
            Last Updated{' '}
            {course &&
              course.updatedAt &&
              new Date(course.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
