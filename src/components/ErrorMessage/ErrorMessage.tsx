// // import css from "./ErrorMessage.module.css";

// // export interface ErrorMessageProps {}

// // export default function ErrorMessage(_: ErrorMessageProps) {
// //   return <p className={css.text}>There was an error, please try again...</p>;
// // }
// import css from "./ErrorMessage.module.css";

// export default function ErrorMessage() {
//   return <p className={css.text}>There was an error, please try again...</p>;
// }
import type { ReactElement } from "react";
import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps): ReactElement {
  return <p className={styles.text}>{message}</p>;
}
