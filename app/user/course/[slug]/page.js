"use client";
import {
  AppstoreOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  MailOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import StudentRoute from "@/components/routes/StudentRoute";
import { useRouter } from "next/navigation";
import { Menu, Button, Layout, theme, Avatar } from "antd";
import { FaPlayCircle } from "react-icons/fa";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
const { Sider } = Layout;

const { SubMenu, Item } = Menu;
const singleCourse = ({ params }) => {
  const [course, setCourse] = useState({ lessons: [] });
  const [loading, setLoading] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { slug } = params;
  const router = useRouter();

  const loadCourse = async () => {
    try {
      const { data } = await axios.get(`/api/user/course/${slug}`);
      setCourse(data);
    } catch (err) {
      toast.error("You are not enrolled");
      router.push("/login");
    }
  };
  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: course._id,
    });
    setCompletedLessons(data);
  };
  const markCompleted = async () => {
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: course.lessons[currentLesson]._id,
    });
    loadCompletedLessons();
  };
  const markCompletedAndNext = async () => {
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: course.lessons[currentLesson]._id,
    });
    loadCompletedLessons();

    setCurrentLesson(currentLesson + 1);
  };
  const markInCompleted = async () => {
    const { data } = await axios.post(`/api/mark-incompleted`, {
      courseId: course._id,
      lessonId: course.lessons[currentLesson]._id,
    });
    loadCompletedLessons();
  };

  const getVideoUrl = async () => {
    const { data } = await axios.post("/api/course/get-signedurl", {
      filename: course.lessons[currentLesson].video.Key,
    });
    setVideoUrl(data);
  };

  useEffect(() => {
    if (course && currentLesson !== -1) {
      getVideoUrl();
    }
  }, [currentLesson]);

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

  useEffect(() => {
    if (course._id) {
      loadCompletedLessons();
    }
  }, [course]);

  return (
    <StudentRoute>
      <Layout
        style={{
          minHeight: "100vh",
        }}
        className="mt-1"
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={320}
          collapsedWidth={80}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            selectedKeys={currentLesson.toString()}
            mode="inline"
            className="mt-4 "
            inlineIndent={10}
            style={{ minWidth: 0, flex: "auto" }}
          >
            {course.lessons.map((lesson, index) => (
              <Item
                onClick={() => setCurrentLesson(index)}
                key={index.toString()}
                style={{ styleInline: "0px" }}
                icon={
                  <Avatar
                    size="small"
                    gap={4}
                    style={
                      completedLessons.includes(lesson._id)
                        ? {
                            backgroundColor: "#1890ff",
                            verticalAlign: "middle",
                          }
                        : {
                            backgroundColor: "#808080",
                            verticalAlign: "middle",
                          }
                    }
                    className="font-bold"
                  >
                    {index + 1}
                  </Avatar>
                }
              >
                {lesson.title}
              </Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          {currentLesson !== -1 ? (
            <div>
              <div className="flex justify-between  py-3 px-5 bg-[#091626] items-center">
                <h1 className="text-[18px] font-bold text-indigo-200">
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
                    className="text-[12px] text-indigo-200 cursor-pointer"
                  >
                    Mark as incompleted
                  </span>
                ) : (
                  <span
                    onClick={markCompleted}
                    className="text-[12px] text-indigo-200 cursor-pointer"
                  >
                    Mark as completed
                  </span>
                )}
              </div>
              {course &&
                course.lessons &&
                course.lessons[currentLesson] &&
                course.lessons[currentLesson].video &&
                course.lessons[currentLesson].video.Location && (
                  <div className="h-[82vh]">
                    <ReactPlayer
                      // url={course.lessons[currentLesson].video.Location}
                      url={videoUrl}
                      width="100%"
                      height="100%"
                      controls
                      onContextMenu={(e) => e.preventDefault()}
                      config={{
                        file: {
                          attributes: {
                            controlsList: "nodownload", //<- this is the important bit
                          },
                        },
                      }}
                      onEnded={markCompletedAndNext}
                    />
                  </div>
                )}
              <ReactMarkdown
                children={
                  course &&
                  course.lessons &&
                  course.lessons[currentLesson] &&
                  course.lessons[currentLesson].content
                }
                className="mx-10 mt-5"
              />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center mt-20">
              <FaPlayCircle size={100} className="text-blue-500" />
              <h1 className="text-2xl font-bold mt-3">
                Click on the lesson to start
              </h1>
            </div>
          )}
        </Layout>
      </Layout>
    </StudentRoute>
  );
};

export default singleCourse;
