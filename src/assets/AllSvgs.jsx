import React from "react";

const AllSvgs = ({ type }) => {
  switch (type) {
    case "searchIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M11.8163 10.6914H11.2238L11.0138 10.4889C11.7488 9.63391 12.1913 8.52391 12.1913 7.31641C12.1913 4.62391 10.0088 2.44141 7.31628 2.44141C4.62378 2.44141 2.44128 4.62391 2.44128 7.31641C2.44128 10.0089 4.62378 12.1914 7.31628 12.1914C8.52378 12.1914 9.63378 11.7489 10.4888 11.0139L10.6913 11.2239V11.8164L14.4413 15.5589L15.5588 14.4414L11.8163 10.6914ZM7.31628 10.6914C5.44878 10.6914 3.94128 9.18391 3.94128 7.31641C3.94128 5.44891 5.44878 3.94141 7.31628 3.94141C9.18378 3.94141 10.6913 5.44891 10.6913 7.31641C10.6913 9.18391 9.18378 10.6914 7.31628 10.6914Z"
            fill="#B0B0B0"
          />
        </svg>
      );
    case "trophyIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M12.6667 3.33333H11.3333V2H4.66667V3.33333H3.33333C2.6 3.33333 2 3.93333 2 4.66667V5.33333C2 7.03333 3.28 8.42 4.92667 8.62667C5.34667 9.62667 6.24667 10.38 7.33333 10.6V12.6667H4.66667V14H11.3333V12.6667H8.66667V10.6C9.75333 10.38 10.6533 9.62667 11.0733 8.62667C12.72 8.42 14 7.03333 14 5.33333V4.66667C14 3.93333 13.4 3.33333 12.6667 3.33333ZM3.33333 5.33333V4.66667H4.66667V7.21333C3.89333 6.93333 3.33333 6.2 3.33333 5.33333ZM8 9.33333C6.9 9.33333 6 8.43333 6 7.33333V3.33333H10V7.33333C10 8.43333 9.1 9.33333 8 9.33333ZM12.6667 5.33333C12.6667 6.2 12.1067 6.93333 11.3333 7.21333V4.66667H12.6667V5.33333Z"
            fill="#696969"
          />
        </svg>
      );
    case "rightArrowIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.67461 2.95339C5.88428 2.77368 6.19993 2.79796 6.37964 3.00762L10.3796 7.67429C10.5401 7.86153 10.5401 8.13783 10.3796 8.32508L6.37964 12.9917C6.19993 13.2014 5.88428 13.2257 5.67461 13.046C5.46495 12.8663 5.44067 12.5506 5.62038 12.341L9.34147 7.99968L5.62038 3.65841C5.44067 3.44875 5.46495 3.1331 5.67461 2.95339Z"
            fill="#181818"
          />
        </svg>
      );
    case "leftArrowIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M6.52373 9.16707H16.6667V10.8337H6.52373L10.9937 15.3037L9.81521 16.4822L3.33337 10.0004L9.81521 3.51855L10.9937 4.69706L6.52373 9.16707Z"
            fill="#181818"
          />
        </svg>
      );
    case "leftCurveIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M6.13257 4.25C4.80757 4.25 3.60757 4.745 2.68257 5.55L0.882568 3.75V8.25H5.38257L3.57257 6.44C4.26757 5.86 5.15257 5.5 6.13257 5.5C7.90257 5.5 9.40757 6.655 9.93257 8.25L11.1176 7.86C10.4226 5.765 8.45757 4.25 6.13257 4.25Z"
            fill="#181818"
          />
        </svg>
      );
    case "rightCurveIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M9.31501 5.55C8.39001 4.745 7.19001 4.25 5.86501 4.25C3.54001 4.25 1.57501 5.765 0.88501 7.86L2.06501 8.25C2.59001 6.655 4.09001 5.5 5.86501 5.5C6.84001 5.5 7.73001 5.86 8.42501 6.44L6.61501 8.25H11.115V3.75L9.31501 5.55Z"
            fill="#181818"
          />
        </svg>
      );
    case "crownIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M10.8045 6.78078L10.9191 5.56316C11.0091 4.60685 11.0541 4.12869 10.8905 3.93104C10.802 3.82411 10.6817 3.7586 10.553 3.7473C10.3152 3.72641 10.0165 4.06645 9.41906 4.74653C9.11012 5.09825 8.95564 5.2741 8.78331 5.30133C8.68783 5.31642 8.59054 5.30091 8.50237 5.25654C8.34324 5.17646 8.23715 4.95906 8.02496 4.52426L6.90653 2.23243C6.50558 1.41081 6.3051 1 6 1C5.6949 1 5.49442 1.41081 5.09347 2.23243L3.97504 4.52426C3.76285 4.95906 3.65676 5.17646 3.49763 5.25654C3.40946 5.30091 3.31217 5.31642 3.21669 5.30133C3.04436 5.2741 2.88988 5.09825 2.58093 4.74653C1.98354 4.06645 1.68484 3.72641 1.44699 3.7473C1.31833 3.7586 1.19799 3.82411 1.10949 3.93104C0.945898 4.12869 0.9909 4.60685 1.0809 5.56316L1.1955 6.78078C1.38433 8.78708 1.47874 9.79023 2.07005 10.3951C2.66136 11 3.54758 11 5.32004 11H6.67996C8.45242 11 9.33864 11 9.92995 10.3951C10.5213 9.79023 10.6157 8.78708 10.8045 6.78078Z"
            fill="#181818"
          />
        </svg>
      );
    case "downLoadIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M9 7.5V9H3V7.5H2V9C2 9.55 2.45 10 3 10H9C9.55 10 10 9.55 10 9V7.5H9ZM8.5 5.5L7.795 4.795L6.5 6.085V2H5.5V6.085L4.205 4.795L3.5 5.5L6 8L8.5 5.5Z"
            fill="#181818"
          />
        </svg>
      );
    case "textIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M1.66663 3V5H4.99996V13H6.99996V5H10.3333V3H1.66663ZM14.3333 6.33333H8.33329V8.33333H10.3333V13H12.3333V8.33333H14.3333V6.33333Z"
            fill="#696969"
          />
        </svg>
      );
    case "mediaIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M1.33333 3.99967H0V7.33301H0.00666667L0 13.333C0 14.0663 0.6 14.6663 1.33333 14.6663H13.3333V13.333H1.33333V3.99967ZM14.6667 2.66634H9.33333L8 1.33301H4C3.26667 1.33301 2.67333 1.93301 2.67333 2.66634L2.66667 10.6663C2.66667 11.3997 3.26667 11.9997 4 11.9997H14.6667C15.4 11.9997 16 11.3997 16 10.6663V3.99967C16 3.26634 15.4 2.66634 14.6667 2.66634ZM4.66667 9.99967L7.66667 5.99967L10 9.00634L11.6667 6.99967L14 9.99967H4.66667Z"
            fill="#696969"
          />
        </svg>
      );
    case "elementsIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M3.55556 8.88867C1.59714 8.88867 0 10.4858 0 12.4442C0 14.4026 1.59714 15.9998 3.55556 15.9998C5.51397 15.9998 7.11111 14.4026 7.11111 12.4442C7.11111 10.4858 5.51397 8.88867 3.55556 8.88867Z"
            fill="#696969"
          />
          <path
            d="M9.33336 8.88867C9.21549 8.88868 9.10245 8.93551 9.0191 9.01886C8.93576 9.10221 8.88893 9.21525 8.88892 9.33312V15.5553C8.88893 15.6732 8.93576 15.7862 9.0191 15.8696C9.10245 15.9529 9.21549 15.9998 9.33336 15.9998H15.5556C15.6735 15.9998 15.7865 15.9529 15.8698 15.8696C15.9532 15.7862 16 15.6732 16 15.5553V9.33312C16 9.21525 15.9532 9.10221 15.8698 9.01886C15.7865 8.93551 15.6735 8.88868 15.5556 8.88867H9.33336Z"
            fill="#696969"
          />
          <path
            d="M7.99997 0C7.92558 0.000184359 7.85243 0.0190362 7.78721 0.054828C7.722 0.0906198 7.66681 0.142207 7.62671 0.204861L3.62671 6.42708C3.58379 6.49417 3.55968 6.57156 3.55691 6.65115C3.55414 6.73075 3.5728 6.80963 3.61095 6.87954C3.6491 6.94945 3.70533 7.00783 3.77377 7.04856C3.84221 7.0893 3.92033 7.1109 3.99997 7.11111H12C12.0796 7.1109 12.1577 7.0893 12.2262 7.04856C12.2946 7.00783 12.3508 6.94945 12.389 6.87954C12.4271 6.80963 12.4458 6.73075 12.443 6.65115C12.4403 6.57156 12.4162 6.49417 12.3732 6.42708L8.37324 0.204861C8.33313 0.142207 8.27794 0.0906198 8.21273 0.054828C8.14752 0.0190362 8.07436 0.000184359 7.99997 0Z"
            fill="#696969"
          />
        </svg>
      );
    case "colorIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8 2C4.68667 2 2 4.68667 2 8C2 11.3133 4.68667 14 8 14C8.55333 14 9 13.5533 9 13C9 12.74 8.9 12.5067 8.74 12.3267C8.58667 12.1533 8.48667 11.92 8.48667 11.6667C8.48667 11.1133 8.93333 10.6667 9.48667 10.6667H10.6667C12.5067 10.6667 14 9.17333 14 7.33333C14 4.38667 11.3133 2 8 2ZM4.33333 8C3.78 8 3.33333 7.55333 3.33333 7C3.33333 6.44667 3.78 6 4.33333 6C4.88667 6 5.33333 6.44667 5.33333 7C5.33333 7.55333 4.88667 8 4.33333 8ZM6.33333 5.33333C5.78 5.33333 5.33333 4.88667 5.33333 4.33333C5.33333 3.78 5.78 3.33333 6.33333 3.33333C6.88667 3.33333 7.33333 3.78 7.33333 4.33333C7.33333 4.88667 6.88667 5.33333 6.33333 5.33333ZM9.66667 5.33333C9.11333 5.33333 8.66667 4.88667 8.66667 4.33333C8.66667 3.78 9.11333 3.33333 9.66667 3.33333C10.22 3.33333 10.6667 3.78 10.6667 4.33333C10.6667 4.88667 10.22 5.33333 9.66667 5.33333ZM11.6667 8C11.1133 8 10.6667 7.55333 10.6667 7C10.6667 6.44667 11.1133 6 11.6667 6C12.22 6 12.6667 6.44667 12.6667 7C12.6667 7.55333 12.22 8 11.6667 8Z"
            fill="#696969"
          />
        </svg>
      );
    case "copyIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M8.25 0.5H2.25C1.7 0.5 1.25 0.95 1.25 1.5V8.5H2.25V1.5H8.25V0.5ZM9.75 2.5H4.25C3.7 2.5 3.25 2.95 3.25 3.5V10.5C3.25 11.05 3.7 11.5 4.25 11.5H9.75C10.3 11.5 10.75 11.05 10.75 10.5V3.5C10.75 2.95 10.3 2.5 9.75 2.5ZM9.75 10.5H4.25V3.5H9.75V10.5Z"
            fill="#181818"
          />
        </svg>
      );
    case "boldIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M10.1501 7.85967C10.7967 7.41301 11.2501 6.67967 11.2501 5.99967C11.2501 4.49301 10.0834 3.33301 8.58341 3.33301H4.41675V12.6663H9.11008C10.5034 12.6663 11.5834 11.533 11.5834 10.1397C11.5834 9.12634 11.0101 8.25967 10.1501 7.85967ZM6.41675 4.99967H8.41675C8.97008 4.99967 9.41675 5.44634 9.41675 5.99967C9.41675 6.55301 8.97008 6.99967 8.41675 6.99967H6.41675V4.99967ZM8.75008 10.9997H6.41675V8.99967H8.75008C9.30341 8.99967 9.75008 9.44634 9.75008 9.99967C9.75008 10.553 9.30341 10.9997 8.75008 10.9997Z"
            fill="#2C2C2C"
          />
        </svg>
      );
    case "italicIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M6.66667 3.33301V5.33301H8.14L5.86 10.6663H4V12.6663H9.33333V10.6663H7.86L10.14 5.33301H12V3.33301H6.66667Z"
            fill="#2C2C2C"
          />
        </svg>
      );
    case "leftAlignmentIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M10 10H2V11.3333H10V10ZM10 4.66667H2V6H10V4.66667ZM2 8.66667H14V7.33333H2V8.66667ZM2 14H14V12.6667H2V14ZM2 2V3.33333H14V2H2Z"
            fill="#2C2C2C"
          />
        </svg>
      );
    case "centerAlignmentIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M4.66667 10V11.3333H11.3333V10H4.66667ZM2 14H14V12.6667H2V14ZM2 8.66667H14V7.33333H2V8.66667ZM4.66667 4.66667V6H11.3333V4.66667H4.66667ZM2 2V3.33333H14V2H2Z"
            fill="#2C2C2C"
          />
        </svg>
      );
    case "rightAlignmentIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M2 14H14V12.6667H2V14ZM6 11.3333H14V10H6V11.3333ZM2 8.66667H14V7.33333H2V8.66667ZM6 6H14V4.66667H6V6ZM2 2V3.33333H14V2H2Z"
            fill="#2C2C2C"
          />
        </svg>
      );
    case "uploadIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="40"
          viewBox="0 0 41 40"
          fill="none"
        >
          <path
            d="M26.6783 8.82147L21.6783 3.82147C21.3657 3.50902 20.9419 3.3335 20.4999 3.3335C20.058 3.3335 19.6342 3.50902 19.3216 3.82147L14.3216 8.82147C14.018 9.13581 13.85 9.55682 13.8538 9.99381C13.8576 10.4308 14.0329 10.8488 14.3419 11.1578C14.6509 11.4669 15.0689 11.6421 15.5059 11.6459C15.9429 11.6497 16.3639 11.4817 16.6783 11.1781L18.8333 9.02314V28.3331C18.8333 28.7752 19.0089 29.1991 19.3214 29.5117C19.634 29.8242 20.0579 29.9998 20.4999 29.9998C20.942 29.9998 21.3659 29.8242 21.6785 29.5117C21.991 29.1991 22.1666 28.7752 22.1666 28.3331V9.02314L24.3216 11.1781C24.6359 11.4817 25.057 11.6497 25.4939 11.6459C25.9309 11.6421 26.349 11.4669 26.658 11.1578C26.967 10.8488 27.1423 10.4308 27.1461 9.99381C27.1499 9.55682 26.9819 9.13581 26.6783 8.82147Z"
            fill="#2C2C2C"
          />
          <path
            d="M30.5 15H22.1667V28.3333C22.1667 28.7754 21.9911 29.1993 21.6785 29.5118C21.3659 29.8244 20.942 30 20.5 30C20.058 30 19.634 29.8244 19.3215 29.5118C19.0089 29.1993 18.8333 28.7754 18.8333 28.3333V15H10.5C9.17432 15.0013 7.90332 15.5285 6.96593 16.4659C6.02853 17.4033 5.50132 18.6743 5.5 20V31.6667C5.50132 32.9923 6.02853 34.2633 6.96593 35.2007C7.90332 36.1381 9.17432 36.6653 10.5 36.6667H30.5C31.8257 36.6653 33.0967 36.1381 34.0341 35.2007C34.9715 34.2633 35.4987 32.9923 35.5 31.6667V20C35.4987 18.6743 34.9715 17.4033 34.0341 16.4659C33.0967 15.5285 31.8257 15.0013 30.5 15Z"
            fill="#696969"
          />
        </svg>
      );
    case "squareIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="37"
          height="36"
          viewBox="0 0 37 36"
          fill="none"
        >
          <path
            d="M4.66663 4.5V31.5H31.6666V4.5H4.66663ZM28.6666 28.5H7.66663V7.5H28.6666V28.5Z"
            fill="#696969"
          />
        </svg>
      );
    case "circleIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="37"
          height="36"
          viewBox="0 0 37 36"
          fill="none"
        >
          <g clip-path="url(#clip0_17060_39185)">
            <path
              d="M18.5 0C20.1523 0 21.7461 0.210938 23.2812 0.632812C24.8164 1.05469 26.2461 1.66406 27.5703 2.46094C28.8945 3.25781 30.1074 4.19531 31.209 5.27344C32.3105 6.35156 33.2539 7.56445 34.0391 8.91211C34.8242 10.2598 35.4277 11.6953 35.8496 13.2188C36.2715 14.7422 36.4883 16.3359 36.5 18C36.5 19.6523 36.2891 21.2461 35.8672 22.7812C35.4453 24.3164 34.8359 25.7461 34.0391 27.0703C33.2422 28.3945 32.3047 29.6074 31.2266 30.709C30.1484 31.8105 28.9355 32.7539 27.5879 33.5391C26.2402 34.3242 24.8047 34.9277 23.2812 35.3496C21.7578 35.7715 20.1641 35.9883 18.5 36C16.8477 36 15.2539 35.7891 13.7188 35.3672C12.1836 34.9453 10.7539 34.3359 9.42969 33.5391C8.10547 32.7422 6.89258 31.8047 5.79102 30.7266C4.68945 29.6484 3.74609 28.4355 2.96094 27.0879C2.17578 25.7402 1.57227 24.3047 1.15039 22.7812C0.728516 21.2578 0.511719 19.6641 0.5 18C0.5 16.3477 0.710938 14.7539 1.13281 13.2188C1.55469 11.6836 2.16406 10.2539 2.96094 8.92969C3.75781 7.60547 4.69531 6.39258 5.77344 5.29102C6.85156 4.18945 8.06445 3.24609 9.41211 2.46094C10.7598 1.67578 12.1953 1.07227 13.7188 0.650391C15.2422 0.228516 16.8359 0.0117188 18.5 0ZM18.5 33.75C19.9531 33.75 21.3477 33.5625 22.6836 33.1875C24.0195 32.8125 25.2734 32.2852 26.4453 31.6055C27.6172 30.9258 28.6777 30.1055 29.627 29.1445C30.5762 28.1836 31.3965 27.123 32.0879 25.9629C32.7793 24.8027 33.3125 23.5488 33.6875 22.2012C34.0625 20.8535 34.25 19.4531 34.25 18C34.25 16.5469 34.0625 15.1523 33.6875 13.8164C33.3125 12.4805 32.7852 11.2266 32.1055 10.0547C31.4258 8.88281 30.6055 7.82227 29.6445 6.87305C28.6836 5.92383 27.623 5.10352 26.4629 4.41211C25.3027 3.7207 24.0488 3.1875 22.7012 2.8125C21.3535 2.4375 19.9531 2.25 18.5 2.25C17.0469 2.25 15.6523 2.4375 14.3164 2.8125C12.9805 3.1875 11.7266 3.71484 10.5547 4.39453C9.38281 5.07422 8.32227 5.89453 7.37305 6.85547C6.42383 7.81641 5.60352 8.87695 4.91211 10.0371C4.2207 11.1973 3.6875 12.4512 3.3125 13.7988C2.9375 15.1465 2.75 16.5469 2.75 18C2.75 19.4531 2.9375 20.8477 3.3125 22.1836C3.6875 23.5195 4.21484 24.7734 4.89453 25.9453C5.57422 27.1172 6.39453 28.1777 7.35547 29.127C8.31641 30.0762 9.37695 30.8965 10.5371 31.5879C11.6973 32.2793 12.9512 32.8125 14.2988 33.1875C15.6465 33.5625 17.0469 33.75 18.5 33.75Z"
              fill="#696969"
            />
          </g>
          <defs>
            <clipPath id="clip0_17060_39185">
              <rect
                width="36"
                height="36"
                fill="white"
                transform="translate(0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      );
    case "polygonIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="37"
          height="36"
          viewBox="0 0 37 36"
          fill="none"
        >
          <path
            d="M18.2027 4.14066C17.9245 4.13262 17.6514 4.21693 17.4262 4.38042L4.17743 14.0061C3.96234 14.1625 3.80227 14.383 3.72014 14.636C3.63801 14.889 3.63805 15.1615 3.72023 15.4144L8.78075 30.9895C8.86299 31.2425 9.02319 31.4629 9.23841 31.6193C9.45362 31.7757 9.71281 31.8599 9.97883 31.8599H26.3545C26.6205 31.8599 26.8797 31.7757 27.0949 31.6193C27.3101 31.4629 27.4704 31.2425 27.5526 30.9895L32.6135 15.4144C32.6957 15.1615 32.6957 14.889 32.6136 14.636C32.5314 14.383 32.3714 14.1625 32.1563 14.0061L18.9072 4.38042C18.7018 4.23139 18.4563 4.14783 18.2027 4.14066ZM18.1667 6.9573L29.9344 15.5066L25.4387 29.3399H10.8947L6.39935 15.5066L18.1667 6.9573Z"
            fill="#696969"
          />
        </svg>
      );
    case "randomShape":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="37"
          height="36"
          viewBox="0 0 37 36"
          fill="none"
        >
          <path
            d="M26.672 13.2581C26.1005 12.7867 25.2973 11.6944 25.2973 9.08775C25.2973 7.38225 24.719 6.04575 23.8213 5.03775C22.9438 4.05225 21.8098 3.43125 20.7523 3.03525C19.8225 2.69683 18.8569 2.4662 17.8745 2.34787C17.4329 2.2889 16.9881 2.25622 16.5425 2.25C12.9594 2.25 10.2403 3.23213 8.20629 4.77113C6.18354 6.30225 4.91567 8.32612 4.12142 10.2937C3.32717 12.258 2.98967 14.2065 2.84792 15.651C2.34167 20.8226 3.19329 26.9854 7.39292 30.4886C10.3472 32.9513 14.4039 33.75 18.8229 33.75C22.8954 33.75 26.7125 32.8691 29.5487 30.9656C32.432 29.0306 34.2478 26.0629 34.2489 22.1164C34.2489 18.5085 32.7234 16.371 31.1045 15.1673C30.4486 14.6808 29.7211 14.2994 28.9479 14.0366C28.1975 13.779 27.3032 13.7767 26.672 13.2581ZM8.83404 28.7606C5.21492 25.7411 4.65354 20.2995 5.08779 15.8704C5.21604 14.562 5.51867 12.8407 6.20717 11.1364C6.89454 9.43425 7.95092 7.78725 9.56417 6.5655C11.165 5.35275 13.3948 4.5 16.5425 4.5C16.8947 4.50338 17.2468 4.53713 17.5955 4.581C19.2065 4.78125 21.0223 5.2785 22.1405 6.53288C22.6727 7.13138 23.0473 7.93687 23.0473 9.08775C23.0473 12.1939 24.0305 13.9984 25.2433 14.9951C25.7229 15.39 26.2774 15.6838 26.8734 15.8591C27.3178 15.9874 27.7802 16.0144 28.22 16.1651C28.643 16.3091 29.2044 16.5589 29.7624 16.974C33.8518 20.0126 31.9742 26.6265 28.2943 29.0981C25.9464 30.6731 22.613 31.5 18.824 31.5C14.603 31.5 11.1887 30.7238 8.83404 28.7606Z"
            fill="#696969"
          />
        </svg>
      );
    case "cancelIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5.63107 14.3689L9.99994 10M14.3688 5.63113L9.99994 10M9.99994 10L5.63107 5.63113M9.99994 10L14.3688 14.3689"
            stroke="#535353"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
    case "instagramIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8.68539 1.33325C9.43539 1.33525 9.81605 1.33925 10.1447 1.34859L10.2741 1.35325C10.4234 1.35859 10.5707 1.36525 10.7487 1.37325C11.4581 1.40659 11.9421 1.51859 12.3667 1.68325C12.8067 1.85259 13.1774 2.08192 13.5481 2.45192C13.8872 2.78507 14.1495 3.18823 14.3167 3.63325C14.4814 4.05792 14.5934 4.54192 14.6267 5.25192C14.6347 5.42925 14.6414 5.57659 14.6467 5.72659L14.6507 5.85592C14.6607 6.18392 14.6647 6.56459 14.6661 7.31459L14.6667 7.81192V8.68525C14.6683 9.17152 14.6632 9.65779 14.6514 10.1439L14.6474 10.2733C14.6421 10.4233 14.6354 10.5706 14.6274 10.7479C14.5941 11.4579 14.4807 11.9413 14.3167 12.3666C14.1495 12.8116 13.8872 13.2148 13.5481 13.5479C13.2149 13.887 12.8117 14.1494 12.3667 14.3166C11.9421 14.4813 11.4581 14.5933 10.7487 14.6266L10.2741 14.6466L10.1447 14.6506C9.81605 14.6599 9.43539 14.6646 8.68539 14.6659L8.18805 14.6666H7.31539C6.82889 14.6683 6.3424 14.6632 5.85605 14.6513L5.72672 14.6473C5.56846 14.6413 5.41024 14.6344 5.25205 14.6266C4.54272 14.5933 4.05872 14.4813 3.63339 14.3166C3.18861 14.1493 2.78568 13.887 2.45272 13.5479C2.11335 13.2148 1.85079 12.8117 1.68339 12.3666C1.51872 11.9419 1.40672 11.4579 1.37339 10.7479L1.35339 10.2733L1.35005 10.1439C1.33776 9.6578 1.33221 9.17153 1.33339 8.68525V7.31459C1.33154 6.82832 1.33643 6.34205 1.34805 5.85592L1.35272 5.72659C1.35805 5.57659 1.36472 5.42925 1.37272 5.25192C1.40605 4.54192 1.51805 4.05859 1.68272 3.63325C1.85052 3.18805 2.11354 2.78488 2.45339 2.45192C2.78616 2.11295 3.18885 1.85063 3.63339 1.68325C4.05872 1.51859 4.54205 1.40659 5.25205 1.37325C5.42939 1.36525 5.57739 1.35859 5.72672 1.35325L5.85605 1.34925C6.34218 1.33741 6.82845 1.3323 7.31472 1.33392L8.68539 1.33325ZM8.00005 4.66659C7.116 4.66659 6.26815 5.01777 5.64303 5.6429C5.01791 6.26802 4.66672 7.11586 4.66672 7.99992C4.66672 8.88397 5.01791 9.73182 5.64303 10.3569C6.26815 10.9821 7.116 11.3333 8.00005 11.3333C8.88411 11.3333 9.73195 10.9821 10.3571 10.3569C10.9822 9.73182 11.3334 8.88397 11.3334 7.99992C11.3334 7.11586 10.9822 6.26802 10.3571 5.6429C9.73195 5.01777 8.88411 4.66659 8.00005 4.66659ZM8.00005 5.99992C8.2627 5.99988 8.52278 6.05156 8.76545 6.15203C9.00811 6.2525 9.22862 6.39978 9.41436 6.58547C9.60011 6.77116 9.74747 6.99161 9.84802 7.23424C9.94857 7.47688 10.0003 7.73694 10.0004 7.99959C10.0004 8.26223 9.94874 8.52231 9.84827 8.76498C9.7478 9.00765 9.60052 9.22815 9.41484 9.4139C9.22915 9.59964 9.0087 9.747 8.76606 9.84755C8.52343 9.9481 8.26336 9.99988 8.00072 9.99992C7.47029 9.99992 6.96158 9.78921 6.58651 9.41413C6.21143 9.03906 6.00072 8.53035 6.00072 7.99992C6.00072 7.46949 6.21143 6.96078 6.58651 6.5857C6.96158 6.21063 7.47029 5.99992 8.00072 5.99992M11.5007 3.66659C11.2797 3.66659 11.0677 3.75438 10.9115 3.91066C10.7552 4.06694 10.6674 4.2789 10.6674 4.49992C10.6674 4.72093 10.7552 4.93289 10.9115 5.08917C11.0677 5.24545 11.2797 5.33325 11.5007 5.33325C11.7217 5.33325 11.9337 5.24545 12.09 5.08917C12.2463 4.93289 12.3341 4.72093 12.3341 4.49992C12.3341 4.2789 12.2463 4.06694 12.09 3.91066C11.9337 3.75438 11.7217 3.66659 11.5007 3.66659Z"
            fill="#696969"
          />
        </svg>
      );
    case "facebookIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M9.33342 8.99992H11.0001L11.6667 6.33325H9.33342V4.99992C9.33342 4.31325 9.33342 3.66659 10.6667 3.66659H11.6667V1.42659C11.4494 1.39792 10.6287 1.33325 9.76208 1.33325C7.95208 1.33325 6.66675 2.43792 6.66675 4.46658V6.33325H4.66675V8.99992H6.66675V14.6666H9.33342V8.99992Z"
            fill="#696969"
          />
        </svg>
      );
    case "redditIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <g clip-path="url(#clip0_17064_59027)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.38 10.1893C9.782 10.1893 9.28 9.70392 9.28 9.10592C9.28 8.50792 9.782 8.00725 10.38 8.00725C10.978 8.00725 11.4633 8.50859 11.4633 9.10659C11.4633 9.70392 10.978 10.1893 10.38 10.1893ZM10.634 12.2913C10.0773 12.8479 9.218 13.1179 8.008 13.1179H7.99067C6.78067 13.1179 5.92267 12.8479 5.366 12.2913C5.32542 12.2507 5.29323 12.2025 5.27127 12.1495C5.24931 12.0965 5.23801 12.0396 5.23801 11.9823C5.23801 11.9249 5.24931 11.868 5.27127 11.815C5.29323 11.762 5.32542 11.7138 5.366 11.6733C5.40658 11.6327 5.45475 11.6005 5.50777 11.5785C5.56079 11.5566 5.61761 11.5453 5.675 11.5453C5.73239 11.5453 5.78921 11.5566 5.84223 11.5785C5.89525 11.6005 5.94342 11.6327 5.984 11.6733C6.368 12.0573 7.024 12.2439 7.99067 12.2439L7.99933 12.2446H8.008C8.97467 12.2446 9.63133 12.0573 10.016 11.6733C10.0566 11.6327 10.1048 11.6005 10.1578 11.5785C10.2108 11.5566 10.2676 11.5453 10.325 11.5453C10.3824 11.5453 10.4392 11.5566 10.4922 11.5785C10.5452 11.6005 10.5934 11.6327 10.634 11.6733C10.6746 11.7138 10.7068 11.762 10.7287 11.815C10.7507 11.868 10.762 11.9249 10.762 11.9823C10.762 12.0396 10.7507 12.0965 10.7287 12.1495C10.7068 12.2025 10.6746 12.2507 10.634 12.2913ZM4.53733 9.10592C4.53733 8.50859 5.03867 8.00725 5.636 8.00725C6.234 8.00725 6.71867 8.50859 6.71867 9.10659C6.71867 9.70392 6.234 10.1893 5.636 10.1893C5.03867 10.1893 4.53667 9.70392 4.53667 9.10592M13.3327 2.20725C13.7373 2.20725 14.0673 2.53659 14.0673 2.94125C14.0673 3.34592 13.7373 3.67592 13.3327 3.67592C13.1379 3.67574 12.9511 3.59828 12.8134 3.46055C12.6756 3.32281 12.5982 3.13604 12.598 2.94125C12.598 2.53659 12.9273 2.20725 13.3327 2.20725ZM16 7.91659C15.9995 7.40683 15.7967 6.91809 15.4363 6.55764C15.0758 6.19718 14.5871 5.99445 14.0773 5.99392C13.618 5.99392 13.1967 6.15592 12.8653 6.42525C11.6933 5.68859 10.2053 5.24459 8.61 5.15059L9.442 2.51992L11.7287 3.05859C11.7586 3.46354 11.9404 3.84224 12.2378 4.11879C12.5351 4.39535 12.9259 4.54934 13.332 4.54992C13.7584 4.54939 14.1672 4.37971 14.4687 4.07813C14.7701 3.77654 14.9396 3.36767 14.94 2.94125C14.9395 2.51495 14.7699 2.10625 14.4684 1.80481C14.167 1.50336 13.7583 1.33378 13.332 1.33325C12.712 1.33325 12.1727 1.68659 11.9047 2.20192L9.24733 1.57659C9.14019 1.55146 9.02751 1.56772 8.93183 1.6221C8.83616 1.67649 8.76455 1.765 8.73133 1.86992L7.698 5.13459C5.97933 5.17659 4.364 5.62259 3.10533 6.40259C2.76806 6.13766 2.35155 5.99374 1.92267 5.99392C1.41291 5.99445 0.924176 6.19718 0.563721 6.55764C0.203266 6.91809 0.000529438 7.40683 0 7.91659C7.08613e-05 8.22804 0.0759089 8.5348 0.220973 8.81041C0.366036 9.08602 0.57597 9.3222 0.832667 9.49859C0.811302 9.65166 0.80061 9.80603 0.800667 9.96059C0.800667 11.2859 1.57133 12.5186 2.97 13.4319C4.31067 14.3073 6.086 14.7893 7.96733 14.7893C9.84867 14.7893 11.624 14.3073 12.9653 13.4319C14.364 12.5186 15.1347 11.2853 15.1347 9.96059C15.1342 9.81836 15.1253 9.6777 15.108 9.53859C15.3813 9.36531 15.6064 9.12576 15.7624 8.84218C15.9183 8.55861 16.0001 8.24021 16 7.91659Z"
              fill="#696969"
            />
          </g>
          <defs>
            <clipPath id="clip0_17064_59027">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case "linkedInIcon":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M3.16667 1.25C2.79094 1.25 2.43061 1.39926 2.16493 1.66493C1.89926 1.93061 1.75 2.29094 1.75 2.66667C1.75 3.04239 1.89926 3.40272 2.16493 3.6684C2.43061 3.93408 2.79094 4.08333 3.16667 4.08333C3.54239 4.08333 3.90272 3.93408 4.1684 3.6684C4.43408 3.40272 4.58333 3.04239 4.58333 2.66667C4.58333 2.29094 4.43408 1.93061 4.1684 1.66493C3.90272 1.39926 3.54239 1.25 3.16667 1.25ZM1.83333 5.25C1.81123 5.25 1.79004 5.25878 1.77441 5.27441C1.75878 5.29004 1.75 5.31123 1.75 5.33333V14C1.75 14.046 1.78733 14.0833 1.83333 14.0833H4.5C4.5221 14.0833 4.5433 14.0746 4.55893 14.0589C4.57455 14.0433 4.58333 14.0221 4.58333 14V5.33333C4.58333 5.31123 4.57455 5.29004 4.55893 5.27441C4.5433 5.25878 4.5221 5.25 4.5 5.25H1.83333ZM6.16667 5.25C6.14457 5.25 6.12337 5.25878 6.10774 5.27441C6.09211 5.29004 6.08333 5.31123 6.08333 5.33333V14C6.08333 14.046 6.12067 14.0833 6.16667 14.0833H8.83333C8.85543 14.0833 8.87663 14.0746 8.89226 14.0589C8.90789 14.0433 8.91667 14.0221 8.91667 14V9.33333C8.91667 9.00181 9.04836 8.68387 9.28278 8.44945C9.5172 8.21503 9.83515 8.08333 10.1667 8.08333C10.4982 8.08333 10.8161 8.21503 11.0506 8.44945C11.285 8.68387 11.4167 9.00181 11.4167 9.33333V14C11.4167 14.046 11.454 14.0833 11.5 14.0833H14.1667C14.1888 14.0833 14.21 14.0746 14.2256 14.0589C14.2412 14.0433 14.25 14.0221 14.25 14V8.25333C14.25 6.63533 12.8433 5.37 11.2333 5.516C10.7352 5.56169 10.2474 5.68496 9.78733 5.88133L8.91667 6.25467V5.33333C8.91667 5.31123 8.90789 5.29004 8.89226 5.27441C8.87663 5.25878 8.85543 5.25 8.83333 5.25H6.16667Z"
            fill="#696969"
          />
        </svg>
      );
    default:
      return <>No Svg Found of type</>;
  }
};

export default AllSvgs;
