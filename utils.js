/**
 * Creates a URL for a page based on the page name
 * @param {string} pageName - The name of the page
 * @returns {string} The URL path for the page
 */
export function createPageUrl(pageName) {
  const pageMap = {
    'Home': '/home',
    'Features': '/features',
    'HowItWorks': '/how-it-works',
    'How It Works': '/how-it-works',
    'About': '/about',
    'Contact': '/contact'
  };
  
  return pageMap[pageName] || '/home';
}
