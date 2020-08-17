import React, { useEffect, useContext } from "react";
import logo from "../styles/img/logo.png";
import { PromotionDesc, Promotion } from "./join.promotion";
import Form from "./join.form";
import config from "../config";
import { getUrlParameter } from "../components/common";
import { languageContext } from "../components/context";
// import { api_site_CheckSignIn } from "../service/api/site";

export default () => {
	const { language } = useContext(languageContext);
	// const [showPage, setShowPage] = useState(null);
	// useEffect(() => {
	// 	let mounted = true;
	// 	api_site_CheckSignIn().then(res => {
	// 		if (mounted) {
	// 			if (res.data.errorCode === 0) {
	// 				window.location.href = config.openURL;
	// 				setShowPage(false);
	// 			} else {
	// 				setShowPage(true);
	// 			}
	// 		}
	// 	});

	// 	return () => (mounted = false);
	// }, [setShowPage]);

	useEffect(() => {
		let errorCode = getUrlParameter("errorCode");
		let message = getUrlParameter("message");

		if (message) {
			alert(message);
		}
	}, []);

	return (
		<div className="wallpaper">
			<div className="module">
				<a href={config.openURL}>
					<img src={logo} alt="Nova88" />
				</a>
				<Promotion language={language} />
				<Form />
				<PromotionDesc language={language} />
			</div>
		</div>
	);
};
