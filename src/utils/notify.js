import { notification } from 'antd';

const notify = (type, message, description) => {
  notification[type]({
    message: message || 'Notification Title',
    description: description || 'This is the content of the notification.',
  });
};

export default notify;
