import axios from 'axios';
import socket from '../../socket';
import {
  gotConversations,
  addConversation,
  setNewMessage,
  setSearchedUsers
} from '../conversations';
import { gotUser, setFetchingStatus } from '../user';
import { sendingImgs } from '../isSendingImages';

axios.interceptors.request.use(async function (config) {
  const token = await localStorage.getItem('messenger-token');
  config.headers['x-access-token'] = token;

  return config;
});

// USER THUNK CREATORS

export const fetchUser = () => async (dispatch) => {
  dispatch(setFetchingStatus(true));
  try {
    const { data } = await axios.get('/auth/user');
    dispatch(gotUser(data));
    if (data.id) {
      socket.emit('go-online', data.id);
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const register = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/register', credentials);
    await localStorage.setItem('messenger-token', data.token);
    dispatch(gotUser(data));
    socket.emit('go-online', data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || 'Server Error' }));
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/login', credentials);
    await localStorage.setItem('messenger-token', data.token);
    dispatch(gotUser(data));
    socket.emit('go-online', data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || 'Server Error' }));
  }
};

export const logout = (id) => async (dispatch) => {
  try {
    await axios.delete('/auth/logout');
    await localStorage.removeItem('messenger-token');
    dispatch(gotUser({}));
    socket.emit('logout', id);
  } catch (error) {
    console.error(error);
  }
};

// CONVERSATIONS THUNK CREATORS

export const fetchConversations = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/conversations');
    const sortedData = data.map((convo) => {
      return {
        ...convo,
        messages: convo.messages.sort((message1, message2) =>
          new Date(message1.createAt) < new Date(message2.createAt) ? 1 : -1
        )
      };
    });
    dispatch(gotConversations(sortedData));
  } catch (error) {
    console.error(error);
  }
};

const saveMessage = async (body) => {
  const { data } = await axios.post('/api/messages', body);
  return data;
};

const sendMessage = (data, body) => {
  socket.emit('new-message', {
    message: data.message,
    recipientId: body.recipientId,
    sender: data.sender
  });
};

const uploadImages = async (event) => {
  const imgs = event.target.file.files;
  const formData = new FormData();
  const imgUrlPromises = [];
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    formData.append('file', img);
    formData.append(
      'upload_preset',
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_NAME
    );
    imgUrlPromises.push(
      fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      )
    );
  }
  const results = await Promise.all(imgUrlPromises);
  const data = await Promise.all(results.map((res) => res.json()));
  const urls = data.map((el) => el.url);
  return urls;
};

export const sendingMessage = () => async (dispatch) => {
  socket.emit('sending', true);
  setTimeout(() => {
    socket.emit('sending', false);
  }, 3000);
};

// message format to send: {recipientId, text, conversationId}
// conversationId will be set to null if its a brand new conversation
export const postMessage = (event, body) => async (dispatch) => {
  try {
    if (event.target.file.files.length) {
      dispatch(sendingImgs(true));
      const imageUrls = await uploadImages(event);
      dispatch(sendingImgs(false));
      body.attachments = imageUrls;
    }
    const data = await saveMessage(body);

    if (!body.conversationId) {
      dispatch(addConversation(body.recipientId, data.message));
    } else {
      dispatch(setNewMessage(data.message));
    }

    sendMessage(data, body);
  } catch (error) {
    console.error(error);
  }
};

export const searchUsers = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${searchTerm}`);
    dispatch(setSearchedUsers(data));
  } catch (error) {
    console.error(error);
  }
};
