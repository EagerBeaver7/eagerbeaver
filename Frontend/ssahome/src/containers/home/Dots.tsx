import React from "react";


type PDot = {
	index: number;
	currentIndex: number;
	onClick: (index: number) => void;
};
const Dot: React.FC<PDot> = ({ index, currentIndex, onClick }) => {
	const selected = index === currentIndex;
	return (
		<div
			style={{
				width: 11,
				height: 11,
				border: "3px solid" + (selected ? " black" : " rgba(0, 0, 0, 0)"),
                //backgroundColor: selected ? " black" : " rgba(0, 0, 0, 0)",
				borderRadius: 9999,
				margin: "10px 0",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
                //position: "relative", // position 속성 추가
                //zIndex: selected ? 1 : 0, // 선택된 Dot 컴포넌트의 경우 z-index를 1로 설정
			}}
			onClick={() => onClick(index)}
		>
			<div
				style={{
					position: "relative",
					width: 11,
					height: 11,
					borderRadius: 9999,
					backgroundColor: "#666666",
					cursor: "pointer",
				}}
			></div>
		</div>
	);
};

type TDots = {
	limit: number;
	currentIndex: number;
	onDotClick: (index: number) => void;
};

export const Dots: React.FC<TDots> = ({ limit, currentIndex, onDotClick }) => {
    // 연한 회색 박스의 높이 계산
    const boxHeight = 15 * limit + 20 * (limit - 1); // 각 Dot의 높이(15px)와 간격(20px)을 고려하여 계산
  
    return (
      <div style={{ position: "fixed", top: "50%", right: 100, transform: "translateY(-50%)", height: "100%" }}>
        {/* 연한 회색 박스 */}
        <div
          style={{
            position: "fixed",
            top: "50%",
            right: '100%',
            transform: "translateY(-50%)", // 세로 중앙 정렬을 위한 스타일
            height: boxHeight, // 연한 회색 박스의 높이 설정
            width: 30, // 연한 회색 박스의 너비 설정
            backgroundColor: "rgba(192, 192, 192, 0.5)", // 연한 회색 설정
            borderRadius: "10px", // 모서리를 둥글게 만듦
          }}
        >
          {/* Dot 컴포넌트들 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {Array(limit)
              .fill("")
              .map((_, index) => (
                <Dot
                  key={index}
                  index={index}
                  currentIndex={currentIndex}
                  onClick={onDotClick}
                ></Dot>
              ))}
          </div>
        </div>
      </div>
    );
  };