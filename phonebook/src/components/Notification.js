const Notification = ({message, messStyle}) => {
    if (message === null) {
        return null;
    }
    return ( <div className={messStyle}>{message}</div> )
}

export default Notification;
