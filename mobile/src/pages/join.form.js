import React, { useContext, useState, useEffect, useRef } from "react";
import { languageContext, i18nContext } from "../components/context";
import {
	api_site_ExistsUserName,
	api_site_ExistsEmail,
	api_site_GetSiteCurrencyList,
	api_site_ExistsPhoneNo
} from "../service/api/site";
import TandC from "../service/t_and_c";
import Inputbox from "../components/inputbox";
import InputboxPsw from "../components/inputbox.password";
import Checkbox from "../components/checkbox";
import enFlag from "../styles/img/en.png";
import csFlag from "../styles/img/cs.png";
import thFlag from "../styles/img/th.png";
import idFlag from "../styles/img/id.png";
import config from "../config";
import DropdownBox from "../components/dropdown";
import AreaCode from "../components/areaCode";

const initValue = {
	username: "",
	password: "",
	email: "",
	checkbox: false,
	phoneNo: "",
	realname: ""
};

const initTip = {
	username: "",
	password: "",
	email: "",
	checkbox: "",
	phoneNo: "",
	realname: ""
};

const defCountry = {
	2: "MY",
	4: "TH",
	13: "CS",
	15: "ID",
	51: "VN"
};

export default () => {
	const { language, setLanguage } = useContext(languageContext);
	const { i18n } = useContext(i18nContext);
	const [userValue, setUserValue] = useState(initValue);
	const [tip, setTip] = useState(initTip);
	const [showPsw, setShowPsw] = useState(false);
	const isMountedRef = useRef(null);
	const xxxRef = useRef(null);
	const [siteCurrList, setSiteCurrList] = useState([]);
	const [currency, setCurrency] = useState(null);

	useEffect(() => {
		isMountedRef.current = true;
		document.activeElement.blur();
		api_site_GetSiteCurrencyList().then(res => {
			if (isMountedRef.current && res.data.errorCode === 0) {
				setSiteCurrList(res.data.data);
				setCurrency(
					res.data.data && res.data.data.length > 0
						? res.data.data[0]
						: null
				);
			}
		});
		return () => (isMountedRef.current = false);
	}, []);

	const changeLang = lan => {
		setLanguage(lan);
	};

	const showPswHandler = () => {
		setShowPsw(!showPsw);
	};

	const EditField = (col, e) => {
		let val = e.target.value;
		var regExp = new RegExp("^\\d+$");
		if (
			(col === "phoneNo" && (val === "" || regExp.test(val))) ||
			col !== "phoneNo"
		) {
			setUserValue(prev => ({
				...prev,
				[col]: val
			}));
		}
	};

	const checkValue = (col, e) => {
		let val = e.target.value;
		let msg = "";

		if (col === "username") {
			let result = usernameCheck(val);
			msg = result.msg;
		} else if (col === "password") {
			let result = passwordCheck(val);
			msg = result.msg;
		} else if (col === "email") {
			let result = emailCheck(val);
			msg = result.msg;
		} else if (col === "phoneNo") {
			let result = phoneCheck(val);
			msg = result.msg;
		}

		if (tip[col] !== i18n[msg]) {
			setTip(prev => {
				return { ...prev, [col]: i18n[msg] };
			});
		}
	};

	const usernameCheck = val => {
		let checked = false;
		let msg = "";

		if (val === "") {
			checked = false;
			msg = "msg_UsernameReq";
		} else if (val !== "") {
			if (val.length < 6 || val.length > 18) {
				checked = false;
				msg = "msg_UsernameLength";
			} else {
				checked = true;
			}
		}

		if (checked === true) {
			api_site_ExistsUserName({ UserName: val }).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							if (res.data.data === true) {
								setTip(prev => {
									return {
										...prev,
										username:
											i18n["msg_UsernameNotAvailable"]
									};
								});
							} else {
								setTip(prev => {
									return { ...prev, username: "" };
								});
							}
						} else {
							setTip(prev => {
								return {
									...prev,
									username: res.data.message
								};
							});
						}
					}
				},
				err => {
					if (isMountedRef.current) {
						alert("API Server Error.");
					}
				}
			);
		}

		return { checked, msg };
	};

	const passwordCheck = val => {
		let checked = false;
		let msg = "";

		const regx = /^[a-zA-Z0-9@$*!%#?&]*$/;
		if (val === "") {
			checked = false;
			// msg = "msg_PasswordReq";
			msg = "msg_PasswordLength";
		} else if (val != null) {
			if (val.length < 6 || val.length > 18) {
				checked = false;
				msg = "msg_PasswordLength";
			} else if (!regx.test(val)) {
				checked = false;
				msg = "msg_PasswordVaildate";
			} else {
				checked = true;
			}
		}
		return { checked, msg };
	};

	const emailCheck = val => {
		let checked = false;
		let msg = "";
		const regx = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

		if (val === "") {
			checked = false;
			msg = "msg_MailWrongFormat";
		} else if (val !== "") {
			if (!regx.test(val)) {
				checked = false;
				msg = "msg_MailWrongFormat";
			} else {
				checked = true;
			}
		}

		if (checked === true) {
			api_site_ExistsEmail({ Email: val }).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							if (res.data.data === true) {
								setTip(prev => {
									return {
										...prev,
										email: i18n["msg_MailExisted"]
									};
								});
							} else {
								setTip(prev => {
									return { ...prev, email: "" };
								});
							}
						} else {
							setTip(prev => {
								return { ...prev, email: res.data.message };
							});
						}
					}
				},
				err => {
					if (isMountedRef.current) {
						alert("API Server Error.");
					}
				}
			);
		}

		return { checked, msg };
	};

	const checkboxHandler = () => {
		let checked = !userValue.checkbox;
		setUserValue(prev => {
			return { ...prev, checkbox: checked };
		});

		if (checked) {
			setTip(prev => ({ ...prev, checkbox: "" }));
		}
	};

	const phoneCheck = value => {
		let checked = true;
		let msg = "";
		if (!value) {
			msg = "msg_EnterPhoneNumber";
			checked = false;
		}

		let areaCode = AreaCode[defCountry[currency]]?.AreaCode;
		if (areaCode && checked) {
			api_site_ExistsPhoneNo(areaCode, userValue.phoneNo).then(res => {
				if (res.data.errorCode !== 0) {
					setTip(prev => {
						return {
							...prev,
							phoneNo: `${i18n.lbl_Phone} ${i18n.msg_HasExist}`
						};
					});
				}
			});
		}

		return { checked, msg };
	};

	const realNameCheck = value => {
		let checked = true;
		let msg = "";
		if (!value) {
			msg = "msg_EnterRealName";
			checked = false;
		}

		return { checked, msg };
	};

	const clickSubmit = e => {
		e.preventDefault();
		let _usernameCheck = usernameCheck(userValue.username);
		let _passwordCheck = passwordCheck(userValue.password);
		let _emailCheck = emailCheck(userValue.email);
		let _checkboxCheck = userValue.checkbox;
		let _phoneNoCheck = phoneCheck(userValue.phoneNo);
		let _realNameCheck = realNameCheck(userValue.realname);

		let checked =
			_usernameCheck.checked &&
			_passwordCheck.checked &&
			_emailCheck.checked &&
			_phoneNoCheck &&
			_realNameCheck &&
			_checkboxCheck;

		if (!checked) {
			let checkboxMsg = "";
			if (!_checkboxCheck) {
				checkboxMsg = "lbl_Check18TCTooltip";
			}
			setTip(prev => ({
				username: i18n[_usernameCheck.msg],
				password: i18n[_passwordCheck.msg],
				email: i18n[_emailCheck.msg],
				checkbox: i18n[checkboxMsg],
				phoneNo: i18n[_phoneNoCheck.msg],
				realname: i18n[_realNameCheck.msg]
			}));
		} else if (
			Object.values(tip).filter(v => !v).length ===
			Object.keys(tip).length
		) {
			xxxRef.current.submit();
		}
	};

	const SelectCurrency = currencyId => {
		setCurrency(currencyId);
	};

	return (
		<>
			<form className="info" onSubmit={clickSubmit}>
				<div className="smallTitle language">
					{/* <a onClick={changeLang.bind(this, "en")}>
						<img src={enFlag} alt="en" />
					</a>
					<a onClick={changeLang.bind(this, "cs")}>
						<img src={csFlag} alt="cs" />
					</a>
					<a onClick={changeLang.bind(this, "th")}>
						<img src={thFlag} alt="th" />
					</a>
					<a onClick={changeLang.bind(this, "id")}>
						<img src={idFlag} alt="id" />
					</a> */}
				</div>
				<Inputbox
					displayText={i18n["lbl_RealName"]}
					value={userValue.realname}
					tip={tip.realname}
					onChange={EditField.bind(null, "realname")}
					onBlur={checkValue.bind(null, "realname")}
				/>
				<Inputbox
					displayText={i18n["lbl_Username"]}
					value={userValue.username}
					tip={tip.username}
					onChange={EditField.bind(null, "username")}
					onBlur={checkValue.bind(null, "username")}
				/>
				<InputboxPsw
					displayText={i18n["lbl_Password"]}
					showPsw={showPsw}
					inputType={`${!showPsw ? "password" : "text"}`}
					value={userValue.password}
					tip={tip.password}
					onChange={EditField.bind(null, "password")}
					onBlur={checkValue.bind(null, "password")}
					showPswHandler={showPswHandler}
				/>
				<Inputbox
					displayText="Email"
					value={userValue.email}
					onChange={EditField.bind(null, "email")}
					onBlur={checkValue.bind(null, "email")}
					tip={tip.email}
				/>
				{/* <DropdownBox
					options={siteCurrList}
					i18n={i18n}
					OnSelectItem={SelectCurrency}
					SelectedItem={currency}
				/> */}
				{/* <div className="tip">{i18n.lbl_PreferredCurrencyToolTip}</div> */}
				<div>
					<input
						className="CountryCode"
						defaultValue={
							currency
								? AreaCode[defCountry[currency]]?.AreaCode
								: ""
						}
						readOnly
					/>
					<input
						placeholder={i18n.lbl_Phone}
						type="tel"
						value={userValue.phoneNo}
						onChange={EditField.bind(this, "phoneNo")}
						onBlur={checkValue.bind(null, "phoneNo")}
					/>
				</div>
				<div className="tip">{tip.phoneNo}</div>
				<Checkbox
					checked={userValue.checkbox}
					onChange={checkboxHandler}
					id="c1">
					{i18n["lbl_Check18TC1"]}{" "}
					<a target="_blank" href={TandC(language).terms}>
						{i18n["lbl_TermsConditions"]}
					</a>{" "}
					{i18n["lbl_Check18TC2"]}{" "}
					<a target="_blank" href={TandC(language).rule}>
						{i18n["lbl_RuleRegulations"]}
					</a>{" "}
					{i18n["lbl_Check18TC3"]} Nova88. {i18n["lbl_Check18TC4"]}
				</Checkbox>
				{tip.checkbox !== "" ? (
					<div className="tip active">{tip.checkbox}</div>
				) : null}
				<button className="" type="submit" onClick={clickSubmit}>
					{i18n["lbl_JoinNow"]}
				</button>
			</form>
			<form
				ref={xxxRef}
				action={`${config.openURL}/${language}/Extra/Signup`}
				method="post">
				<input
					type="hidden"
					name="UserName"
					value={userValue.username}
					onChange={() => {}}
				/>
				<input
					type="hidden"
					name="Userpwd"
					value={userValue.password}
					onChange={() => {}}
				/>
				<input
					type="hidden"
					name="Email"
					value={userValue.email}
					onChange={() => {}}
				/>
				<input
					type="hidden"
					name="CurrencyId"
					value={2}
					onChange={() => {}}
				/>
				<input
					type="hidden"
					name="UserLang"
					value={language}
					onChange={() => {}}
				/>
				<input
					type="hidden"
					name="AreaCode"
					value={AreaCode[defCountry[currency]]?.AreaCode ?? ""}
					onChange={() => {}}
				/>
				<input
					type="hidden"
					name="RealName"
					value={userValue.realname}
					onChange={() => {}}
				/>
				<input
					type="hidden"
					name="PhoneNo"
					value={userValue.phoneNo}
					onChange={() => {}}
				/>
				<input
					type="hidden"
					name="SignupUrl"
					value={window.location.host}
					onChange={() => {}}
				/>
			</form>
		</>
	);
};
