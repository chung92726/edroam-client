'use client';
import { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import dynamic from 'next/dynamic';
import axios from 'axios';
// import Quill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { MdComment } from 'react-icons/md';
import DetailsPage from '@/components/courseTaps/DetailsPage';

const Quill = dynamic(
  () => {
    return import('react-quill');
  },
  { ssr: false }
);

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const AllQuestions = ({ course, currentLesson }) => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [allsearch, setAllSearch] = useState('');
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [allQuestionsCount, setAllQuestionsCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [detailsPage, setDetailsPage] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [comment, setComment] = useState('');
  const [courses, setCourses] = useState(null);
  const [courseFilter, setCourseFilter] = useState('');
  const [courseFilter2, setCourseFilter2] = useState('');
  const [sorting, setSorting] = useState('');
  const [sorting2, setSorting2] = useState('');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get('/api/instructor-courses');
    setCourses(data);
  };

  const loadCourseQuestions = async () => {
    try {
      const { data } = await axios.get(
        `/api/question?unansweredByInstructor=true&search=${search}&instructorQuery=true&courseId=${courseFilter}&sortBy=${sorting}`
      );
      setQuestions(data.questions);
      setQuestionCount(data.totalCount);
    } catch (err) {
      console.log(err);
    }
  };

  const loadAllCourseQuestions = async () => {
    try {
      const { data } = await axios.get(
        `/api/question?search=${allsearch}&instructorQuery=true&courseId=${courseFilter2}&sortBy=${sorting2}`
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
    loadCourseQuestions();
    loadAllCourseQuestions();
  };

  useEffect(() => {
    loadCourseQuestions();
  }, [search, courseFilter, sorting]);

  useEffect(() => {
    loadAllCourseQuestions();
  }, [allsearch, courseFilter2, sorting2]);

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
    <div className='w-[95%] mx-8 mb-4 mt-8 overflow-x-hidden max-sm:mx-0 max-sm:w-full max-sm:px-2'>
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
        <div className='w-full flex flex-col justify-start items-start max-w-2x1 '>
          <h1 className='font-bold text-[20px] my-4 max-sm:pl-2'>
            Questions That Need Answers ({questionCount})
          </h1>
          <div className='flex flex-col md:flex-row w-full  items-center justify-center md:items-end '>
            <div className='flex flex-row justify-center items-center w-full max-w-sm mx-2 mb-2 bg-white border-2 rounded-lg'>
              <input
                type='text'
                placeholder='Search Unanswered Questions'
                className='input  input-ghost  w-full max-w-sm '
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* <div className='px-3 py-3.5 bg-black rounded-lg cursor-pointer'>
                <BsSearch size={20} className='text-white' />
            </div> */}
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
              <div className='flex flex-col justify-center items-center '>
                <p className='text-[12px] text-black-500 font-bold mb-2'>
                  Filter Course:
                </p>
                <select
                  className='select select-bordered w-full max-w-xs'
                  onChange={(e) => setCourseFilter(e.target.value)}
                >
                  <option value={''}>All Courses</option>
                  {courses &&
                    courses.map((course) => (
                      <option value={course._id}>{course.name}</option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          {questions &&
            questions.map((question) => (
              <div className='w-full  flex  justify-center items-center mb-4 hover:bg-gray-200 py-2 px-2'>
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
                  <p className='text-[12px] text-gray-500 mr-1'>
                    Course: {question.courseId.name}
                  </p>
                  {/* <p className='text-[12px] text-gray-500 mr-1'>
                    lesson:{' '}
                    {question.courseId.lessons[question.lessonIndex].title}
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

          <h1 className='font-bold text-[20px] my-4 max-sm:pl-2'>
            All Questions ({allQuestionsCount})
          </h1>
          {/* // ask question area */}
          <div className='flex flex-col md:flex-row w-full  items-center justify-center md:items-end '>
            <div className='flex flex-row justify-center items-center w-full max-w-sm mx-2 mb-2 bg-white border-2 rounded-lg'>
              <input
                type='text'
                placeholder='Search Questions'
                className='input  input-ghost  w-full max-w-sm '
                value={allsearch}
                onChange={(e) => setAllSearch(e.target.value)}
              />

              {/* <div className='px-3 py-3.5 bg-black rounded-lg cursor-pointer'>
                <BsSearch size={20} className='text-white' />
              </div> */}
            </div>
            <div className='flex flex-col md:flex-row justify-start items-center my-2 gap-1'>
              <div className='flex flex-col justify-center items-center '>
                <p className='text-[12px] text-black-500 font-bold mb-2'>
                  Sort By:
                </p>
                <select
                  className='select select-bordered w-full max-w-xs'
                  onChange={(e) => setSorting2(e.target.value)}
                >
                  <option value={''}>Last Reply</option>
                  <option value={'creationTime'}>Last Created</option>
                </select>
              </div>
              <div className='flex flex-col justify-center items-center '>
                <p className='text-[12px] text-black-500 font-bold mb-2'>
                  Filter Course:
                </p>
                <select
                  className='select select-bordered w-full max-w-xs'
                  onChange={(e) => setCourseFilter2(e.target.value)}
                >
                  <option value={''}>All Courses</option>
                  {courses &&
                    courses.map((course) => (
                      <option value={course._id}>{course.name}</option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          {allQuestions &&
            allQuestions.map((question) => (
              <div className='w-full  flex  justify-center items-center mb-4 hover:bg-gray-200 py-2 px-2'>
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
                  <p className='text-[12px] text-gray-500 mr-1'>
                    Course: {question.courseId.name}
                  </p>
                  {/* <p className='text-[12px] text-gray-500 mr-1'>
                    lesson:{' '}
                    {question.courseId.lessons[question.lessonIndex].title}
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

export default AllQuestions;
