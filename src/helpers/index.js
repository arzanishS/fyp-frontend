import { useLocation } from 'react-router-dom'
import { notification } from 'antd'

export const useQueryParams = () => {
  return new URLSearchParams(useLocation().search)
}

export const openNotification = (message) => {
  notification.open({
    message: message,
  });
};

export const allowedImageTypes = ['image/png', 'image/jpeg', 'image/gif']

export const imageTypeAllowed = (file) => {
  return allowedImageTypes.includes(file.type.toLowerCase())
}

export const allowedApplicationTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

export const applicationTypeAllowed = (file) => {
  return allowedApplicationTypes.includes(file.type.toLowerCase())
}

export const beforeUpload = (file) => {

  const fileType = file.type
  const type = fileType.substring(0, fileType.lastIndexOf('/'));

  let fileSize = true
  let allowed = true

  if ( type === 'video') {
    // check file size
    fileSize = (parseFloat(`${file.size / 1024 / 1024}`) <= 10)
    // show warning alert
    if (!fileSize) {
      openNotification('File size Increased')
    }
  } else if (type === 'audio') {

    fileSize = (parseFloat(`${file.size / 1024 / 1024}`) <= 2)
    // show warning alert
    if (!fileSize) {
      openNotification('File size Increased')
    }
  } else if( type === 'image') {
    fileSize = (parseFloat(`${file.size / 1024 / 1024}`) <= 3)
    // show warning alert
    if (!fileSize) {
      openNotification('File size Increased')
    }
    allowed = imageTypeAllowed(file)
    // show warning alert
    if (!allowed) {
      openNotification('Invalid File Type')
    }
  } else if( type === 'application') {
    fileSize = (parseFloat(`${file.size / 1024 / 1024}`) <= 5)
    // show warning alert
    if (!fileSize) {
      openNotification('File size Increased')
    }
    allowed = applicationTypeAllowed(file)
    // show warning alert
    if (!allowed) {
      openNotification('Invalid File Type')
    }
  }
  
  return (allowed && fileSize)
}
