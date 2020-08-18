import React, { useEffect, useContext } from "react";
import logo from "../styles/img/nova88_logo.png";
import Form from "./join.form";
import config from "../config";
import { getUrlParameter } from "../components/common";
import { languageContext } from "../components/context";
import "../styles/css/reset.css";
import "../styles/css/style.css";

export default () => {
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
				<Form />
			</div>
		</div>
	);
};
