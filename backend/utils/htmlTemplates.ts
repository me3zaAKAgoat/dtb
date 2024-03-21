/** how to dynamically update this domain name */
const verificationMailTemplate = (name: string, token: string) => {
	return `
	<html>
	  <body>
		<h1>Hi ${name},</h1>
		<p>Click <a href="https://www.dtboard.tech/api/auth/verify/${token}">here</a> to verify your account</p>
	  </body>
	</html>
  `;
};

export { verificationMailTemplate };
