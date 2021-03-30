export default function cb(controller) {
	return (req, res) => {
		controller(req)
			.then(({ statusCode, headers, data }) => {
				res.status(statusCode);
				res.set(headers);
				res.send(data);
			})
			.catch((e) => {
				res.status(500).end();
				console.log(e);
			});
	};
}
