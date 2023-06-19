// export const Text = styled.p<any>`
//   // line-height: ${({ lineHeight }) => lineHeight || '2.16rem'};
//   line-height: ${({ small, medium, xsmall }) =>
//     xsmall ? '1.35rem' : small ? '1.54rem' : medium ? '1.85rem' : '2.16rem'};
//   font-weight: ${({ bold, semibold }) =>
//     semibold ? '600' : bold ? 'bold' : 'normal'};
//   font-size: ${({ small, medium, xsmall }) =>
//     xsmall ? '.9em' : small ? '1.08rem' : medium ? '1.231rem' : '1.39rem'};
//   font-family: ${({ font }) => font};
//   text-decoration: ${({ decoration }) => decoration ?? 'none'};
//   ${({ spaced, small, medium, xsmall }) =>
//     spaced &&
//     `letter-spacing: ${
//       xsmall ? '.25em' : small ? '.1em' : medium ? '.4em' : '.5em'
//     };`}
//   // color: ${({ color }) => palette[color]};
//   color: ${({ color, ignoreTheme, isDarkTheme }) =>
//     ignoreTheme
//       ? palette[color]
//       : isDarkTheme
//       ? palette.RL_grey_light
//       : color
//       ? palette[color]
//       : palette.RL_grey_dark2};
//   margin: ${({ margin }) => `${margin}`};
//   text-align: ${({ isCentered }) => (isCentered ? 'center' : 'inherit')};
//   display: ${({ inline }) => (inline ? 'inline' : '')};
//   // i {
//   // 	font-style: italic;
//   // }
// `;
