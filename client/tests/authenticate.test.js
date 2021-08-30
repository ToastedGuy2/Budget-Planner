const authenticateUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(authApiUrl, {
        headers: {
          Authorization: token,
        },
      });
      const user = response.data.data.user;
      setLoggedInUser(user);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
