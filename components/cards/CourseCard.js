import Link from "next/link";
import { currencyFormatter } from "@/utils/helpers";

const CourseCard = ({ course }) => {
  const { name, instructor, price, image, slug, paid, category, description } =
    course;
  return (
    <Link href={`/course/${slug}`}>
      <div className="card bg-gray-50 w-[33rem]">
        <img
          className="h-[250px] object-cover"
          src={image && image.Location ? image.Location : "./figma.jpg"}
          alt="figma"
        />

        <div className="p-3 flex-col asp-3">
          <div className="flex items-center gap-2">
            {category &&
              category.split(" ").map((c, index) => (
                <span className="badgeuidesign" key={index}>
                  {c}
                </span>
              ))}
          </div>
          <div>
            <h2
              className="product-title text-[18px]"
              title="Figma UI UX Design"
            >
              {name}
            </h2>
            <p className="text-xs font-bold">{instructor.name}</p>
          </div>

          <div>
            <span className="flex font-sans text-[12px] text-slate-500 my-2">
              {description.substring(0, 150)}...
            </span>
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
          <div className="flex gap-2">
            <span className="text-[14px] font-black">
              {paid
                ? currencyFormatter({ amount: price, currency: "usd" })
                : "Free"}
            </span>
            <span className="text-slate-400 line-through  text-[12px]">
              {paid
                ? currencyFormatter({ amount: price + 10, currency: "usd" })
                : ""}
            </span>
          </div>
          <p className="text-[14px]">
            Last Updated{" "}
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
