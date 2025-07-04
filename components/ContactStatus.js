function ContactStatus({ status }) {
    return (
        <>
            {status === 'success' && (
                <section id="contact-success">
                    <h2>Thank you</h2>
                    <p>Your contact submission has been successfully sent.</p>
                    <p>Please expect a reply, if requested, within 2 business days.</p>
                </section>
            )}

            {status === 'failure' && (
                <section id="contact-failure">
                    <h2>An error occurred</h2>
                    <p>Unfortunately your contact submission could not be processed at this time.</p>
                    <p>
                        Please contact me via email <a href="mailto:james.stanley@staffs.ac.uk">james.stanley@staffs.ac.uk</a>,
                        or try this form submission again.
                    </p>
                </section>
            )}
        </>
    )
}