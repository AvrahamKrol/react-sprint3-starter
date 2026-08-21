import { MailPreview } from "./MailPreview.jsx";

export function MailList({
  mails
}) {

  return (
    <ul>
      {mails.map((mail) => {
        return (
          <React.Fragment key={mail.id}>
            <MailPreview mail={mail} />
          </React.Fragment>
        )
      })}
    </ul>
  )

}