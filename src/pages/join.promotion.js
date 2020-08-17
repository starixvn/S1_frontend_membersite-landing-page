import React from "react";

export const Promotion = ({ language }) => {
	return (
		<div className="title">
			<div className="yellow">
				{language === "vn" ? (
					<>
						THƯỞNG NGAY <span className="blue">125%</span>
						<br /> cho lần nạp đầu
					</>
				) : (
					<>
						<span className="blue">125%</span>
						<br />
						first deposit offer
					</>
				)}
			</div>
		</div>
	);
};

export const PromotionDesc = ({ language }) => {
	return (
		<div className="smallTitle sp">
			<div className="yellow">
				{language === "vn" ? (
					<>
						TẶNG NGAY <span className="blue">300K VNĐ</span> KHI LẬP
						TÀI KHOẢN
					</>
				) : (
					<>
						OPEN ACCOUNT TODAY <br /> GET{" "}
						<span className="blue">VND 300K</span> RIGHT AWAY
					</>
				)}
			</div>
		</div>
	);
};
