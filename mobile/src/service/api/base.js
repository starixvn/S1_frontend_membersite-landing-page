import axios from "axios";
import config from "../../config";

const rootURL = config.apiURL;

export const siteRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/Site`
});
