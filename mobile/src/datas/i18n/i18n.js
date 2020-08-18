import en from "./en";
// import vn from "./vn";
import cs from "./cs";
import th from "./th";
import id from "./id";

export const GetTranslation = language => {
	// return language === "en" ? en : vn;
	switch (language) {
		case "en":
			return en
		case "cs":
			return cs
		case "th":
			return th	
		case "id":
			return id	
		default:
			break;
	}
};
