import s from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <div className="container">
      <h2 className={s.errorMessage}>Something went wrong! Try again...</h2>
    </div>
  );
};

export default ErrorMessage;
