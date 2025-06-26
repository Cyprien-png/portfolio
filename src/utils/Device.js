export const getWidth = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }
  return 0; // Return 0 if not in a browser environment
}