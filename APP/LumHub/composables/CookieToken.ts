export const isAuthenticated = () => {
  const token = useCookie('token');
  return !!token.value;
};
