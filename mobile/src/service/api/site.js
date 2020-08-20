import { siteRequest } from "./base";

export const api_site_ExistsUserName = ({ UserName }) =>
	siteRequest.post(`/ExistsUserName`, { UserName: UserName });

export const api_site_ExistsEmail = ({ Email }) =>
	siteRequest.post(`/ExistsEmail`, { Email: Email });

export const api_site_GetSiteCurrencyList = () =>
	siteRequest.post(`/GetSiteCurrencyList`);

export const api_site_ExistsPhoneNo = (AreaCode, PhoneNo) =>
	siteRequest.post(`/ExistsPhoneNo`, {
		AreaCode: AreaCode,
		PhoneNo: PhoneNo
	});
// export const api_site_CheckSignIn = () => siteRequest.post(`/CheckSignIn/`);
