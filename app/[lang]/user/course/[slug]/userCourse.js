'use client'
import {
  AppstoreOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  MailOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import StudentRoute from '@/components/routes/StudentRoute'
import { useRouter } from 'next/navigation'
import { Menu, Button, Layout, theme, Avatar } from 'antd'
import { FaPlayCircle } from 'react-icons/fa'
import ReactPlayer from 'react-player'
import {
  BsArrowLeftSquare,
  BsArrowRightSquare,
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from 'react-icons/bs'
import CourseTaps from '@/components/courseTaps/CourseTaps'
import LessonContentCard from '@/components/cards/LessonContentCard'
import PopupRating, { openModal } from '@/components/popupRating/PopupRating'
import FullScreenContainer from '@/components/fullScreenContainer/FullScreenContainer'

const { Sider } = Layout

const { SubMenu, Item } = Menu
const singleCourse = ({ params, userCourse, readMore, allRate }) => {
  const [course, setCourse] = useState({ lessons: [] })
  const [loading, setLoading] = useState(false)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const [currentVideo, setCurrentVideo] = useState(null)
  const [currentLesson, setCurrentLesson] = useState(-1)
  const [collapsed, setCollapsed] = useState(false)
  const [completedLessons, setCompletedLessons] = useState([])
  const [videoUrl, setVideoUrl] = useState('')
  const [playerHover, setPlayerHover] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const { slug } = params
  const router = useRouter()

  const loadCourse = async () => {
    try {
      const { data } = await axios.get(`/api/user/course/${slug}`)
      setCourse(data)
    } catch (err) {
      toast.error('You are not enrolled')
      router.push('/login')
    }
  }
  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: course._id,
    })
    setCompletedLessons(data)
  }
  const markCompleted = async () => {
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: course.lessons[currentLesson]._id,
    })
    loadCompletedLessons()
  }
  const markCompletedAndNext = async () => {
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: course.lessons[currentLesson]._id,
    })
    loadCompletedLessons()

    setCurrentLesson(currentLesson + 1)
  }
  const markInCompleted = async () => {
    const { data } = await axios.post(`/api/mark-incompleted`, {
      courseId: course._id,
      lessonId: course.lessons[currentLesson]._id,
    })
    loadCompletedLessons()
  }

  const getVideoUrl = async () => {
    if (course.lessons[currentLesson].video) {
      const { data } = await axios.post('/api/course/get-course-signedurl', {
        filename: course.lessons[currentLesson].video.Key,
      })
      setVideoUrl(data)
    }
  }

  async function saveProgress(changeLesson = false) {
    // Assume you have a function to get the user's ID

    const data = {
      courseId: course._id,
      lessonId: course.lessons[currentLesson]._id,
      lessonIndex: currentLesson,
      videoId: course.lessons[currentLesson].video
        ? course.lessons[currentLesson].video.Key
        : null,
      timestamp: playedSeconds,
    }

    try {
      await axios.post('/api/lesson-history/save-progess', data)
    } catch (error) {
      console.error('Failed to save progress:', error)
    }
  }

  async function getCourseProgress() {
    // Assume you have a function to get the user's ID

    try {
      const response = await axios.get(
        `/api/lesson-history/get-progress/${course._id}`
      )
      console.log('hi')
      console.log(response)
      const { lessonIndex } = response.data

      setCurrentLesson(lessonIndex)
    } catch (error) {
      console.error('Failed to get course progress:', error)
    }
  }

  useEffect(() => {
    if (course && currentLesson !== -1) {
      saveProgress()
    }
  }, [currentLesson])

  useEffect(() => {
    if (course && currentLesson !== -1) {
      getVideoUrl()
    }
  }, [currentLesson])

  useEffect(() => {
    if (slug) loadCourse()
  }, [slug])

  useEffect(() => {
    if (course._id) {
      loadCompletedLessons()
      getCourseProgress()
    }
  }, [course])

  const video_player = useRef()

  const [isReady, setIsReady] = useState(false)

  const onReady = () => {
    if (!isReady) {
      if (course && course.lessons && course.lessons[currentLesson]) {
        const timeToStart = parseFloat(
          localStorage.getItem(`${course.lessons[currentLesson]._id}`)
        )
        // const timeToStart = 60 + 12.6
        console.log(timeToStart)
        if (!isNaN(timeToStart)) {
          setPlayedSeconds(timeToStart)
          video_player.current.seekTo(timeToStart)
        }
      }
    }
  }

  useEffect(() => {
    setIsReady(false)
    console.log(video_player)
  }, [course, currentLesson])

  return (
    <StudentRoute>
      <Layout
        className='mt-1'
        hasSider
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => {
            setCollapsed(value)
            console.log('coll')
          }}
          width={320}
          collapsedWidth={65}
          breakpoint='lg'
          onBreakpoint={(broken) => {
            console.log(broken)
          }}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            zIndex: 1,
          }}
        >
          <div className='demo-logo-vertical' />
          <Menu
            theme='dark'
            selectedKeys={currentLesson.toString()}
            mode='inline'
            className='mt-6 '
            inlineIndent={10}
            style={{ minWidth: 0, flex: 'auto' }}
          >
            {course.lessons.map((lesson, index) => (
              <Item
                onClick={() => {
                  if (currentLesson !== -1) {
                    saveProgress()
                  }
                  setCurrentLesson(index)
                }}
                key={index.toString()}
                style={{
                  styleInline: '0px',
                  height: '100px',
                  wordBreak: 'break-words',
                }}
                icon={
                  <Avatar
                    size='small'
                    gap={2}
                    style={
                      completedLessons.includes(lesson._id)
                        ? {
                            backgroundColor: '#1890ff',
                            verticalAlign: 'middle',
                          }
                        : {
                            backgroundColor: '#808080',
                            verticalAlign: 'middle',
                          }
                    }
                    className='font-bold '
                  >
                    {index + 1}
                  </Avatar>
                }
              >
                <p className=''>{lesson.title}</p>
              </Item>
            ))}
          </Menu>
        </Sider>
        <Layout
          className='site-layout'
          style={{ marginLeft: collapsed ? 65 : 320 }}
        >
          {currentLesson !== -1 ? (
            <div>
              <div className='relative h-[75vh] overflow-y-auto'>
                <div className='flex justify-between  py-3 px-5 bg-[#091626] items-center'>
                  <h1 className='text-[18px] font-bold text-indigo-200'>
                    {course &&
                      course.lessons &&
                      course.lessons[currentLesson] &&
                      course.lessons[currentLesson].title}
                  </h1>
                  {completedLessons.includes(
                    course.lessons[currentLesson]._id
                  ) ? (
                    <span
                      onClick={markInCompleted}
                      className='text-[12px] text-indigo-200 cursor-pointer'
                    >
                      {userCourse.mark_incomplete}
                    </span>
                  ) : (
                    <span
                      onClick={markCompleted}
                      className='text-[12px] text-indigo-200 cursor-pointer'
                    >
                      {userCourse.mark_complete}
                    </span>
                  )}
                </div>
                {course &&
                course.lessons &&
                course.lessons[currentLesson] &&
                course.lessons[currentLesson].video ? (
                  <div
                    className='h-[67vh] relative w-full'
                    onMouseLeave={() => {
                      setPlayerHover(false)
                    }}
                    onMouseEnter={() => {
                      setPlayerHover(true)
                    }}
                  >
                    <ReactPlayer
                      // url={course.lessons[currentLesson].video.Location}
                      url={videoUrl}
                      width='100%'
                      height='100%'
                      className='bg-black'
                      ref={video_player}
                      controls
                      onReady={() => {
                        onReady()
                        setIsReady(true)
                      }}
                      onProgress={({ playedSeconds, loadedSeconds }) => {
                        if (
                          playedSeconds != 0 &&
                          playedSeconds != loadedSeconds
                        ) {
                          setPlayedSeconds(playedSeconds)
                          localStorage.setItem(
                            `${course.lessons[currentLesson]._id}`,
                            playedSeconds
                          )
                        }
                      }}
                      onPause={() => saveProgress()}
                      onEnded={() => {
                        saveProgress()
                        markCompletedAndNext()
                        localStorage.removeItem(
                          `${course.lessons[currentLesson]._id}`
                        )
                      }}
                      onContextMenu={(e) => e.preventDefault()}
                      config={{
                        file: {
                          attributes: {
                            controlsList: 'nodownload', //<- this is the important bit
                          },
                        },
                      }}
                    />

                    {playerHover && (
                      <BsFillArrowLeftSquareFill
                        className='absolute text-gray-500 top-[40%] left-5 cursor-pointer'
                        size={30}
                        onClick={() => {
                          if (currentLesson > 0) {
                            setCurrentLesson(currentLesson - 1)
                          }
                        }}
                      />
                    )}
                    {playerHover && (
                      <BsFillArrowRightSquareFill
                        className='absolute text-gray-500 top-[40%] right-5 cursor-pointer'
                        size={30}
                        onClick={() => {
                          if (currentLesson < course.lessons.length - 1) {
                            setCurrentLesson(currentLesson + 1)
                          }
                        }}
                      />
                    )}
                  </div>
                ) : (
                  course &&
                  course.lessons &&
                  course.lessons[currentLesson] &&
                  course.lessons[currentLesson].content && (
                    <FullScreenContainer>
                      <LessonContentCard
                        content={course.lessons[currentLesson].content}
                        course={course}
                        currentLesson={currentLesson}
                      />
                    </FullScreenContainer>
                  )
                )}
                {course.lessons &&
                  course.lessons[currentLesson] &&
                  !course.lessons[currentLesson].video && (
                    <BsArrowLeftSquare
                      className='absolute text-gray-500 top-[50%] left-5 cursor-pointer'
                      size={30}
                      onClick={() => {
                        if (currentLesson > 0) {
                          setCurrentLesson(currentLesson - 1)
                        }
                      }}
                    />
                  )}

                {course.lessons &&
                  course.lessons[currentLesson] &&
                  !course.lessons[currentLesson].video && (
                    <BsArrowRightSquare
                      className='absolute text-gray-500 top-[50%] right-5 cursor-pointer'
                      size={30}
                      onClick={() => {
                        if (currentLesson < course.lessons.length - 1) {
                          setCurrentLesson(currentLesson + 1)
                        }
                      }}
                    />
                  )}
              </div>
              <CourseTaps
                course={course}
                currentLesson={currentLesson}
                slug={slug}
                courseTaps = {userCourse['courseTaps']}
                readMore = {readMore}
                allRate = {allRate}
              />
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center mt-20'></div>
          )}
        </Layout>
      </Layout>
    </StudentRoute>
  )
}

export default singleCourse
