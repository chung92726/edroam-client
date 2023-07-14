import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import DetailsPage from '../courseTaps/DetailsPage';
import { MdComment } from 'react-icons/md';

const QandATaps = ({ course }) => {
  const [allsearch, setAllSearch] = useState('');
  const [sorting, setSorting] = useState('');
  const [allQuestionsCount, setAllQuestionsCount] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const [detailsPage, setDetailsPage] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [comment, setComment] = useState('');

  const loadAllCourseQuestions = async () => {
    try {
      const { data } = await axios.get(
        `/api/question?search=${allsearch}&instructorQuery=false&sortBy=${sorting}&courseId=${course._id}`
      );
      setAllQuestions(data.questions);
      setAllQuestionsCount(data.totalCount);
    } catch (err) {
      console.log(err);
    }
  };

  const clickToDetailsPage = (question) => {
    setCurrentQuestion(question);
    setDetailsPage(true);
  };

  const backToQandA = () => {
    setDetailsPage(false);
    setCurrentQuestion(null);
    loadAllCourseQuestions();
  };

  useEffect(() => {
    loadAllCourseQuestions();
  }, [allsearch, sorting]);

  const publishComment = async (questionId) => {
    try {
      if (!comment) {
        return toast.error('Please fill all fields');
      }
      const { data } = await axios.post(`/api/question/${questionId}`, {
        comment,
      });
      console.log(data);
      toast.success('Answer published');
      setCurrentQuestion(data);
      setComment('');
    } catch (err) {
      console.log(err);
      toast.error('Failed to publish answer');
    }
  };

  return (
    <div className='m-4 max-sm:mx-0'>
      {detailsPage ? (
        <div className='w-full'>
          <DetailsPage
            backToQandA={backToQandA}
            currentQuestion={currentQuestion}
            comment={comment}
            setComment={setComment}
            publishComment={publishComment}
            course={course}
          />
        </div>
      ) : (
        <div className='flex flex-col justify-start items-start'>
          <h1 className='font-bold text-[20px] my-4'>
            All Questions ({allQuestionsCount})
          </h1>
          <div className='flex flex-col md:flex-row w-full items-center justify-center md:items-end '>
            <div className='flex flex-row justify-center items-center w-full max-w-sm mx-2 mb-2 bg-white border-2 rounded-lg'>
              <input
                type='text'
                placeholder='Search Questions'
                className='input  input-ghost  w-full max-w-sm '
                value={allsearch}
                onChange={(e) => setAllSearch(e.target.value)}
              />
            </div>
            <div className='flex flex-col md:flex-row justify-start items-center my-2 gap-1'>
              <div className='flex flex-col justify-center items-center '>
                <p className='text-[12px] text-black-500 font-bold mb-2'>
                  Sort By:
                </p>
                <select
                  className='select select-bordered w-full max-w-xs'
                  onChange={(e) => setSorting(e.target.value)}
                >
                  <option value={''}>Last Reply</option>
                  <option value={'creationTime'}>Last Created</option>
                </select>
              </div>
            </div>
          </div>
          {allQuestions &&
            allQuestions.map((question) => (
              <div className='w-full flex  justify-center items-center mb-4 hover:bg-gray-200 py-2 px-2 max-sm:px-0'>
                <img
                  src={question.askedBy.picture}
                  className='w-8 h-8 mr-2 rounded-full'
                />
                <div className='flex flex-col justify-start items-start w-11/12'>
                  <h1 className='font-bold text-[16px]'>{question.title}</h1>
                  <p className='text-[12px] text-blue-500 mr-1'>
                    By {question.askedBy.name}
                  </p>
                  <div className='flex flex-row justify-start items-center'>
                    <p className='text-[12px] text-blue-500 mr-1'>
                      Lesson {question.lessonIndex + 1}
                    </p>
                    <p className='text-[12px] text-gray-500 mr-1'>
                      on {new Date(question.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {/* <p className='text-[12px] text-gray-500 mr-1'>
                    Course: {question.courseId.name}
                  </p> */}
                </div>
                <div className='flex gap-1 flex-row justify-start items-center'>
                  <p className='font-bold text-[14px]'>
                    {question.answers.length}
                  </p>
                  <div className='tooltip' data-tip='View All Reply'>
                    <MdComment
                      size={20}
                      className='text-gray-500 cursor-pointer'
                      onClick={() => clickToDetailsPage(question)}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default QandATaps;
