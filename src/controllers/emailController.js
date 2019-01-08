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
    sgMail.send(msg).then(() => {
        console.log("Email successful!");
    })
    .catch((err) => {
        console.log(err.toString());
    })
}

module.exports = newUser;