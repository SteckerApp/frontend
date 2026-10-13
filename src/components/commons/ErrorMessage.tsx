

const ErrorMessage = ({ touched, error, padding }: { touched: any, error: any, padding?: string}) => {
    if (!touched || !error) return null;
    return <p className={`text-error ${padding}`}>{error}</p>;
  };
  
  export default ErrorMessage
  