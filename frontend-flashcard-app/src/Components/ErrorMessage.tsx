import "../SassStyles/TitlesAndTexts.scss";

interface IErrorElement {
    textError: string;
}

const ErrorMessage = (props: React.PropsWithChildren<IErrorElement>) => {
    const {textError} = props;
    return <p className="error-msg">{textError}</p>
}

export default ErrorMessage;