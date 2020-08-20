import React from "react";

export default props => {
	return (
		<>
			<input
				onChange={props.onChange}
				onBlur={props.onBlur}
				placeholder={props.displayText}
				value={
					props.value === null || props.value === undefined
						? ""
						: props.value
				}
			/>
			{props.tip ? <div className="tip active">{props.tip}</div> : null}
		</>
	);
};
