// data => {currency: '', amount: ''}

export const currencyFormatter = (data) => {
  return ((data.amount * 100) / 100).toLocaleString(data.currency, {
    style: 'currency',
    currency: data.currency,
  })
}

export const stripeCurrencyFormatter = (data) => {
  return (data.amount / 100).toLocaleString(data.currency, {
    style: 'currency',
    currency: data.currency,
    // currency: "AUD",
    // currencyDisplay: "code",
  })
}

export const getNumberOfDays = (start, end) => {
  const date1 = new Date(start)
  const date2 = new Date(end)

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime()

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay)

  return diffInDays
}

export const generateCourseDirectLink = (courseSlug, referralCode) => {
  return `localhost:3000/course/${courseSlug}?cref=${referralCode}`
}

export const copyToClipboard = (text) => {
  // Create a temporary textarea element
  const textarea = document.createElement('textarea')
  textarea.value = text
  document.body.appendChild(textarea)

  // Select the content
  textarea.select()

  // Copy the selected content
  document.execCommand('copy')

  // Remove the temporary textarea
  document.body.removeChild(textarea)
}

export const calculateVideoDuration = (file) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'metadata'

    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src)
      const durationInMinutes = (video.duration / 60).toFixed(2)
      resolve(durationInMinutes)
    }

    video.onerror = function () {
      reject('Error loading video file.')
    }

    video.src = URL.createObjectURL(file)
  })
}

export function formatDuration(minutes) {
  // Split the whole number and decimal parts
  const wholeMinutes = Math.floor(minutes)
  const decimalPart = minutes - wholeMinutes

  // Convert the decimal part to seconds
  const seconds = Math.round(decimalPart * 60)

  // Convert them to strings. If seconds is less than 10, prepend with '0'
  const minutesStr = String(wholeMinutes)
  const secondsStr = seconds < 10 ? '0' + String(seconds) : String(seconds)

  return `${minutesStr}:${secondsStr}`
}
