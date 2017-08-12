const constants = require('./constants');
const ROLE_MEMBER = constants.ROLE_MEMBER;
const ROLE_CLIENT = constants.ROLE_CLIENT;
const ROLE_OWNER = constants.ROLE_OWNER;
const ROLE_ADMIN = constants.ROLE_ADMIN;

// Set user info from request
exports.setUserInfo = function setUserInfo(request) {
  const getUserInfo = {
    _id: request._id,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    email: request.email,
    role: request.role
  };

  return getUserInfo;
};

exports.getRole = function getRole(checkRole) {
  let role;

  switch (checkRole) {
    case ROLE_ADMIN: role = 4; break;
    case ROLE_OWNER: role = 3; break;
    case ROLE_CLIENT: role = 2; break;
    case ROLE_MEMBER: role = 1; break;
    default: role = 1;
  }

  return role;
};
