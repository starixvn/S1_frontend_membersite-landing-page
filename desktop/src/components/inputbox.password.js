import React from "react";

export default props => {
	return (
		<>
			<input
				placeholder={props.displayText}
				type={props.inputType}
				value={
					props.value === null || props.value === undefined
						? ""
						: props.value
				}
				onBlur={props.onBlur}
				onChange={props.onChange}
			/>
			<i
				className={props.showPsw ? " eye" : " eye-off"}
				onClick={props.showPswHandler}></i>

			{props.tip ? <div className="tip active">{props.tip}</div> : null}
		</>
	);
};
