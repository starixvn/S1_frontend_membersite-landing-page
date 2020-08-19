import React, { Component, createRef } from "react";

export default class DropdownBox extends Component {
	constructor(props) {
		super(props);
		this.state = { isOpen: false };
		document.addEventListener("click", this.CheckClickOutSide);
		this.wrapper = createRef();
	}
	CheckClickOutSide = e => {
		if (this.wrapper.current && !this.wrapper.current.contains(e.target)) {
			this.setState({ isOpen: false });
		}
	};
	ClickDropdown = e => {
		e.preventDefault();
		this.setState({ isOpen: true });
	};

	SelectItem = (currId, e) => {
		e.stopPropagation();
		this.setState({ isOpen: false });
		this.props.OnSelectItem(currId);
	};

	render() {
		let rows = this.props.options.map(o => {
			return (
				<li
					key={`curr-${o}`}
					className="dropdown-item"
					onClick={this.SelectItem.bind(this, o)}>
					{this.props.i18n[`Currency_${o}`]}
				</li>
			);
		});

		return (
			<div
				className={`dropdown`}
				ref={this.wrapper}
				onClick={this.ClickDropdown}>
				<button className="cybtn">
					{this.props.SelectedItem !== null
						? this.props.i18n[`Currency_${this.props.SelectedItem}`]
						: null}
					<i className="down"></i>
				</button>
				<ul
					className={`dropdown-container${
						this.state.isOpen ? " active" : ""
					}`}>
					{rows}
				</ul>
			</div>
		);
	}
}
