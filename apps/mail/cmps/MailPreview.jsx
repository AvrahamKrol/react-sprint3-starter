export function MailPreview({ mail }) {
    return (
        //     <DynamicCmp
        //         // key={Mail.id}
        //         cmpType={mail.type}
        //         info={mail.info}
        //         onClose={onClose}
        //         isShown={isShown}
        //         // val={answersMap[Mail.id] || ''}
        //         onChangeVal={(type, val) => onChangeMail(type, val)}
        //     />

        <li>
            <span>{mail.from}</span> <span>{mail.body}</span>
        </li>
    )
}

// function DynamicCmp(props) {
//     const cmpMap = {
//         MailTxt: <MailText {...props} />,
//     }
//     return cmpMap[props.cmpType]
// }