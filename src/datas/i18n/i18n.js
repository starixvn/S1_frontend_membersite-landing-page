import en from "./en";
import vn from "./vn";

export const GetTranslation = language => {
	return language === "en" ? en : vn;
};
