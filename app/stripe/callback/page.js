"use client"
import { useContext, useEffect } from "react"
import { Context } from "../../../context/index"
import UserRoute from "@/components/routes/UserRoutes"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

const StripeCallback = () => {
  const router = useRouter()
  const {
    state: { user },
    dispatch,
  } = useContext(Context)
  useEffect(() => {
    if (user) {
      if (user?.role.includes("Instructor") || user?.role.includes("Pending"))
        router.push("/")
      axios
        .post("/api/get-account-status", {
          _id: user._id,
        })
        .then((res) => {
          //   window.location.href = '/instructor'
          dispatch({
            type: "LOGIN",
            payload: res.data,
          })
          window.localStorage.setItem("user", JSON.stringify(res.data))
          router.push("/instructor")
        })
        .catch((err) => {
          toast.error(`Stripe onboarding failed ${err.response.data}`)
          router.push("/user/become-instructor")
        })
    }
  }, [user])
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <span className="loading loading-spinner w-32"></span>
    </div>
  )
}

export default StripeCallback
