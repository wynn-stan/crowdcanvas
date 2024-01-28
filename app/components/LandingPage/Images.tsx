"use client";

import styled from "styled-components";

export default function Images() {
  return (
    <div className="flex gap-3 sm:gap-6 items-center">
      <div className="flex flex-col gap-3 sm:gap-6 justify-center">
        <MyImage
          width="135px"
          height="89px"
          widthSm="218px"
          heightSm="144px"
          src={"/images/girl-dancing.jpg"}
        />
        <MyImage
          width="134px"
          height="134px"
          widthSm="218px"
          heightSm="217px"
          src={"/images/guy-wearing-vr.jpg"}
        />
        <MyImage
          width={"134px"}
          height={"134px"}
          alt="eating-pizza"
          src={"/images/eating-pizza.jpg"}
          containerClassName="sm:hidden"
        ></MyImage>
      </div>

      <MyImage
        width="157px"
        height="341px"
        widthSm={"252px"}
        heightSm={"487px"}
        alt="girl-smiling"
        src={"/images/girl-smiling.jpg"}
      ></MyImage>

      <div className=" flex-col gap-6 hidden sm:flex justify-center">
        <MyImage
          width={"216px"}
          height={"218px"}
          alt="eating-pizza"
          src={"/images/eating-pizza.jpg"}
        ></MyImage>

        <MyImage
          width={"216px"}
          height={"141px"}
          alt="woman-dancing-grayscale"
          src={"/images/woman-dancing-grayscale.jpg"}
        ></MyImage>
      </div>
    </div>
  );
}

function MyImage({
  src,
  containerClassName,
  imgClassName,
  width,
  widthSm,
  height,
  heightSm,
  alt,
  ...props
}: {
  src: string;
  imgClassName?: string;
  containerClassName?: string;
  width?: string;
  widthSm?: string;
  height?: string;
  heightSm?: string;

  alt?: string;
}) {
  return (
    <div className={`overflow-hidden ${containerClassName}`}>
      <StyledImage
        {...{ width, height, widthSm, heightSm }}
        className={`object-cover object-center rounded-[20px] ${imgClassName}`}
        alt={alt}
        src={src}
        {...props}
      />
    </div>
  );
}

const StyledImage = styled.img<{ width?: string; height?: string; widthSm?: string; heightSm?: string }>`
  @media (min-width: 640px) {
    width: ${({ widthSm }) => widthSm};
    height: ${({ heightSm }) => heightSm};
  }

  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;
