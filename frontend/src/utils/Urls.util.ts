const API = import.meta.env.VITE_API_URL;
export const Urls = {
  links: () => `${API}/links`,
  RDLink: (code: string) => `${API}/links/${code}`,
  redirectUrl: (code: string) => `${API}/${code}`,
};
