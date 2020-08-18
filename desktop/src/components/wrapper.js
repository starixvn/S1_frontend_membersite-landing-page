import React, { useState, useEffect } from "react";
import * as ct from "./context";
import { GET_LANG_ID } from "../service/language";
import { GetTranslation } from "../datas/i18n/i18n";

export default ({ children }) => {
	const [language, setLanguage] = useState(GET_LANG_ID());
	const [i18n, seti18n] = useState({});

	useEffect(() => {
		seti18n(GetTranslation(language));
	}, [language, seti18n]);

	return (
		<ct.languageContext.Provider value={{ language, setLanguage }}>
			<ct.i18nContext.Provider value={{ i18n }}>
				{children}
			</ct.i18nContext.Provider>
		</ct.languageContext.Provider>
	);
};
