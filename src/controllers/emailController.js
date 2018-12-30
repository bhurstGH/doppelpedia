const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function newUser(email, name) {
    let msg = {
        to: email,
        from: { email: "bretthurst@outlook.com", name: "Blocipedia" },
        subject: "Blocipedia Account Created!",
        text: `Your account has been created!
        Username: ${name}
        Email: ${email}`
    };
    sgMail.send(msg);
}

module.exports = newUser;