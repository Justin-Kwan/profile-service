

const USER_DELETE_SUCCESS: string = JSON.stringify({
  message: "user successfully deleted",
  status: 202
});

const USER_ALREADY_EXISTS_ERROR: string = JSON.stringify({
  message: "user already exists",
  status: 404
});

const USER_ID_INVALID_ERROR: string = JSON.stringify({
  message: "user id is invalid",
  status: 404
});

export {
  USER_EXISTS_ERROR,
  USER_ID_INVALID_ERROR
};
