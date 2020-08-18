import { siteRequest } from "./base";

export const api_site_ExistsUserName = ({ UserName }) =>
	siteRequest.post(`/ExistsUserName`, { UserName: UserName });

export const api_site_ExistsEmail = ({ Email }) =>
	siteRequest.post(`/ExistsEmail`, { Email: Email });

// export const api_site_CheckSignIn = () => siteRequest.post(`/CheckSignIn/`);
