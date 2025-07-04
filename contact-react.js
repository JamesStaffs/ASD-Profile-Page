const { useState } = React;

function ContactForm() {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        priority: '1',
        reply: false,
        message: '',
    });

    const [status, setStatus] = useState(null); // 'success', 'failure', or null

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);

        const url = "https://webhook.site/9da76c8b-d843-46ba-84c7-e2547fe4d379";
        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: form
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            setStatus('success');
        } catch (error) {
            console.error('Submission failed:', error);
            setStatus('failure');
        }
    };

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li><a href="index.html">Profile</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </nav>
                <h1>Contact James</h1>
            </header>

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

            {status !== 'success' && (
                <form id="contact" onSubmit={handleSubmit}>
                    <p>
                        <label htmlFor="full_name">Full name<sup className="required-field">*</sup>:</label>
                        <input type="text" name="full_name" id="full_name" required
                            value={formData.full_name} onChange={handleChange} />
                    </p>

                    <p>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email"
                            value={formData.email} onChange={handleChange} />
                    </p>

                    <p className="field-inline">
                        <label htmlFor="priority">Priority:</label>
                        <select name="priority" id="priority"
                            value={formData.priority} onChange={handleChange}>
                            <option value="0">Low</option>
                            <option value="1">Normal</option>
                            <option value="2">High</option>
                        </select>
                    </p>

                    <p className="field-inline">
                        <label htmlFor="reply">Reply requested:</label>
                        <input type="checkbox" name="reply" id="reply"
                            checked={formData.reply} onChange={handleChange} />
                    </p>

                    <p>
                        <label htmlFor="message">Message<sup className="required-field">*</sup>:</label>
                        <textarea name="message" id="message" rows="10" required
                            value={formData.message} onChange={handleChange} />
                    </p>

                    <input type="submit" value="Send" />

                    <p><sup className="required-field">*</sup> indicates a required field</p>
                </form>
            )}
        </>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ContactForm />);